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
    - [`toObject(): JsonObject`](#toobject-jsonobject)
    - [`static fromJSON(obj: JsonObject, fromJSONParser?: FromJSONParser): Fragment`](#static-fromjsonobj-jsonobject-fromjsonparser-fromjsonparser-fragment)
  - [`InputFragment`](#inputfragment)
    - [Example](#example)
  - [`BlockFragment`](#blockfragment)
    - [Example](#example-1)
  - [`Defining new Fragments`](#defining-new-fragments)
  - [`FromJSONParser`](#fromjsonparser)
- [Validations](#validations)
- [`SchemaTransformer`](#schematransformer)
  - [`public addTransformer(type: string, transformer: (validation: InputValidation, currentSchema: T) => T):void`](#public-addtransformertype-string-transformer-validation-inputvalidation-currentschema-t--tvoid)
  - [`public addTypeMapper(type: string, mapper: () => T):void`](#public-addtypemappertype-string-mapper---tvoid)
  - [`yup`](#yup)
  - [Adding other validation libraries](#adding-other-validation-libraries)
- [`FormSchema`](#formschema)
  - [`yup`](#yup-1)
  - [Adding other validation libraries](#adding-other-validation-libraries-1)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Fragments
**Fragments** are the base of the **Form-atter**. Every Fragment should be in some point mapped to an UI Component some examples:
### Examples

```ts
const inputFragment = new InputFragment('INPUT_TEXT','test-input-name','string',[
  {
    type: 'VALIDATION_REQUIRED',
    msg: 'This field is required'
  }
  //some validations
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
#### `toObject(): JsonObject`
Serialize the class to JSON compatible object.

#### `static fromJSON(obj: JsonObject, fromJSONParser?: FromJSONParser): Fragment`
Parses incoming JSON to a new `Fragment`.

### `InputFragment`
An `InputFragment` its a special Fragment that stands for input component in forms. This Fragments will also be used to generate the form schema. In case you need there's the options property to pass special options related to UI or behavior such the following:
- placeholder
- default value
- label
- options for select
- loadOptions service with keywords

Some validations can be added to the Input Fragment.
#### Example 
```ts
const inputFragment = new InputFragment('INPUT_TEXT','test-input-name','string',[
  {
    type: 'VALIDATION_REQUIRED',
    msg: 'This field is required'
  }
  //some validations
],{
  defaultValue: 'default',
  placeholder: 'Test',
  //some other custom props that you want to define
})

//this input fragment represents an Input component with
//custom props that can be mapped to a UI element and schema validation object.
```

### `BlockFragment`
A `BlockFragment` it's an all purpose `Fragment` that it's intended to be mapped to whatever you want. It can be used as layout passing *fields* prop to render childrens of a block element.

#### Example
```ts
const blockFragment = new BlockFragment(
  'BLOCK_ROW','test-row',
  [inputFragment] /*Array filled with childrens*/,
  undefined /*Some custom validation*/
)
```

### `Defining new Fragments`
To define a new fragment you should implement a new class that inherits `class Fragment`. Instead of definig a new class for UI components use `BlockFragment`. A new **Fragment** that can be defined is for Example `MetaFragment`, that stores in some way meta info about the form or the parent `BlockFragment` component.

### `FromJSONParser`
A `FromJSONParser` its an object that stands to get the way any **Fragment-like** class is parsed from JSON. It's defined a `FromJSONParser` by default `defaultFromJSONParser` . 

## Validations
Some custom validations are defined by default but any new validation can be casted from somthing like:
```ts
const validation = {
  type: 'CUSTOM_VALIDATION_{test}',
  options:{
    //anything can be here
  }
}
```
Anything can be used as a validation as long as you add a way to handle it later.

## `SchemaTransformer`
A `SchemaTransformer` it's an object intended to convert an Input to a **Validation-like** structure. It have a `typeMapper` that converts an input type to a base **validation-like** object withot any more restrictions than the type itself. It also have a `validationTransformer` that apply each validation to a **validation-like** object and return another object with the current validation applied. 

### `public addTransformer(type: string, transformer: (validation: InputValidation, currentSchema: T) => T):void`
Add a transformer to the validationTransformer

### `public addTypeMapper(type: string, mapper: () => T):void`
Add a type to the typeMapper

### `yup`
By default the Form-atter is integrated with yup for validation. Simply call
```ts
const transformer = YupSchemaTransformer()
```

### Adding other validation libraries
If you want to integrate a new library for validation for example *Joi*. Just create a new `TypeMapper` and a new `ValidationTransformer` and create a new instance of `SchemaTransformer` using them.

## `FormSchema`
A `FormSchema` is the main form component. It have fields for composing the form.
```json
{
  "_id": "5a9b1b9e3d1e86653a79b1b9",
  "name": "Sample Form",
  "options": {
    "autoSubmit": true,
    "toLink": true
  },
  "fields": [
    {
      "_id": "1",
      "name": "email",
      "type": "INPUT_TEXT",
      "validation":[
        {
          "type": "VALIDATION_EMAIL",
          "msg": "Should be an email"
        }
      ],
      "dataType": "string",
      "options":{
        "placeholder": "Email",
        "label": "Email",
        "helperText": "please enter your email"
      },
      "excludeFromValidation": false,
      "FRAGMENT_TYPE": "INPUT"
    },
    {
      "_id": "2",
      "name": "age",
      "type": "INPUT_NUMBER",
      "validation":[
        {
          "type": "VALIDATION_MIN",
          "msg": "Should have at least 0 years",
          "value": 0
        },
        {
          "type": "VALIDATION_MAX",
          "value": 100,
          "msg": "Are you a human?"
        }
      ],
      "dataType": "number",
      "options":{
        "defaultValue": 18,
        "placeholder": "Age",
        "label": "Age"
      },
      "excludeFromValidation": false,
      "FRAGMENT_TYPE": "INPUT"
    }
  ]
}
```
Call `FormSchema.fromJSON(json)` to create a form from an incoming JSON-like object. Also can be serialized to an object calling `form.toObject()`.
Calling `form.toSchema(transformer)` transform the form into a **Validation-like** object.

### `yup`
By default the Form-atter is integrated with yup for validation. Simply call
```ts
const formSchema = FormYupSchema(...)
const schema = formSchema.toSchema()
```

### Adding other validation libraries
If you want to integrate a new library for validation for example *Joi*. Just create a new `FormSchema` class that inherit from `FormSchema` and call it using previously defined `SchemaTransformer` while overriding methods.