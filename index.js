const fs = require('fs')
const path = require('path')
const cheerio = require("cheerio")
const nunjucks = require('nunjucks')
const pkg = require('./package.json')

module.exports = (hikaru) => {
  const {removeControlChars} = hikaru.utils
  const {File} = hikaru.types
  const {baseURL} = hikaru.site['siteConfig']
  const resolveContent = (html) => {
    const $ = cheerio.load(html, {'decodeEntities': false})
    $('a').each((i, a) => {
      const href = $(a).attr('href')
      if (href == null) {
        return
      }
      // If href is a absolute path, we will get an error.
      // But there is a problem for `//`.
      try {
        new URL(href)
      } catch (error) {
        $(a).attr('href', new URL(href, baseURL))
      }
    })
    $('img').each((i, e) => {
      const src = $(e).attr('src')
      if (src == null) {
        return
      }
      // If src is a absolute path, we will get an error.
      // But there is a problem for `//`.
      try {
        new URL(src)
      } catch (error) {
        $(e).attr('src', new URL(src, baseURL))
      }
    })
    return $.html()
  }
  hikaru.decorator.register('atom', path.join(__dirname, 'atom.njk'))
  hikaru.generator.register('atom feed', (site) => {
    if (!site['siteConfig']['feed']['enable']) {
      return
    }
    return new File({
      'docDir': site['siteConfig']['docDir'],
      'docPath': site['siteConfig']['feed']['path'] || 'atom.xml',
      'layout': 'atom',
      'removeControlChars': removeControlChars,
      'resolveContent': resolveContent,
      'generatorVersion': pkg['version']
    })
  })
}
