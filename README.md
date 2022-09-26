# Schema-JSON-Form-atter
Schema JSON Form-atter its a library that's able to build, standarize, and schematize forms facing to its storage and validation. Build a `FormSchema` anyway you want, statically or with a CMS. Convert it to an storable object and store it the way you want. Convert it to a validation schema the way you want with the library you want (native support for yup) and validate the payload from the form that you created. On the other side get a JSON from anywhere, then turn it to a `FormSchema` and map it the way you want to UI Components.

## How to install
- npm
```zsh
npm install schema-json-form-atter
```
- yarn
```
yarn add schema-json-form-atter
```
- pnpm
```
pnpm add schema-json-form-atter
```

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Fragments](#fragments)
    - [Examples](#examples)
  - [`InputFragment`](#inputfragment)
  - [`BlockFragment`](#blockfragment)
  - [`Defining new Fragments`](#defining-new-fragments)
  - [`FromJSONParser`](#fromjsonparser)
- [Validations](#validations)
- [`SchemaTransformer`](#schematransformer)
  - [`yup`](#yup)
  - [Adding other validation libraries](#adding-other-validation-libraries)
- [`FormSchema`](#formschema)
  - [`yup`](#yup-1)
  - [Adding other validation libraries](#adding-other-validation-libraries-1)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Fragments
**Fragments** are the base of the **Form-atter**. Every Fragment should be in some point mapped to an UI Component some examples:
#### Examples

```ts
const inputFragment = new InputFragment('INPUT_TEXT','test-input-name','string',[
  {
    type: 'VALIDATION_REQUIRED',
    msg: 'This field is required'
  }
  //some vaidations
],{
  defaultValue: 'default',
  placeholder: 'Test',
  //some other custom props that you want to define
})

//this input fragment represents an Input component with
//custom props that can be mapped to a UI element and schema validation object.
```
```ts
const blockFragment = new BlockFragment(
  'BLOCK_ROW','test-row',
  [inputFragment] /*Array filled with childrens*/,
  undefined /*Some custom validation*/
)
```

### `InputFragment`

### `BlockFragment`

### `Defining new Fragments`

### `FromJSONParser`

## Validations

## `SchemaTransformer`

### `yup`

### Adding other validation libraries

## `FormSchema`

### `yup`

### Adding other validation libraries