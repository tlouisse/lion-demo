import { LionDialog } from '@lion/ui/dialog.js';
import { LitElement, html, css } from 'lit';

// As a side-effect this way of importing defines the custom elements, eg. <lion-button>, ready for use
import '@lion/ui/define/lion-button.js';
import '@lion/ui/define/lion-dialog.js';

class ContentNodeWithShadowRoot extends LitElement {
  static styles = [
    css`
    :host { 
      background-color: white;
      padding: 1rem;
    }`
  ];

  render() {
    return html`<slot></slot>`;
  }
}
customElements.define('content-node-with-shadow-root', ContentNodeWithShadowRoot);

export class LionDemo extends LitElement {
  static properties = {
    counter: { type: Number },
    header: { type: String },
  };

  constructor() {
    super();
    this.header = 'Hey dev';
    this.counter = 0;
  }
  
  render() {
    return html`
      <lion-dialog>
        <lion-button slot="invoker">open (breaks a11y on safari)</lion-button>
        <content-node-with-shadow-root slot="content">
          bla bla bla 

          <input> <lion-button>sadasd</lion-button>
        </content-node-with-shadow-root>
      </lion-dialog>
    `;
  }
}
customElements.define('lion-demo', LionDemo);

class LionDialog2 extends LionDialog {
  /**
   * N.B. this is needed to make sure that we don't run into a11y issues in Safari
   * @configure OverlayMixin instead of [slot=content], we point to ing-overlay-frame
   */
  get _overlayContentNode() {
    return /** @type {HTMLElement} */ (
      /** @type {ShadowRoot} */ (this.shadowRoot).querySelector('.overlay-framehost')
    );
  }

  render() {
    return html`
      <slot name="invoker"></slot>
      <div id="overlay-content-node-wrapper">
        <div class="overlay-framehost">
          <slot name="content"></slot>
        </div>
      </div>
    `;
  }
}
customElements.define('lion-dialog-2', LionDialog2);

export class LionDemo2 extends LitElement {
  static properties = {
    counter: { type: Number },
    header: { type: String },
  };

  constructor() {
    super();
    this.header = 'Hey dev';
    this.counter = 0;
  }
  
  render() {
    return html`
      <lion-dialog-2>
        <lion-button slot="invoker">open (works on safari)</lion-button>
        <content-node-with-shadow-root slot="content">
          bla bla bla die bla

          <input> <lion-button>sadasd</lion-button>
        </content-node-with-shadow-root>
      </lion-dialog-2>
    `;
  }
}
customElements.define('lion-demo-2', LionDemo2);