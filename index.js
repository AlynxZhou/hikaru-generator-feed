const path = require("path");
const pkg = require("./package.json");

module.exports = async (hikaru) => {
  const {escapeHTML} = hikaru.utils;
  const {File} = hikaru.types;
  const fn = await hikaru.compiler.compile(path.join(__dirname, "atom.njk"));
  hikaru.decorator.register("atom", fn);
  hikaru.generator.register("atom feed", (site) => {
    if (!site["siteConfig"]["feed"]["enable"]) {
      return;
    }
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
