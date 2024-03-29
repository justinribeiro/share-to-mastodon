[![npm version](https://badge.fury.io/js/@justinribeiro%2Fshare-to-mastodon.svg)](https://badge.fury.io/js/@justinribeiro%2Fshare-to-mastodon) [![min+gzip](https://badgen.net/bundlephobia/minzip/@justinribeiro/share-to-mastodon)](https://bundlephobia.com/result?p=@justinribeiro/share-to-mastodon@2.0.1)

![Statements](https://img.shields.io/badge/statements-100%25-brightgreen.svg?style=flat) ![Branches](https://img.shields.io/badge/branches-100%25-brightgreen.svg?style=flat) ![Functions](https://img.shields.io/badge/functions-100%25-brightgreen.svg?style=flat) ![Lines](https://img.shields.io/badge/lines-100%25-brightgreen.svg?style=flat)

# \<share-to-mastodon>

> a small lit-based web component that uses `<dialog>` to allow setting of a target Mastodon instance from a user to allow sharing from your website.

## Features

1. Allows user to define their instance or select from a datalist that is present or custom set (the power of `input type=url list` and `datalist`! yeah web platform)
2. Will remember the selected instance if selected by the user _per the installed domain_ (no cross-domain sharing)
3. No User Tracking: it's all local, let's keep it real people
4. Lots of custom css props, every string can be overridden
5. _New in v2.0.0_: Bare metal speed, now with `<dialog>`!

## Install

This web component is built with ES modules in mind and is available on NPM:

Install share-to-mastodon:

```sh
npm i @justinribeiro/share-to-mastodon
# or
yarn add @justinribeiro/share-to-mastodon
```

After install, import into your project:

```js
import '@justinribeiro/share-to-mastodon';
```

## Install with CDN

Via JS Deliver ESM Run:

```html
<script type="module">
  import @justinribeiro/share-to-mastodon from 'https://cdn.jsdelivr.net/npm/@justinribeiro/share-to-mastodon/+esm';
</script>
```

Example running in JSFiddle: https://jsfiddle.net/justinribeiro/9voe7dfp/1/

## A Basic Example

By default, the component renders whatever you feed the `<slot>`, wrapped internally as a `<a>`:

![image](https://user-images.githubusercontent.com/643503/88313131-e7ef4f80-ccc7-11ea-9f07-5b5bc33959e2.png)

```
<share-to-mastodon message="My website is amazing, come check it out!" url="https://justinribeiro.com">
  Share to Mastodon
</share-to-mastodon>
```

## A More Advanced Style Example

If you're looking for something more button-like, congrats, the slot let's you make the magic happen:

![image](https://user-images.githubusercontent.com/643503/88312967-b9717480-ccc7-11ea-9e3f-d07fbd513285.png)

```
<style>
  .myMagicalCss > div {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    background: lightblue;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  .myMagicalCss > div:hover {
    background: #eee;
  }
  .myMagicalCss svg {
    width: 24px;
    margin-right: 0.5rem;
  }
</style>
<share-to-mastodon class="myMagicalCss">
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216.4 232">
      <path
        fill="#2b90d9"
        d="M212 139c-3 16-29 34-58 38-15 2-30 3-46 3-26-2-46-7-46-7v8c4 25 26 27 47 28 21 0 39-6 39-6l1 19s-14 8-41 10c-14 1-32-1-53-6C9 214 1 165 0 116V76c0-50 33-65 33-65C50 3 78 0 108 0h1c29 0 58 3 74 11 0 0 33 15 33 65 0 0 1 37-4 63"
      />
      <path
        fill="#fff"
        d="M178 80v61h-25V82c0-13-5-19-15-19-12 0-18 8-18 22v33H96V85c0-14-6-22-17-22s-16 6-16 19v59H39V80c0-12 3-22 9-30 7-7 16-11 26-11 13 0 22 5 28 15l6 10 6-10c6-10 16-15 28-15 11 0 19 4 26 11 6 8 10 18 10 30"
      />
    </svg>
    <div>Share This Site</div>
  </div>
</share-to-mastodon>
```

## Properties

| Property             | Attribute            | Type     | Default                                          | Description                                      |
|----------------------|----------------------|----------|--------------------------------------------------|--------------------------------------------------|
| `customInstanceList` | `customInstanceList` | `array`  | [{"label":"Mastodon.Social","link":"https://mastodon.social/"},{"label":"Mastodon.Online","link":"https://mastodon.online/"},{"label":"fosstodon.org","link":"https://fosstodon.org/"},{"label":"photog.social","link":"https://photog.social/"}] | An array of Mastodon instances you would like auto-populated within the url datalist |
| `message`            | `message`            | `string` | "Check out the amazing content I just discovered!" | The message you'd like to share within the target Mastodon input that opens on the share page. |
| `modalTitle`       | `modalTitle`       | `string` | "Share To Mastodon" | The string that is displayed as the dialog title |
| `modalMessage`       | `modalMessage`       | `string` | "Select or set which instance you'd like to share to." | The string that is displayed above the input field on the dialog |
| `modalSaveAsDefault` | `modalSaveAsDefault` | `string` | "Remember My Instance (locally only)"            | The string that is used as the label for the checkbox default save option |
| `modalShareButton`   | `modalShareButton`   | `string` | "Share"                                          | The string that is displayed on the action button to submit the form in the dialog |
| `modalCancelButton`   | `modalCancelButton`   | `string` | "Cancel"                                          | The string that is displayed on the cancel button to close the dialog |
| `targetInstance`     | `targetInstance`     | `string` | ""                                               | The target Mastodon instance, usually set by the user within the dialog that display on first share |
| `url`                | `url`                | `string` | "href"                                           | The url of the thing you are sharing within the target Mastodon input that opens on the share page. |

## Slots

| Name      | Description                                   |
|-----------|-----------------------------------------------|
| `default` | The text or what ever you want the link to be |

## CSS Custom Properties

| Property                                      | Default          | Description                                      |
|-----------------------------------------------|------------------|--------------------------------------------------|
| `--wc-stm-color`                              | "black"          | the host text color, default #000                |
| `--wc-stm-dialog-border-color`            | "transparent"          | the dialog border color                |
| `--wc-stm-dialog-background-color`            | "white"          | the dialog background color                |
| `--wc-stm-dialog-border-radius`               | "0.5rem"         | this dialogs border radius                  |
| `--wc-stm-dialog-padding`                     | "1rem"           | the dialogs inner padding                   |
| `--wc-stm-font-family`                        | "sans-serif"     | the host font family, default sans-serif         |
| `--wc-stm-form-button-background-color`       | "#eee"           |                                                  |
| `--wc-stm-form-button-background-color-hover` | "#ccc"           |                                                  |
| `--wc-stm-form-button-border`                 |                  |                                                  |
| `--wc-stm-form-button-border-radius`          | "0.25rem"        |                                                  |
| `--wc-stm-form-button-color`                  | "inherit"        |                                                  |
| `--wc-stm-form-button-color-hover`            | "inherit"        |                                                  |
| `--wc-stm-form-button-font-size`              | "1em"            |                                                  |
| `--wc-stm-form-button-padding`                | "0.5rem 0"       |                                                  |
| `--wc-stm-form-input-border`                  | "1px solid #ccc" |                                                  |
| `--wc-stm-form-input-border-radius`           | "0.25rem"        |                                                  |
| `--wc-stm-form-input-font-size`               | "1em"            |                                                  |
| `--wc-stm-form-input-padding`                 | "0.5rem"         |                                                  |
| `--wc-stm-link-color-active`                  | "red"            | the link text color active                       |
| `--wc-stm-link-color-initial`                 | "blue"           | the link text color if no slot structures overwrite |
| `--wc-stm-link-color-visited`                 | "purple"         | the link text color visited                      |
| `--wc-stm-link-text-decoration`               | "underline"      | the link text decoration if no slot structures overwrite |
| `--wc-stm-form-submit-background-color` | "#8686fd" | |
| `--wc-stm-form-cancel-background-color` | "#eeeeee" | |
| `--wc-stm-form-submit-color` | "inherit" | |
| `--wc-stm-form-cancel-color` | "inherit" | |
