const test = require("node:test");
const assert = require("node:assert/strict");

const { shouldSkipRefresh } = require("../src/content-controller");

test("manual launch should bypass fingerprint short-circuit", () => {
  assert.equal(
    shouldSkipRefresh({
      fingerprint: "B000123456|Sample Product|89.99|null",
      lastFingerprint: "B000123456|Sample Product|89.99|null",
      autoOpenWidget: true,
      force: true,
    }),
    false,
  );
});

test("auto-open refresh can skip unchanged fingerprints", () => {
  assert.equal(
    shouldSkipRefresh({
      fingerprint: "B000123456|Sample Product|89.99|null",
      lastFingerprint: "B000123456|Sample Product|89.99|null",
      autoOpenWidget: true,
      force: false,
    }),
    true,
  );
});
