Hikaru Generator Feed
=====================

Feed generator plugin for Hikaru.
---------------------------------

# Usage

First go to your site dir and add following to your `config.yml`.

```yaml
feed:
  enable: true
  path: atom.xml
  limit: 20
  hub:
  content: false
  contentLimit: 140
```

then run this command to install it.

```
$ npm i -s hikaru-generator-feed
```
