import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

type ExportBranch = {
  types?: string;
  default?: string;
  import?: string | ExportBranch;
  require?: string | ExportBranch;
  node?: ExportBranch;
  browser?: string | ExportBranch;
};

test("each export condition names its own types file", () => {
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8")) as {
    types: string;
    exports: { ".": ExportBranch };
  };
  const rootExport = pkg.exports["."];

  expect(pkg.types).toBe("./dist/index.d.ts");
  expect(rootExport.types).toBeUndefined();

  const nodeImport = rootExport.node?.import;
  const nodeRequire = rootExport.node?.require;
  const browser = rootExport.browser;
  const esmImport = rootExport.import;
  const cjsRequire = rootExport.require;

  expect(nodeImport).toEqual({
    types: "./dist/index.node.d.ts",
    default: "./dist/index.node.js",
  });
  expect(nodeRequire).toEqual({
    types: "./dist/index.d.cts",
    default: "./dist/index.cjs",
  });
  expect(browser).toEqual({
    types: "./dist/index.d.ts",
    default: "./dist/index.js",
  });
  expect(esmImport).toEqual({
    types: "./dist/index.d.ts",
    default: "./dist/index.js",
  });
  expect(cjsRequire).toEqual({
    types: "./dist/index.d.cts",
    default: "./dist/index.cjs",
  });
});
