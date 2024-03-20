import { css } from "@dreamworld/pwa-helpers/lit.js";

export const dateRangePickerStyle = css`
  :root, :host {
    --litepicker-day-width: 40px;
    --litepicker-day-height: 40px;
    --litepicker-day-margin: 4px;
    --litepicker-container-months-color-bg: var(--mdc-theme-surface);
    --litepicker-container-months-box-shadow-color: #ddd;
    --litepicker-footer-color-bg: #fafafa;
    --litepicker-footer-box-shadow-color: #ddd;
    --litepicker-tooltip-color-bg: var(--mdc-theme-surface);
    --litepicker-month-header-color: #333;
    --litepicker-button-prev-month-color: var(--mdc-theme-text-secondary-on-surface);
    --litepicker-button-next-month-color: var(--mdc-theme-text-secondary-on-surface);
    --litepicker-button-prev-month-color-hover: var(--mdc-theme-text-secondary-on-surface);
    --litepicker-button-next-month-color-hover: var(--mdc-theme-text-secondary-on-surface);
    --litepicker-month-width: calc(calc(var(--litepicker-day-width) + var(--litepicker-day-margin) + var(--litepicker-day-margin)) * 7);
    --litepicker-month-weekday-color: var(--mdc-theme-text-primary-on-surface);
    --litepicker-month-week-number-color: var(--mdc-theme-text-primary-on-surface);
    --litepicker-day-color: var(--mdc-theme-text-primary-on-surface);
    --litepicker-day-color-hover: var(--mdc-theme-primary);
    --litepicker-is-today-color: var(--mdc-theme-primary);
    --litepicker-is-in-range-color: #bbdefb;
    --litepicker-is-locked-color: #9e9e9e;
    --litepicker-is-start-color: #fff;
    --litepicker-is-start-color-bg: var(--mdc-theme-primary);
    --litepicker-is-end-color: #fff;
    --litepicker-is-end-color-bg: var(--mdc-theme-primary);
    --litepicker-button-cancel-color: #fff;
    --litepicker-button-cancel-color-bg: #9e9e9e;
    --litepicker-button-apply-color: #fff;
    --litepicker-button-apply-color-bg: var(--mdc-theme-primary);
    --litepicker-button-reset-color: #909090;
    --litepicker-button-reset-color-hover: var(--mdc-theme-primary);
    --litepicker-highlighted-day-color: #333;
    --litepicker-highlighted-day-color-bg: #ffeb3b;
  }
  .show-week-numbers {
    --litepicker-month-width: calc(var(--litepicker-day-width) * 8);
  }
  .litepicker {
  --body2-font-size: 14px;
  --body2-font-weight: 400;
  --body2-letter-spacing: 0.25px;
  --body2-line-height: 18px;
    font-family: 'Roboto', 'Noto', Arial, Verdana, helvetica, sans-serif;
    font-size: var(--body2-font-size);
    font-weight: var(--body2-font-weight);
    letter-spacing: var(--body2-letter-spacing);
    line-height: var(--body2-line-height);
    display: none;
  }
  .litepicker button {
    border: none;
    background: none;
  }
  .litepicker .container__main {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  .litepicker .container__months {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    background-color: var(--litepicker-container-months-color-bg);
    border-radius: 5px;
    -webkit-box-shadow: 0 0 5px
      var(--litepicker-container-months-box-shadow-color);
    box-shadow: 0 0 5px var(--litepicker-container-months-box-shadow-color);
    width: calc(var(--litepicker-month-width) + 10px);
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
  }
  .litepicker .container__months.columns-2 {
    width: calc((var(--litepicker-month-width) * 2) + 20px);
  }
  .litepicker .container__months.columns-3 {
    width: calc((var(--litepicker-month-width) * 3) + 30px);
  }
  .litepicker .container__months.columns-4 {
    width: calc((var(--litepicker-month-width) * 4) + 40px);
  }
  .litepicker
    .container__months.split-view
    .month-item-header
    .button-previous-month,
  .litepicker
    .container__months.split-view
    .month-item-header
    .button-next-month {
    visibility: visible;
  }
  .litepicker .container__months .month-item {
    padding: 5px;
    width: var(--litepicker-month-width);
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
  }
  .litepicker .container__months .month-item-header {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    font-weight: 500;
    padding: 10px 5px;
    text-align: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: var(--litepicker-month-header-color);
  }
  .litepicker .container__months .month-item-header div {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }
  .litepicker .container__months .month-item-header div > .month-item-name {
    margin-right: 5px;
  }
  .litepicker .container__months .month-item-header div > .month-item-year {
    padding: 0;
  }
  .litepicker .container__months .month-item-header .reset-button {
    color: var(--litepicker-button-reset-color);
  }
  .litepicker .container__months .month-item-header .reset-button > svg {
    fill: var(--litepicker-button-reset-color);
  }
  .litepicker .container__months .month-item-header .reset-button * {
    pointer-events: none;
  }
  .litepicker .container__months .month-item-header .reset-button:hover {
    color: var(--litepicker-button-reset-color-hover);
  }
  .litepicker .container__months .month-item-header .reset-button:hover > svg {
    fill: var(--litepicker-button-reset-color-hover);
  }
  .litepicker .container__months .month-item-header .button-previous-month,
  .litepicker .container__months .month-item-header .button-next-month {
    visibility: hidden;
    text-decoration: none;
    padding: 3px 5px;
    border-radius: 3px;
    -webkit-transition: color 0.3s, border 0.3s;
    transition: color 0.3s, border 0.3s;
    cursor: default;
  }

  .litepicker .container__months .month-item-header .button-previous-month svg,
  .litepicker .container__months .month-item-header .button-next-month svg {
    height: 32px;
    width: 32px;
  }
  .litepicker .container__months .month-item-header .button-previous-month *,
  .litepicker .container__months .month-item-header .button-next-month * {
    pointer-events: none;
  }
  .litepicker .container__months .month-item-header .button-previous-month {
    color: var(--litepicker-button-prev-month-color);
  }
  .litepicker
    .container__months
    .month-item-header
    .button-previous-month
    > svg,
  .litepicker
    .container__months
    .month-item-header
    .button-previous-month
    > img {
    fill: var(--litepicker-button-prev-month-color);
  }
  .litepicker
    .container__months
    .month-item-header
    .button-previous-month:hover {
    color: var(--litepicker-button-prev-month-color-hover);
  }
  .litepicker
    .container__months
    .month-item-header
    .button-previous-month:hover
    > svg {
    fill: var(--litepicker-button-prev-month-color-hover);
  }
  .litepicker .container__months .month-item-header .button-next-month {
    color: var(--litepicker-button-next-month-color);
  }
  .litepicker .container__months .month-item-header .button-next-month > svg,
  .litepicker .container__months .month-item-header .button-next-month > img {
    fill: var(--litepicker-button-next-month-color);
  }
  .litepicker .container__months .month-item-header .button-next-month:hover {
    color: var(--litepicker-button-next-month-color-hover);
  }
  .litepicker
    .container__months
    .month-item-header
    .button-next-month:hover
    > svg {
    fill: var(--litepicker-button-next-month-color-hover);
  }
  .litepicker .container__months .month-item-weekdays-row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-self: center;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    color: var(--litepicker-month-weekday-color);
  }
  .litepicker .container__months .month-item-weekdays-row > div {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    font-family: 'Roboto', 'Noto', Arial, Verdana, helvetica, sans-serif;
    font-size: var(--body2-font-size);
    font-weight: var(--body2-font-weight);
    letter-spacing: var(--body2-letter-spacing);
    line-height: var(--body2-line-height);
    padding: 0;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: var(--litepicker-day-width);
    height: var(--litepicker-day-height);
    margin: var(--litepicker-day-margin);
    max-height: 48px;
    text-align: center;
  }
  .litepicker
    .container__months
    .month-item:first-child
    .button-previous-month {
    visibility: visible;
  }
  .litepicker .container__months .month-item:last-child .button-next-month {
    visibility: visible;
  }
  .litepicker
    .container__months
    .month-item.no-previous-month
    .button-previous-month {
    visibility: hidden;
  }
  .litepicker .container__months .month-item.no-next-month .button-next-month {
    visibility: hidden;
  }
  .litepicker .container__days {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    justify-self: center;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    text-align: center;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
  }
  .litepicker .container__days > div,
  .litepicker .container__days > a {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 0;
    width: var(--litepicker-day-width);
    height: var(--litepicker-day-height);
    margin: var(--litepicker-day-margin);
  }
  .litepicker .container__days .day-item {
    position: relative;
    color: var(--litepicker-day-color);
    text-align: center;
    text-decoration: none;
    border-radius: 3px;
    -webkit-transition: color 0.3s, border 0.3s opacity 150ms;
    transition: color 0.3s, border 0.3s opacity 150ms;
    cursor: default;
  }

  .litepicker .container__days .day-item::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--mdc-theme-on-surface);
    transition: opacity 150ms;
    opacity: 0;
    border-radius: 50%;
  }

  .litepicker .container__days .day-item:hover::before {
    opacity: 0.04;
  }

  .litepicker .container__days .day-item.is-today {
    color: var(--litepicker-is-today-color);
    -webkit-box-shadow: inset 0 0 0 1px var(--litepicker-day-color-hover);
    box-shadow: inset 0 0 0 1px var(--litepicker-is-today-color);
  }

  .litepicker .container__days .day-item.is-locked {
    color: var(--litepicker-is-locked-color);
    cursor: default;
  }

  .litepicker .container__days .day-item.is-locked:hover {
    color: var(--litepicker-is-locked-color);
    -webkit-box-shadow: none;
    box-shadow: none;
    cursor: default;
  }

  .litepicker .container__days .day-item.is-today.is-locked:hover {
    -webkit-box-shadow: inset 0 0 0 1px var(--litepicker-day-color-hover);
    box-shadow: inset 0 0 0 1px var(--litepicker-is-today-color);
    cursor: default;
  }

  .litepicker .container__days .day-item.is-locked:hover::before,
  .litepicker .container__days .day-item.is-today.is-locked:hover::before {
    opacity: 0;
  }

  .litepicker .container__days .day-item.is-in-range {
    background-color: var(--litepicker-is-in-range-color);
    border-radius: 0;
  }
  .litepicker .container__days .day-item.is-start-date {
    color: var(--litepicker-is-start-color);
    background-color: var(--litepicker-is-start-color-bg);
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .litepicker .container__days .day-item.is-start-date.is-flipped {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .litepicker .container__days .day-item.is-end-date {
    color: var(--litepicker-is-end-color);
    background-color: var(--litepicker-is-end-color-bg);
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .litepicker .container__days .day-item.is-end-date.is-flipped {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .litepicker .container__days .day-item.is-start-date.is-end-date {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .litepicker .container__days .day-item.is-highlighted {
    color: var(--litepicker-highlighted-day-color);
    background-color: var(--litepicker-highlighted-day-color-bg);
  }
  .litepicker .container__days .week-number {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    color: var(--litepicker-month-week-number-color);
    font-family: 'Roboto', 'Noto', Arial, Verdana, helvetica, sans-serif;
    font-size: var(--body2-font-size);
    font-weight: var(--body2-font-weight);
    letter-spacing: var(--body2-letter-spacing);
    line-height: var(--body2-line-height);
  }
  .litepicker .container__footer {
    text-align: right;
    padding: 10px 5px;
    margin: 0 5px;
    background-color: var(--litepicker-footer-color-bg);
    -webkit-box-shadow: inset 0px 3px 3px 0px
      var(--litepicker-footer-box-shadow-color);
    box-shadow: inset 0px 3px 3px 0px var(--litepicker-footer-box-shadow-color);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .litepicker .container__footer .preview-date-range {
    margin-right: 10px;
    font-family: 'Roboto', 'Noto', Arial, Verdana, helvetica, sans-serif;
    font-size: var(--body2-font-size);
    font-weight: var(--body2-font-weight);
    letter-spacing: var(--body2-letter-spacing);
    line-height: var(--body2-line-height);
  }
  .litepicker .container__footer .button-cancel {
    background-color: var(--litepicker-button-cancel-color-bg);
    color: var(--litepicker-button-cancel-color);
    border: 0;
    padding: 3px 7px 4px;
    border-radius: 3px;
  }
  .litepicker .container__footer .button-cancel * {
    pointer-events: none;
  }
  .litepicker .container__footer .button-apply {
    background-color: var(--litepicker-button-apply-color-bg);
    color: var(--litepicker-button-apply-color);
    border: 0;
    padding: 3px 7px 4px;
    border-radius: 3px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .litepicker .container__footer .button-apply:disabled {
    opacity: 0.7;
  }
  .litepicker .container__footer .button-apply * {
    pointer-events: none;
  }
  .litepicker .container__tooltip {
    position: absolute;
    margin-top: -4px;
    padding: 4px 8px;
    border-radius: 4px;
    background-color: var(--litepicker-tooltip-color-bg);
    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
    white-space: nowrap;
    font-size: 11px;
    pointer-events: none;
    visibility: hidden;
  }
  .litepicker .container__tooltip:before {
    position: absolute;
    bottom: -5px;
    left: calc(50% - 5px);
    border-top: 5px solid rgba(0, 0, 0, 0.12);
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    content: "";
  }
  .litepicker .container__tooltip:after {
    position: absolute;
    bottom: -4px;
    left: calc(50% - 4px);
    border-top: 4px solid var(--litepicker-tooltip-color-bg);
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
    content: "";
  }

  .litepicker {
    --litepicker-button-prev-month-color: var(--mdc-theme-text-secondary-on-surface);
    --litepicker-button-next-month-color: var(--mdc-theme-text-secondary-on-surface);
    --litepicker-button-next-month-color-hover: var(--mdc-theme-text-secondary-on-surface);
    --litepicker-button-prev-month-color-hover: var(--mdc-theme-text-secondary-on-surface);
  }

  .litepicker .container__months .month-item:first-child .button-previous-month,
  .litepicker .container__months .month-item-header .button-next-month {
    height: 48px;
    width: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px;
  }

  .litepicker .container__months .month-item-header div > .month-item-name,
  .litepicker .container__months .month-item-header div > .month-item-year {
    font-family: 'Roboto', 'Noto', Arial, Verdana, helvetica, sans-serif;
    font-size: var(--headline6-font-size, 16px);
    letter-spacing: var(--headline6-letter-spacing);
    line-height: var(--headline6-line-height);
    font-weight: var(--headline6-font-weight);
    color: var(--mdc-theme-text-primary-on-surface);
    font-weight: 700;
  }

  .litepicker .container__months .month-item-header {
    height: 56px;
    box-sizing: border-box;
    padding: 0px;
  }

  .litepicker .container__months .month-item:first-child .button-previous-month,
  .litepicker .container__months .month-item-header .button-next-month,
  .litepicker .container__days .day-item {
    cursor: pointer;
  }

  .litepicker[data-plugins*="ranges"][data-ranges-position="left"]
    > .container__main {
    box-shadow: none;
  }

  .litepicker .container__months,
  .litepicker[data-plugins*="ranges"]
    > .container__main
    > .container__predefined-ranges {
    border-radius: 0px;
    box-shadow: none;
  }

  .litepicker .container__months {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .litepicker[data-plugins*="ranges"]
    > .container__main
    > .container__predefined-ranges {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    padding-top: 8px;
    width: 140px;
    border-right: 1px solid rgba(0, 0, 0, 0.2);
  }

  .litepicker[data-plugins*="ranges"]
    > .container__main
    > .container__predefined-ranges
    button {
    padding: 8px 12px;
    cursor: pointer;
  }

  .litepicker[data-plugins*="ranges"]
    > .container__main
    > .container__predefined-ranges
    button:hover {
    cursor: pointer;
    opacity: 1;
  }
`;


export default dateRangePickerStyle;