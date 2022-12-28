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
 * @cssprop [--wc-stm-dialog-background-color=white] - the dialogs background color
 * @cssprop [--wc-stm-dialog-border-color=transparent] - the dialogs border color
 * @cssprop [--wc-stm-dialog-border-radius=0.5rem] - this dialogs border radius
 * @cssprop [--wc-stm-title-margin-top-bottom=0.5rem] - the mini-dialogs title margin for the H2
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
 * @cssprop [--wc-stm-form-submit-background-color=#ccc]
 * @cssprop [--wc-stm-form-cancel-background-color=#eee]
 * @cssprop [--wc-stm-form-submit-color=inherit]
 * @cssprop [--wc-stm-form-cancel-color=inherit]
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

      #title {
        margin: var(--wc-stm-title-margin-top-bottom, 0.5rem) 0;
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

      dialog {
        background-color: var(--wc-stm-dialog-background-color, #fff);
        border-radius: var(--wc-stm-dialog-border-radius, 0.5rem);
        border-color: var(--wc-stm-dialog-border-color, transparent);
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

      #actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      #actions > button {
        border: var(--wc-stm-form-button-border);
        border-radius: var(--wc-stm-form-button-border-radius, 0.25rem);
        padding: var(--wc-stm-form-button-padding, 0.5rem 0);
        font-size: var(--wc-stm-form-button-font-size, 1em);
        width: calc(50% - 0.5rem);
      }

      #actions > button:hover {
        border: var(--wc-stm-form-button-border);
        border-radius: var(--wc-stm-form-button-border-radius, 0.25rem);
        background-color: var(
          --wc-stm-form-button-background-color-hover,
          #ccc
        );
        color: var(--wc-stm-form-button-color-hover, inherit);
      }

      #submitButton {
        background-color: var(--wc-stm-form-submit-background-color, #8686fd);
        color: var(--wc-stm-submit-button-color, inherit);
      }

      #cancelButton {
        background-color: var(--wc-stm-form-cancel-background-color, #eeeeee);
        color: var(--wc-stm-cancel-button-color, inherit);
      }
    `;
  }

  static get properties() {
    return {
      /**
       * The dialog modal title. Also used for screen readers.
       * @attr
       */
      modalTitle: { type: String },
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
       * The string that is displayed on the action button to share.
       * @attr
       */
      modalShareButton: { type: String },
      /**
       * The string that is used as the label for the checkbox default save
       * option
       */
      modalSaveAsDefault: { type: String },
      /**
       * The string that is displayed on the action button to cancel the dialog.
       */
      modalShareCancel: { type: String },
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
    this.modalTitle = 'Share to Mastodon';
    this.modalMessage = "Select or set which instance you'd like to share to.";
    this.modalShareButton = 'Share';
    this.modalShareCancel = 'Cancel';
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
    this.__close();

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

    const checkLocalStorage = localStorage.getItem('wc-share-to-mastodon');

    if (checkLocalStorage) {
      this.shadowRoot.querySelector('input').value = checkLocalStorage;
    }

    this.shadowRoot.querySelector('dialog').showModal();
  }

  __close() {
    this.shadowRoot.querySelector('dialog').close();
  }

  render() {
    return html`
      <dialog aria-labelledby="title">
        <form>
          <h2 id="title">${this.modalTitle}</h2>
          <label for="url">${this.modalMessage}</label>
          <input
            type="url"
            name="url"
            id="url"
            placeholder="https://example.org"
            pattern="https://.*"
            size="30"
            required
            list="defaultInstances"
            autofocus
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
          <div id="actions">
            <button id="submitButton">${this.modalShareButton}</button>
            <button type="button" id="cancelButton" @click="${this.__close}">
              ${this.modalShareCancel}
            </button>
          </div>
        </form>
      </dialog>
      <a
        href="${this.targetInstance}/share?text=${this.message}%20${this.url}"
        @click=${this.__hasInstanceSet}
      >
        <slot></slot>
      </a>
    `;
  }
}

window.customElements.define('share-to-mastodon', ShareToMastodon);
