const fs = require("fs/promises");
const path = require("path");
const pkg = require("./package.json");

module.exports = async (hikaru) => {
  if (!hikaru.site["siteConfig"]["feed"]["enable"]) {
    return;
  }
  const {escapeHTML} = hikaru.utils;
  const {File} = hikaru.types;
  const filepath = path.join(__dirname, "atom.njk");
  const content = await fs.readFile(filepath, "utf8");
  const fn = await hikaru.compiler.compile(filepath, content);
  hikaru.decorator.register("atom", fn, {
    "dirname": __dirname, "pathSep": path.sep
  });
  hikaru.generator.register("atom feed", (site) => {
    return new File({
      "docDir": site["siteConfig"]["docDir"],
      "docPath": site["siteConfig"]["feed"]["path"] || "atom.xml",
      "layout": "atom",
      "escapeHTML": escapeHTML,
      "getFeedGeneratorVersion": () => {
        return pkg["version"];
      }
    });
  });
};
