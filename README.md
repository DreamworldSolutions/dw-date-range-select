# `<dw-date-range-select>` [![Published on npm](https://img.shields.io/npm/v/@dreamworld/dw-date-range-select.svg)](https://www.npmjs.com/package/@dreamworld/dw-date-range-select)

Date range input control is used to input a custom duration.

## Behaviour

- It extends [`dw-select`](https://github.com/DreamworldSolutions/dw-select), so It overrides all the beahviors of `dw-select` input control.

## value providers

### Usage

```js
// TODO
```

### valueProviders

| Name          | Returns                  | Description                                                           |
| ------------- | ------------------------ | --------------------------------------------------------------------- |
| `all()`       | `undefined`              | To get all time duration                                              |
| `thisMonth()` | (Object): `{start, end}` | An object whose start & end is the current month’s first & last date. |
| `lastMonth()` | (Object): `{start, end}` | An object whose start & end is the last month’s first & last date.    |

### valueProvidersFactory

| Name                            | Arguments                                                       | Returns                                   | Description                                                             |
| ------------------------------- | --------------------------------------------------------------- | ----------------------------------------- | ----------------------------------------------------------------------- |
| `lastNMonths(n)`                | (Number): number of last months                                 | (Function): which acts as a valueProvider | Factory Function which returns last N months start and end date         |
| `thisQuarter(fyStartsFrom)`     | (String): finacial year start from date. in the format `dd/mm`. | (Function): which acts as a valueProvider | Factory Function which returns this quater start and end date           |
| `lastQuarter(fyStartsFrom)`     | (String): finacial year start from date. in the format `dd/mm`. | (Function): which acts as a valueProvider | Factory Function which returns last quater start and end date           |
| `thisFinancialYear(startsFrom)` | (String): finacial year start from date. in the format `dd/mm`. | (Function): which acts as a valueProvider | Factory Function which returns current finacial year start and end date |
| `lastFinancialYear(startsFrom)` | (String): finacial year start from date. in the format `dd/mm`. | (Function): which acts as a valueProvider | Factory Function which returns last finacial year start and end date    |

## API

### Properties

**Inherited from dw-select**

| Name              | Type                       |
| ----------------- | -------------------------- |
| `outlined`        | `false`                    |
| `name`            | `string`                   |
| `value`           | `object\|object[]`         |
| `originalValue`   | `object`                   |
| `label`           | `string`                   |
| `placeholder`     | `string`                   |
| `helper`          | `string`                   |
| `readOnly`        | `boolean`                  |
| `required`        | `boolean`                  |
| `errorMessage`    | `string`                   |
| `requiredMessage` | `string`                   |
| `validity`        | `ValidityState` (readonly) |
| `disabled`        | `boolean`                  |
| `items`           | `DateRangeItem[]`          |
| `dialogWidth`     | `number`                   |

### DateRangeItem

| Key             | Type       | Description                                                   |
| --------------- | ---------- | ------------------------------------------------------------- |
| `label`         | `string`   | Text to be shown in the list item and for the selected value. |
| `valueProvider` | `function` | **Returns:** object which contains start and end date         |

