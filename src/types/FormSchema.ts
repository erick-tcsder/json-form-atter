import { v4 as uuidv4 } from 'uuid';
import { Fragment } from './Fragment';
import { JsonArray, JsonObject } from 'type-fest';
import { defaultFromJSONParser } from './FromJSONParser';
import { getYupTransformer, SchemaTransformer } from './SchemaTransformer';
import { deepFindInputs } from '../utils/deepFindInput';
import * as yup from 'yup';
import type { AnySchema } from 'yup';
import { Input } from './Input';

export type FormSchemaObject = {
  _id: string;
  name: string;
  fields: JsonArray;
  options: JsonObject;
};

const defaultSchemaTransformer = getYupTransformer();

export class FormSchema<T> {
  public _id: string;
  constructor(public name: string, public fields?: Fragment[], public options?: JsonObject, _id?:string) {
    this._id = _id ?? uuidv4();
  }

  public toObject(): JsonObject {
    return {
      _id: this._id,
      name: this.name,
      fields: this.fields?.map((field) => field.toObject()) ?? [],
      options: this.options,
    };
  }

  public toSchema(transformer:SchemaTransformer<T>) {
    throw new Error('Not implemented yet')
  }
  public static fromJSON(json: FormSchemaObject, fromJSONParser = defaultFromJSONParser): FormSchema<any> {
    throw new Error('Not implemented yet')
  }
}

export class FormYupSchema extends FormSchema<AnySchema> {
  constructor(name: string, fields?: Fragment[], options?: JsonObject,_id?:string) {
    super(name, fields, options,_id);
  }
  public override toSchema(transformer: SchemaTransformer<AnySchema> = defaultSchemaTransformer) {
    let validableInputs: Input[] = [];
    this.fields.forEach((fragment) => {
      validableInputs = validableInputs.concat(deepFindInputs(fragment));
    });

    let objectSchema: Record<string, AnySchema> = {};
    validableInputs.forEach((input) => {
      objectSchema[input.name] = transformer.transformInput(input);
    });
    return yup.object(objectSchema);
  }

  static override fromJSON(json: FormSchemaObject, fromJSONParser = defaultFromJSONParser): FormYupSchema {
    const fields = json[`fields`].map((field) =>{
      return fromJSONParser[field[`FRAGMENT_TYPE`]](field as JsonObject, fromJSONParser)}
    );
    return new FormYupSchema(json.name, fields, json.options, json._id);
  }
}
