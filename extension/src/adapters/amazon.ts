export function safeText(element: Element | null | undefined): string | null {
  return (element as HTMLElement)?.innerText?.replace(/\s+/g, ' ').trim() || 
         element?.textContent?.replace(/\s+/g, ' ').trim() || 
         null;
}

export function parsePriceText(text: string | null): number | null {
  if (!text) return null;
  const cleaned = String(text).replace(/[^0-9.]/g, '');
  if (!cleaned) return null;
  const parsed = Number.parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}

export function parseWeightText(text: string | null): number | null {
  if (!text) return null;
  const match = String(text).match(/(\d+(?:\.\d+)?)\s*(?:pounds?|lbs?)/i);
  if (!match) return null;
  const parsed = Number.parseFloat(match[1]);
  return Number.isFinite(parsed) ? parsed : null;
}

export function extractProductId(url: string | null | undefined): string | null {
  const match = String(url || '').match(/\/(?:dp|gp\/product|gp\/aw\/d)\/([A-Z0-9]{10})/i);
  return match ? match[1].toUpperCase() : null;
}

export function isAmazonProductPage(url: string | null | undefined): boolean {
  return /amazon\.com\/(?:.*\/)?(?:dp|gp\/product|gp\/aw\/d)\//i.test(String(url || ''));
}

export function findFirstText(document: Document, selectors: string[]): string | null {
  for (const selector of selectors) {
    const text = safeText(document.querySelector(selector));
    if (text) return text;
  }
  return null;
}

export function findFirstPrice(document: Document, selectors: string[]): number | null {
  for (const selector of selectors) {
    const value = parsePriceText(safeText(document.querySelector(selector)));
    if (value !== null) return value;
  }
  return null;
}

export function findWeight(document: Document): number | null {
  const textSources = [
    safeText(document.querySelector('#detailBullets_feature_div')),
    safeText(document.querySelector('#productDetails_detailBullets_sections1')),
    safeText(document.querySelector('#prodDetails')),
  ].filter(Boolean) as string[];

  // Specifically extract ONLY 'shipping weight' because 'item weight' is consistently lower than volumetric requirements
  for (const text of textSources) {
    const match = text.match(/shipping weight[^0-9]*(\d+(?:\.\d+)?)\s*(?:pounds?|lbs?|oz|ounces?)/i);
    if (match) {
      const val = Number.parseFloat(match[1]);
      if (/oz|ounces?/i.test(match[0])) return val / 16.0;
      return val;
    }
  }

  // We intentionally do NOT fall back to JSON-LD 'weight' property or generic 'weight' text here,
  // because Amazon often lists the net physical weight of the item (e.g. 5 lbs for PS5) rather than 
  // the shipping/volumetric weight (e.g. 10 lbs). Returning null safely delegates estimation to the AI engine.
  return null;
}

export function scrapeAmazonProductData(document: Document, locationLike: Location | URL) {
  const href = locationLike?.href || '';
  const canonicalHref =
    (document.querySelector('link[rel="canonical"]') as HTMLLinkElement)?.href ||
    (document.querySelector('meta[property="og:url"]') as HTMLMetaElement)?.content ||
    href;
  const pageUrl = canonicalHref || href;
  const title = findFirstText(document, ['#productTitle', '#title', 'h1 span']);
  const priceUsd = findFirstPrice(document, [
    '.a-price .a-offscreen',
    '#corePrice_feature_div .a-offscreen',
    '#priceblock_ourprice',
    '#priceblock_dealprice',
    '#tp_price_block_total_price_ww .a-offscreen',
  ]);

  return {
    source: 'amazon',
    page_url: pageUrl,
    product_id: extractProductId(pageUrl) || extractProductId(href),
    title,
    variant:
      findFirstText(document, [
        '#inline-twister-expander-content-size_name .selection',
        '#inline-twister-expander-content-color_name .selection',
        '#variation_size_name .selection',
        '#variation_color_name .selection',
      ]) ?? null,
    price_usd: priceUsd,
    currency: 'USD',
    scraped_weight_lbs: findWeight(document),
    scraped_category_hint:
      findFirstText(document, [
        '#wayfinding-breadcrumbs_feature_div ul',
        '#nav-subnav',
        '#detailBulletsWrapper_feature_div',
      ]) ?? null,
  };
}
