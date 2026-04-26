import React from 'react';
import { createRoot } from 'react-dom/client';
import { Widget } from './components/Widget';
import cssText from './index.css?inline';
import { isAmazonProductPage, scrapeAmazonProductData } from './adapters/amazon';
import { createQuoteRequestPayload } from './shared/payload';



function initContent() {
  let latestScrape: any = null;
  let lastFingerprint: string | null = null;
  let lastHref = location.href;
  let autoOpenWidget = true;
  let scheduled: any = null;
  
  let state: any = {
    status: 'loading',
    product: null,
    scraped: null,
    classification: null,
    quote: null,
    warnings: [],
    error: null,
    form: {},
  };

  const host = document.createElement('div');
  host.id = 'shippers-extension-root';
  const shadow = host.attachShadow({ mode: 'open' });

  // Add styles securely
  const styleElement = document.createElement('style');
  styleElement.textContent = cssText;
  shadow.appendChild(styleElement);

  // Load fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap';
  shadow.appendChild(fontLink);

  const reactRoot = document.createElement('div');
  shadow.appendChild(reactRoot);
  document.body.appendChild(host);

  const root = createRoot(reactRoot);

  function renderWidget() {
    root.render(
      <React.StrictMode>
        <Widget 
          state={state}
          onLaunch={() => {
            console.info('[ShippersTT][content] launcher clicked');
            autoOpenWidget = true;
            refreshQuote({ force: true });
          }}
          onRefresh={() => {
            console.info('[ShippersTT][content] refresh clicked');
            refreshQuote({ force: true });
          }}
          onRecalculate={(overrides) => {
            if (!latestScrape) return;
            fetchQuote(overrides, 'loading');
          }}
          onClose={() => {
            updateState({ status: 'collapsed' });
          }}
        />
      </React.StrictMode>
    );
  }

  function updateState(nextState: any) {
    state = { ...state, ...nextState };
    if (nextState.classification) {
      state.form = {
        category: nextState.classification.category,
        weight_lbs: nextState.classification.estimated_weight_lbs,
      };
    }
    if (nextState.form) {
      state.form = { ...state.form, ...nextState.form };
    }
    renderWidget();
  }

  function scrapeCurrentPage() {
    if (!isAmazonProductPage(location.href)) return null;
    return scrapeAmazonProductData(document, window.location);
  }

  function fingerprintFor(scrape: any) {
    return [scrape?.product_id, scrape?.title, scrape?.price_usd, scrape?.variant].join('|');
  }

  function fetchQuote(overrides: any = null, status = 'loading') {
    const scrape = latestScrape || scrapeCurrentPage();
    latestScrape = scrape;

    if (!scrape) {
      updateState({ status: 'not-product-page' });
      return;
    }

    if (!scrape.title || typeof scrape.price_usd !== 'number') {
      updateState({
        status: 'error',
        scraped: scrape,
        product: { title: scrape.title, price_usd: scrape.price_usd },
        error: 'This Amazon page is missing a clean title or USD price. Try refreshing after the page finishes loading.',
        warnings: [],
      });
      return;
    }

    updateState({
      status,
      scraped: scrape,
      product: { title: scrape.title, price_usd: scrape.price_usd },
      warnings: [],
      error: null,
    });

    const payload = createQuoteRequestPayload(scrape, overrides);
    chrome.runtime.sendMessage({ type: 'fetch-quote', payload }, (response) => {
      if (!response?.ok) {
        updateState({
          status: 'error',
          scraped: scrape,
          product: { title: scrape.title, price_usd: scrape.price_usd },
          error: response?.error || 'Unable to fetch quote.',
          warnings: [],
        });
        return;
      }

      updateState({
        status: 'quoted',
        scraped: scrape,
        product: response.data.product,
        classification: response.data.classification,
        quote: response.data.quote,
        warnings: response.data.warnings || [],
        error: null,
      });
    });
  }

  function refreshQuote(options: any = {}) {
    const scrape = scrapeCurrentPage();
    latestScrape = scrape;

    if (!scrape) {
      if (options.force) {
        updateState({ status: 'not-product-page' });
      } else {
        updateState({ status: 'collapsed' });
      }
      return;
    }

    const fingerprint = fingerprintFor(scrape);
    if (!options.force && fingerprint === lastFingerprint && autoOpenWidget) {
      return;
    }

    lastFingerprint = fingerprint;
    if (!autoOpenWidget && !options.force) {
      updateState({
        status: 'collapsed',
        scraped: scrape,
        product: { title: scrape.title, price_usd: scrape.price_usd },
      });
      return;
    }

    fetchQuote(null, 'loading');
  }

  function scheduleRefresh(options: any = {}) {
    if (scheduled) clearTimeout(scheduled);
    scheduled = setTimeout(() => {
      scheduled = null;
      refreshQuote(options);
    }, 500);
  }

  // Start fetching immediately
  updateState({ status: 'loading' });
  refreshQuote();

  const observer = new MutationObserver(() => scheduleRefresh());
  observer.observe(document.documentElement || document.body, { childList: true, subtree: true });

  window.setInterval(() => {
    if (location.href !== lastHref) {
      lastHref = location.href;
      scheduleRefresh({ force: true });
    }
  }, 1000);
}

initContent();
