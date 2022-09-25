import { v4 as uuidv4 } from 'uuid';
import { Fragment } from './Fragment';
import { JsonArray, JsonObject } from 'type-fest';
import { defaultFromJSONParser } from './FromJSONParser';
import { SchemaTransformer } from './SchemaTransformer';

export type FormSchemaObject = {
  _id: string;
  name: string;
  fields: JsonArray;
  options: JsonObject;
};

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
