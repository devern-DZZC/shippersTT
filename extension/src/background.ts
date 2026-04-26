const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.shipperstt.com';
const EXTENSION_TOKEN = import.meta.env.VITE_EXTENSION_TOKEN || '';

function respondWithError(sendResponse: (res: any) => void, message: string, status = 500) {
  console.warn('[ShippersTT][background] error', { message, status });
  sendResponse({ ok: false, error: message, status });
}

chrome.runtime.onInstalled.addListener(() => {
  console.info('[ShippersTT][background] installed');
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  console.info('[ShippersTT][background] message received', message?.type);
  if (message?.type === 'fetch-quote') {
    (async () => {
      try {
        const apiBaseUrl = String(API_BASE_URL).replace(/\/+$/, '');
        if (!apiBaseUrl) {
          respondWithError(sendResponse, 'Backend API URL not configured.', 400);
          return;
        }

        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (EXTENSION_TOKEN) {
          headers.Authorization = `Bearer ${EXTENSION_TOKEN}`;
        }

        const response = await fetch(`${apiBaseUrl}/extension/quote`, {
          method: 'POST',
          headers,
          body: JSON.stringify(message.payload),
        });

        const payload = await response.json().catch(() => ({}));
        if (!response.ok) {
          respondWithError(sendResponse, payload.error || 'Unable to fetch quote.', response.status);
          return;
        }

        sendResponse({ ok: true, data: payload });
      } catch (error: any) {
        console.error('[ShippersTT][background] quote request failed', error);
        respondWithError(sendResponse, error?.message || 'Unable to reach the quote service.');
      }
    })();
    return true;
  }

  return false;
});
