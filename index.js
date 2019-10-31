const fs = require('fs')
const path = require('path')
const nunjucks = require('nunjucks')
module.exports = (hikaru) => {
  const {removeControlChars} = hikaru.utils
  const {File} = hikaru.types
  hikaru.decorator.register('atom', path.join(__dirname, 'atom.njk'))
  hikaru.generator.register('rss feed', (site) => {
    if (!site['siteConfig']['feed']['enable']) {
      return
    }
    return new File({
      'docDir': site['siteConfig']['docDir'],
      'docPath': site['siteConfig']['feed']['path'] || 'atom.xml',
      'layout': 'atom',
      'removeControlChars': removeControlChars,
    })
  })
}
