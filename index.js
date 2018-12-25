const fs = require('fs')
const path = require('path')
const nunjucks = require('nunjucks')
module.exports = (hikaru) => {
  const {removeControlChars, getURLFn, getPathFn} = hikaru.utils
  const {File} = hikaru.types
  hikaru.generator.register('afterProcessing', (site) => {
    if (!site.get('siteConfig')['feed']['enable']) {
      return site
    }
    const tmpContent = fs.readFileSync(path.join(__dirname, 'atom.njk'), 'utf8')
    const content = nunjucks.renderString(tmpContent, {
      'siteConfig': site.get('siteConfig'),
      'themeConfig': site.get('themeConfig'),
      'posts': site.get('posts'),
      'removeControlChars': removeControlChars,
      'getURL': getURLFn(site.get('siteConfig')['baseURL'], site.get('siteConfig')['rootDir']),
      'getPath': getPathFn(site.get('siteConfig')['rootDir'])
    })
    const file = new File(site.get('docDir'))
    file['docPath'] = site.get('siteConfig')['feed']['path'] || 'atom.xml'
    file['content'] = content
    site.put('files', file)
    return site
  })
}
