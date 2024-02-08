import * as fs from "node:fs/promises";
import * as path from "node:path";

const pluginDir = path.dirname(new URL(import.meta.url).pathname);

const generateFeed = async (hikaru) => {
  if (!hikaru.site["siteConfig"]["feed"]["enable"]) {
    return;
  }
  const {escapeHTML, loadJSON} = hikaru.utils;
  const {File} = hikaru.types;
  const pkgJSON = await loadJSON(path.join(pluginDir, "package.json"));
  const filepath = path.join(pluginDir, "atom.njk");
  const content = await fs.readFile(filepath, "utf8");
  const fn = await hikaru.compiler.compile(filepath, content);
  hikaru.decorator.register("atom", fn, {
    "dirname": pluginDir,
    "pathSep": path.sep,
    "escapeHTML": escapeHTML,
    "getFeedGeneratorVersion": () => {
      return pkgJSON["version"];
    }
  });
  hikaru.generator.register("atom feed", (site) => {
    return new File({
      "docDir": site["siteConfig"]["docDir"],
      "docPath": site["siteConfig"]["feed"]["path"] || "atom.xml",
      "layout": "atom"
    });
  });
};

export default generateFeed;
