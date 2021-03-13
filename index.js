const path = require("path");
const pkg = require("./package.json");

module.exports = async (hikaru) => {
  if (!hikaru.site["siteConfig"]["feed"]["enable"]) {
    return;
  }
  const {escapeHTML} = hikaru.utils;
  const {File} = hikaru.types;
  const fn = await hikaru.compiler.compile(path.join(__dirname, "atom.njk"));
  hikaru.decorator.register("atom", fn);
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
