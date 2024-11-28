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
        <lion-button slot="invoker">open</lion-button>
        <content-node-with-shadow-root slot="content">
          bla bla bla 

          <input> <lion-button>sadasd</lion-button>
        </content-node-with-shadow-root>
      </lion-tooltip>
    `;
  }
}
customElements.define('lion-demo', LionDemo);