import { html, LitElement } from 'lit';

import { repeat } from 'lit/directives/repeat.js'

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
    
    this.buttonStates = {
      inBetween: {
        clicked: false,
        message:''
      },
      toTheEnd: {
        addToTheEndClicked:false,
        message:''
      } 
    };
  }

  handleAddInputFieldInBetween() {
    this.interleaveFieldsArray(1, { name: "input_1.1" })
    
    //just to make it easy - hard coding the message logged in console
    // this.buttonStates.inBetween= {
    //   clicked: true,
    //   message: '❌ : Uncaught TypeError: Name "input_2" is already registered - if you want an array add [] to the end'
    // },

    this.requestUpdate();
  }

  handleAddInputFieldToTheEnd() {
    this.interleaveFieldsArray(this.fields.length+1, { name: "input_3" })

    //just to make it easy - hard coding the message logged in console
    this.buttonStates.toTheEnd= {
      clicked: true,
      message: '✓ : No Error when adding to the end'
    },
    this.requestUpdate();
  }

  interleaveFieldsArray(position, fieldObj){
    this.fields.splice(position, 0, fieldObj);
  }

  render() {
    return html`
      <h1> Look at the console log after clicking the button </h1>
      <div>${JSON.stringify(this.fields)}</div>
      <br>
      <lion-form>
        <form>
          ${repeat(this.fields, ({name}) => name, (({ name }) => html`<lion-input label="${name}" name=${name}>asdf</lion-input>`))}
          <br>
          <lion-button slot="invoker" ?disabled=${this.buttonStates.inBetween.clicked} @click=${this.handleAddInputFieldInBetween}>Add Question 1.1</lion-button>
          <br>
          <div style="color:red">${this.buttonStates.inBetween.message}</div>
          <br>
          <lion-button slot="invoker" ?disabled=${this.buttonStates.toTheEnd.clicked} @click=${this.handleAddInputFieldToTheEnd}>Add Question 3</lion-button>
          <div style="color:green">${this.buttonStates.toTheEnd.message}</div>
          
        </form>
      </lion-form>
    `;
  }
}
customElements.define('lion-demo', LionDemo);