const fs = require('fs')
const path = require('path')
const nunjucks = require('nunjucks')
module.exports = (hikaru) => {
  const {removeControlChars, getURLFn, getPathFn} = hikaru.utils
  const {File} = hikaru.types
  hikaru.generator.register('rss feed', (site) => {
    if (!site['siteConfig']['feed']['enable']) {
      return site
    }
    const tmpContent = fs.readFileSync(path.join(__dirname, 'atom.njk'), 'utf8')
    const content = nunjucks.renderString(tmpContent, {
      'siteConfig': site['siteConfig'],
      'themeConfig': site['themeConfig'],
      'posts': site['posts'],
      'removeControlChars': removeControlChars,
      'getURL': getURLFn(site['siteConfig']['baseURL'], site['siteConfig']['rootDir']),
      'getPath': getPathFn(site['siteConfig']['rootDir'])
    })
    return new File({
      'docDir': site['siteConfig']['docDir'],
      'docPath': site['siteConfig']['feed']['path'] || 'atom.xml',
      'content': content
    })
  })
}
