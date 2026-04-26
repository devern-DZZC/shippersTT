export function createQuoteRequestPayload(scraped: any, overrides?: any) {
  return {
    source: scraped.source,
    page_url: scraped.page_url,
    product_id: scraped.product_id,
    title: scraped.title,
    variant: scraped.variant ?? null,
    price_usd: scraped.price_usd,
    currency: scraped.currency || 'USD',
    scraped_weight_lbs: scraped.scraped_weight_lbs ?? null,
    scraped_category_hint: scraped.scraped_category_hint ?? null,
    overrides: {
      category: overrides?.category ?? null,
      weight_lbs: overrides?.weight_lbs ?? null,
    },
  };
}
