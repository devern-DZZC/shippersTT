# ShippersTT Chrome Extension

Internal Manifest V3 extension for Amazon product detail pages.

## Load In Chrome

1. Open `chrome://extensions`
2. Turn on Developer mode
3. Choose **Load unpacked**
4. Select this `extension/` directory

## Configure

Open the extension options page and set:

- `API Base URL` to your backend, for example `http://localhost:5003`
- `Bearer Token` to match `EXTENSION_BEARER_TOKEN` on the backend
- `Auto-open widget` based on whether staff want instant quotes or manual launch

## Test

```bash
npm test
```
