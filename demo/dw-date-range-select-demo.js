import { LitElement, html, css } from "lit";
import "../dw-date-range-select.js";

export class DwDateRangeSelectDemo extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];

  render() {
    return html` <dw-date-range-select> </dw-date-range-select> `;
  }
}

customElements.define("dw-date-range-select-demo", DwDateRangeSelectDemo);
