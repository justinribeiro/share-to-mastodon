# \<share-to-mastodon>
> a small web component that uses a internal mini-modal to allow setting of a target Mastodon instance from the user to allow sharing.

## Features

1. Allows user to define their instance or select from a datalist that is present or custom set (the power of `input type=url list` and `datalist`! yeah web platform)
2. Will remember that for the domain
3. Does zero tracking of anything
4. Lots of custom css props, every string can be overridden

## Example

```
<share-to-mastodon message="My website is amazing, come check it out!" url="https://justinribeiro.com">
  Share to Mastodon
</share-to-mastodon>
```

## Properties

| Property             | Attribute            | Type     | Default                                          | Description                                      |
|----------------------|----------------------|----------|--------------------------------------------------|--------------------------------------------------|
| `customInstanceList` | `customInstanceList` | `array`  | [{"label":"Mastodon.Social","link":"https://mastodon.social/"},{"label":"Mastodon.Online","link":"https://mastodon.online/"},{"label":"fosstodon.org","link":"https://fosstodon.org/"},{"label":"photog.social","link":"https://photog.social/"}] | An array of Mastodon instances you would like auto-populated within the<br />url datalist |
| `message`            | `message`            | `string` | "Check out the amazing content I just discovered!" | The message you'd like to share within the target Mastodon input that<br />opens on the share page. |
| `modalMessage`       | `modalMessage`       | `string` | "Select or set which instance you'd like to share to." | The string that is displayed above the input field on the mini-modal |
| `modalSaveAsDefault` | `modalSaveAsDefault` | `string` | "Save As My Default For This Site"               | The string that is used as the label for the checkbox default save<br />option |
| `modalShareButton`   | `modalShareButton`   | `string` | "Share"                                          | The string that is display on as the action button to share on the<br />mini-modal |
| `targetInstance`     | `targetInstance`     | `string` | ""                                               | The target Mastodon instance, usually set by the user within the<br />mini-modal that display on first share |
| `url`                | `url`                | `string` | "href"                                           | The url of the thing you are sharing within the target Mastodon input that<br />opens on the share page. |

## Methods

| Method   | Type       | Description                  |
|----------|------------|------------------------------|
| `cancel` | `(): void` | Close the modal share helper |

## Slots

| Name      | Description                                   |
|-----------|-----------------------------------------------|
| `default` | The text or what ever you want the link to be |

## CSS Custom Properties

| Property                                      | Default          | Description                                      |
|-----------------------------------------------|------------------|--------------------------------------------------|
| `--wc-stm-color`                              | "black"          | the host text color, default #000                |
| `--wc-stm-dialog-background-color`            | "white"          | the mini-dialogs background color                |
| `--wc-stm-dialog-border-radius`               | "0.5rem"         | this mini-dialogs border radius                  |
| `--wc-stm-dialog-padding`                     | "1rem"           | the mini-dialogs inner padding                   |
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
