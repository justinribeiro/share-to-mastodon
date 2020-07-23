```js script
import { html } from '@open-wc/demoing-storybook';
import '../share-to-mastodon.js';

export default {
  title: 'ShareToMastodon',
  component: 'share-to-mastodon',
  options: { selectedPanel: "storybookjs/knobs/panel" },
};
```

# ShareToMastodon

A component for...

## Features:

- a
- b
- ...

## How to use

### Installation

```bash
yarn add share-to-mastodon
```

```js
import 'share-to-mastodon/share-to-mastodon.js';
```

```js preview-story
export const Simple = () => html`
  <share-to-mastodon></share-to-mastodon>
`;
```

## Variations

###### Custom Title

```js preview-story
export const CustomTitle = () => html`
  <share-to-mastodon title="Hello World"></share-to-mastodon>
`;
```
