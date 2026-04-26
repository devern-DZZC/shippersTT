const test = require("node:test");
const assert = require("node:assert/strict");

const {
  isAmazonProductPage,
  scrapeAmazonProductData,
} = require("../src/adapters/amazon");
const { createQuoteRequestPayload } = require("../src/shared/payload");

function createElement(textContent, extra = {}) {
  return {
    textContent,
    innerText: textContent,
    href: extra.href,
    content: extra.content,
    getAttribute(name) {
      return extra[name] ?? null;
    },
    querySelector(selector) {
      return extra.children?.[selector] ?? null;
    },
  };
}

function createFakeDocument({ selectors = {}, selectorLists = {} }) {
  return {
    title: "Amazon fixture",
    querySelector(selector) {
      return selectors[selector] ?? null;
    },
    querySelectorAll(selector) {
      return selectorLists[selector] ?? [];
    },
  };
}

test("detects Amazon product detail page URLs", () => {
  assert.equal(
    isAmazonProductPage("https://www.amazon.com/dp/B000123456"),
    true,
  );
  assert.equal(
    isAmazonProductPage("https://www.amazon.com/gp/product/B000123456"),
    true,
  );
  assert.equal(
    isAmazonProductPage("https://www.amazon.com/Ring-Wired-Retina-2K-Speckle-Grey/dp/B0FJJ66YZ1/"),
    true,
  );
  assert.equal(
    isAmazonProductPage("https://www.amazon.com/gp/aw/d/B0C1MWBQLZ/"),
    true,
  );
  assert.equal(
    isAmazonProductPage("https://www.amazon.com/s?k=headphones"),
    false,
  );
});

test("scrapes product details from an Amazon detail page fixture", () => {
  const document = createFakeDocument({
    selectors: {
      "#productTitle": createElement("Wireless Noise Cancelling Headphones"),
      "#landingImage": createElement("", { src: "https://images.example/product.jpg" }),
      "#bylineInfo": createElement("Brand: Example"),
      "#wayfinding-breadcrumbs_feature_div ul": createElement("Electronics Audio Headphones"),
      'link[rel="canonical"]': createElement("", {
        href: "https://www.amazon.com/dp/B000123456",
      }),
      ".a-price .a-offscreen": createElement("$89.99"),
      "#detailBullets_feature_div": createElement(
        "Product Dimensions 10 x 8 x 3 inches; 2.5 Pounds",
      ),
      'script[type="application/ld+json"]': createElement(
        JSON.stringify({
          brand: { name: "Example" },
          weight: "2.5 pounds",
        }),
      ),
    },
  });

  const result = scrapeAmazonProductData(document, {
    href: "https://www.amazon.com/dp/B000123456",
  });

  assert.deepEqual(result, {
    source: "amazon",
    page_url: "https://www.amazon.com/dp/B000123456",
    product_id: "B000123456",
    title: "Wireless Noise Cancelling Headphones",
    variant: null,
    price_usd: 89.99,
    currency: "USD",
    scraped_weight_lbs: 2.5,
    scraped_category_hint: "Electronics Audio Headphones",
  });
});

test("creates an extension quote payload with editable overrides", () => {
  const payload = createQuoteRequestPayload(
    {
      source: "amazon",
      page_url: "https://www.amazon.com/dp/B000123456",
      product_id: "B000123456",
      title: "Wireless Noise Cancelling Headphones",
      variant: null,
      price_usd: 89.99,
      currency: "USD",
      scraped_weight_lbs: 2.5,
      scraped_category_hint: "electronics",
    },
    {
      category: "electronics",
      weight_lbs: 3,
    },
  );

  assert.deepEqual(payload, {
    source: "amazon",
    page_url: "https://www.amazon.com/dp/B000123456",
    product_id: "B000123456",
    title: "Wireless Noise Cancelling Headphones",
    variant: null,
    price_usd: 89.99,
    currency: "USD",
    scraped_weight_lbs: 2.5,
    scraped_category_hint: "electronics",
    overrides: {
      category: "electronics",
      weight_lbs: 3,
    },
  });
});
