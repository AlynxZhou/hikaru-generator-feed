const path = require('path')
const nunjucks = require('nunjucks')
const pkg = require('./package.json')

module.exports = (hikaru) => {
  const {removeControlChars} = hikaru.utils
  const {File} = hikaru.types
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
      'generatorVersion': pkg['version']
    })
  })
}
