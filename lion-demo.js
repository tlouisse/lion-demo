import { html, LitElement } from 'lit';

// As a side-effect this way of importing defines the custom elements, eg. <lion-button>, ready for use
import '@lion/ui/define/lion-button.js';
import '@lion/ui/define/lion-input.js';
import '@lion/ui/define/lion-form.js';

export class LionDemo extends LitElement {
  static properties = {
    fields: {
      type: Array,
      state: true
    },
  };
  constructor() {
    super();
    this.fields = [{ name: "input_1" }, { name: "input_2" }];
    this.errorMessageInConsole = '';
  }

  handleInterLeaveInputField() {
    console.log("Asdf", this.fields);
    this.fields.splice(1, 0, { name: "input_1.1" });

    //just to make it easy - hard coding the message in console
    this.errorMessageInConsole = 'Uncaught TypeError: Name "input_2" is already registered - if you want an array add [] to the end'
    this.requestUpdate();
  }

  render() {
    return html`
      <h1> Look at the console log after clicking the button </h1>
      <lion-form>
        <form>
          ${this.fields.map(({ name }) => html`<lion-input label="${name}" name=${name}>asdf</lion-input>`)}
          <lion-button slot="invoker" @click=${this.handleInterLeaveInputField}>Add Question 1.1</lion-button>

          <br><br><br>
            <span style="color:red">${this.errorMessageInConsole}</span>
        </form>
      </lion-form>
    `;
  }
}
customElements.define('lion-demo', LionDemo);