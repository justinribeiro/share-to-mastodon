/* eslint-disable lit/no-invalid-html */
import { html, css, LitElement } from 'lit';

/**
 * share-to-mastodon - a small web component that uses a internal mini-modal to
 * allow setting of a target Mastodon instance from the user to allow sharing.
 *
 * @slot default - The text or what ever you want the link to be
 *
 * @cssprop [--wc-stm-color=black] - the host text color, default #000
 * @cssprop [--wc-stm-font-family=sans-serif] - the host font family, default sans-serif
 * @cssprop [--wc-stm-link-text-decoration=underline] - the link text decoration if no slot structures overwrite
 * @cssprop [--wc-stm-link-color-initial=blue] - the link text color if no slot structures overwrite
 * @cssprop [--wc-stm-link-color-active=red] - the link text color active
 * @cssprop [--wc-stm-link-color-visited=purple] - the link text color visited
 * @cssprop [--wc-stm-dialog-padding=1rem] - the mini-dialogs inner padding
 * @cssprop [--wc-stm-dialog-background-color=white] - the mini-dialogs background color
 * @cssprop [--wc-stm-dialog-border-radius=0.5rem] - this mini-dialogs border radius
 * @cssprop [--wc-stm-form-input-padding=0.5rem]
 * @cssprop [--wc-stm-form-input-border-radius=0.25rem]
 * @cssprop [--wc-stm-form-input-border=1px solid #ccc]
 * @cssprop [--wc-stm-form-input-font-size=1em]
 * @cssprop [--wc-stm-form-button-border]
 * @cssprop [--wc-stm-form-button-border-radius=0.25rem]
 * @cssprop [--wc-stm-form-button-background-color=#eee]
 * @cssprop [--wc-stm-form-button-padding=0.5rem 0]
 * @cssprop [--wc-stm-form-button-font-size=1em]
 * @cssprop [--wc-stm-form-button-color=inherit]
 * @cssprop [--wc-stm-form-button-background-color-hover=#ccc]
 * @cssprop [--wc-stm-form-button-color-hover=inherit]
 *
 * @extends {LitElement}
 */
export class ShareToMastodon extends LitElement {
  static get styles() {
    return css`
      :host {
        will-change: transform, opacity;
        color: var(--wc-stm-color, #000);
        font-family: var(--wc-stm-font-family, sans-serif);
      }

      a {
        text-decoration: var(--wc-stm-link-text-decoration, underline);
        color: var(--wc-stm-link-color-initial, blue);
      }
      a:active {
        color: var(--wc-stm-link-color-active, red);
      }
      a:visited {
        color: var(--wc-stm-link-color-visited, purple);
      }

      #dialog,
      #backdrop {
        display: none;
      }

      :host([open]) {
        z-index: 10000;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      :host([open]) > a {
        display: none;
      }

      :host([open]) > #dialog {
        padding: 0;
        margin: 0;
        outline: none;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        border: none;
        overflow-y: auto;
        overscroll-behavior: contain;
        position: relative;
        z-index: 1;
        padding: var(--wc-stm-dialog-padding, 1rem);
        background-color: var(--wc-stm-dialog-background-color, #fff);
        border-radius: var(--wc-stm-dialog-border-radius, 0.5rem);
        overflow: hidden;
        max-width: 80vw;
      }

      :host([open]) > #backdrop {
        display: block;
        background-color: var(
          --wc-stm-dialog-backdrop-color,
          rgba(0, 0, 0, 0.5)
        );
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        outline: none;
      }

      #url {
        padding: var(--wc-stm-form-input-padding, 0.5rem);
        border-radius: var(--wc-stm-form-input-border-radius, 0.25rem);
        border: var(--wc-stm-form-input-border, 1px solid #ccc);
        font-size: var(--wc-stm-form-input-font-size, 1em);
      }
      #save {
        padding: var(--wc-stm-form-input-padding, 0.5rem);
      }

      form {
        display: flex;
        flex-direction: column;
      }

      form > p,
      form > div {
        margin: 0;
        padding: var(--wc-stm-form-input-padding, 1rem 0);
      }

      form > button {
        border: var(--wc-stm-form-button-border);
        border-radius: var(--wc-stm-form-button-border-radius, 0.25rem);
        background-color: var(--wc-stm-form-button-background-color, #eee);
        padding: var(--wc-stm-form-button-padding, 0.5rem 0);
        font-size: var(--wc-stm-form-button-font-size, 1em);
        color: var(--wc-stm-form-button-color, inherit);
      }
      form > button:hover {
        border: var(--wc-stm-form-button-border);
        border-radius: var(--wc-stm-form-button-border-radius, 0.25rem);
        background-color: var(
          --wc-stm-form-button-background-color-hover,
          #ccc
        );
        color: var(--wc-stm-form-button-color-hover, inherit);
      }
    `;
  }

  static get properties() {
    return {
      /**
       * The message you'd like to share within the target Mastodon input that
       * opens on the share page.
       * @attr
       */
      message: { type: String },
      /**
       * The url of the thing you are sharing within the target Mastodon input that
       * opens on the share page.
       * @attr
       */
      url: { type: String },
      /**
       * The target Mastodon instance, usually set by the user within the
       * mini-modal that display on first share
       * @property
       */
      targetInstance: { type: String },
      /**
       * The string that is displayed above the input field on the mini-modal
       * @attr
       */
      modalMessage: { type: String },
      /**
       * The string that is display on as the action button to share on the
       * mini-modal
       * @attr
       */
      modalShareButton: { type: String },
      /**
       * The string that is used as the label for the checkbox default save
       * option
       */
      modalSaveAsDefault: { type: String },
      /**
       * An array of Mastodon instances you would like auto-populated within the
       * url datalist
       * @example [{ label: 'Mastodon.Social', link: 'https://mastodon.social/' }]
       * @property
       */
      customInstanceList: { type: Array },
    };
  }

  constructor() {
    super();
    this.message = 'Check out the amazing content I just discovered!';
    this.url = window.location.href;
    this.targetInstance = '';
    this.modalMessage = "Select or set which instance you'd like to share to.";
    this.modalShareButton = 'Share';
    this.modalSaveAsDefault = 'Remember My Instance (locally only)';
    this.customInstanceList = [
      { label: 'Mastodon.Social', link: 'https://mastodon.social/' },
      { label: 'Mastodon.Online', link: 'https://mastodon.online/' },
      { label: 'fosstodon.org', link: 'https://fosstodon.org/' },
      { label: 'photog.social', link: 'https://photog.social/' },
    ];
  }

  firstUpdated() {
    this.targetInstance = localStorage.getItem('wc-share-to-mastodon') || '';
    this.shadowRoot.querySelector('#url').value = this.targetInstance;

    const form = this.shadowRoot.querySelector('form');
    form.addEventListener('submit', this.__formSubmitHandler.bind(this));
  }

  disconnectedCallback() {
    const form = this.shadowRoot.querySelector('form');
    form.removeEventListener('submit', this.__formSubmitHandler.bind(this));
  }

  /**
   * Handle the form submit and send the user to their share destination
   * @param {Event} event
   */
  __formSubmitHandler(event) {
    event.preventDefault();
    const instance = this.shadowRoot.querySelector('#url').value;
    window.open(
      `${instance}/share?text=${this.message}%20${this.url}`,
      'wcShareToMastodon'
    );
    this.removeAttribute('open');

    if (this.shadowRoot.querySelector('#save').checked) {
      this.targetInstance = instance;
      localStorage.setItem(
        'wc-share-to-mastodon',
        this.shadowRoot.querySelector('#url').value
      );
    }
  }

  /**
   * This _always_ opens the modal, primarily because I don't want to burden the
   * "what happens if they improperly type the url" problem, which would then
   * always target based on a bad string
   * @param {Event} event
   */
  __hasInstanceSet(event) {
    event.preventDefault();
    this.setAttribute('open', '');
  }

  /**
   * Close the modal share helper
   */
  cancel() {
    this.removeAttribute('open');
  }

  render() {
    return html`
      <div id="backdrop" @click="${this.cancel}"></div>
      <div id="dialog">
        <form>
          <p>${this.modalMessage}</p>
          <input
            type="url"
            name="url"
            id="url"
            placeholder="https://example.org"
            pattern="https://.*"
            size="30"
            required
            list="defaultInstances"
          />
          <datalist id="defaultInstances">
            ${this.customInstanceList.map(
              i => html`
                <option value="${i.link}" label="${i.label}"></option>
              `
            )}
          </datalist>
          <div>
            <input type="checkbox" id="save" name="save" />
            <label for="save">${this.modalSaveAsDefault}</label>
          </div>
          <button>${this.modalShareButton}</button>
        </form>
      </div>
      <a
        href="${this.targetInstance}/share?text=${this.message}%20${this.url}"
        @click=${this.__hasInstanceSet}
      >
        <slot></slot>
      </a>
    `;
  }
}
