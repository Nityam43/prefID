import prefid = require("prefid");

const generate: (prefix: string) => string = prefid.id;
const check: (value: string, prefix: string) => boolean = prefid.isId;

const value = generate("user");
if (!check(value, "user")) {
  throw new Error("CJS types smoke failed");
}
