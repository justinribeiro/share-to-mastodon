import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';

import '../share-to-mastodon.js';

const baseTemplate = html`
  <share-to-mastodon>Share To Mastodon</share-to-mastodon>
`;

describe('ShareToMastodon', () => {
  it('base element is accessible', async () => {
    const el = await fixture(baseTemplate);
    await expect(el).shadowDom.to.be.accessible();
  });

  it('dialog is open after click', async () => {
    const el = await fixture(baseTemplate);
    await el.updateComplete;
    el.shadowRoot?.querySelector('a')?.click();
    expect(el.shadowRoot.querySelector('dialog').open).to.be.true;
  });

  it('dialog is accessible', async () => {
    const el = await fixture(baseTemplate);
    await el.updateComplete;
    el.shadowRoot?.querySelector('a')?.click();
    await expect(el).shadowDom.to.be.accessible();
  });

  it('dialog closes on cancel click', async () => {
    const el = await fixture(baseTemplate);
    await el.updateComplete;
    el.shadowRoot?.querySelector('a')?.click();
    expect(el.shadowRoot.querySelector('dialog').open).to.be.true;
    el.shadowRoot?.querySelector('#cancelButton')?.click();
    expect(el.shadowRoot.querySelector('dialog').open).to.be.false;
  });

  it('form validation check', async () => {
    const el = await fixture(baseTemplate);
    await el.updateComplete;
    el.shadowRoot?.querySelector('a')?.click();
    expect(el.shadowRoot.querySelector('dialog').open).to.be.true;
    el.shadowRoot?.querySelector('#submitButton')?.click();
    expect(el.shadowRoot.querySelector('input').reportValidity()).to.be.false;
  });

  it('form validation check', async () => {
    const el = await fixture(baseTemplate);
    await el.updateComplete;
    el.shadowRoot?.querySelector('a')?.click();
    expect(el.shadowRoot.querySelector('dialog').open).to.be.true;
    el.shadowRoot.querySelector('input').value = 'https://ribeiro.social';
    expect(el.shadowRoot.querySelector('input').reportValidity()).to.be.true;
  });

  it('form submit opens window to instance', async () => {
    const el = await fixture(baseTemplate);
    const windowOpenStub = stub(window, 'open');
    await el.updateComplete;
    el.shadowRoot?.querySelector('a')?.click();
    expect(el.shadowRoot.querySelector('dialog').open).to.be.true;
    el.shadowRoot.querySelector('input').value = 'https://ribeiro.social';
    expect(el.shadowRoot.querySelector('input').reportValidity()).to.be.true;
    el.shadowRoot?.querySelector('#submitButton')?.click();
    expect(windowOpenStub).to.have.callCount(1);
  });

  it('form submit saves instance to local storage when checked', async () => {
    const el = await fixture(baseTemplate);
    await el.updateComplete;
    el.shadowRoot?.querySelector('a')?.click();
    expect(el.shadowRoot.querySelector('dialog').open).to.be.true;
    el.shadowRoot.querySelector('input').value = 'https://ribeiro.social';
    el.shadowRoot.querySelector('#save').checked = true;
    el.shadowRoot?.querySelector('#submitButton')?.click();
    expect(localStorage.getItem('wc-share-to-mastodon')).to.equal(
      'https://ribeiro.social'
    );
  });

  it('form submit saves instance to local storage when checked', async () => {
    const el = await fixture(baseTemplate);
    await el.updateComplete;
    el.shadowRoot?.querySelector('a')?.click();
    expect(el.shadowRoot.querySelector('dialog').open).to.be.true;
    el.shadowRoot.querySelector('input').value = 'https://ribeiro.social';
    el.shadowRoot.querySelector('#save').checked = true;
    el.shadowRoot?.querySelector('#submitButton')?.click();
    expect(localStorage.getItem('wc-share-to-mastodon')).to.equal(
      'https://ribeiro.social'
    );
    el.shadowRoot?.querySelector('a')?.click();
    expect(el.shadowRoot.querySelector('input').value).to.equal(
      'https://ribeiro.social'
    );
  });
});
