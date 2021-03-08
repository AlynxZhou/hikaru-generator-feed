Hikaru Generator Feed
=====================

Feed generator plugin for Hikaru.
---------------------------------

# Usage

First go to your site dir and add following to your `site-config.yaml`.

```yaml
feed:
  enable: true
  # Generated atom xml file path, relative to site rootDir.
  path: atom.xml
  # How many posts will be generated into feed. Comment this if you want to generate all posts.
  limit: 20
  hub:
  # Set `true` to generate full content, otherwise only summary.
  content: false
  # The length of auto generated summary if no excerpt in post.
  contentLimit: 140
```

then run this command to install it.

```
$ npm i -s hikaru-generator-feed
```

If you want to skip some posts while generating, add `feed: false` to its front-matter.
