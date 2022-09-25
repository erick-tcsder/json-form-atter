import { deepFindInputs } from '../utils/deepFindInput';
import { FormSchema, FormSchemaObject } from './FormSchema';
import { Fragment } from './Fragment';
import { defaultFromJSONParser } from './FromJSONParser';
import { Input } from './Input';
import { getYupTransformer, SchemaTransformer } from './SchemaTransformer';
import * as yup from 'yup';
import { AnySchema } from 'yup';
import { JsonObject } from 'type-fest';

const defaultSchemaTransformer = getYupTransformer();

export class FormYupSchema extends FormSchema<AnySchema> {
  constructor(name: string, fields?: Fragment[], options?: JsonObject, _id?: string) {
    super(name, fields, options, _id);
  }
  public override toSchema(transformer: SchemaTransformer<AnySchema> = defaultSchemaTransformer) {
    let validableInputs: Input[] = [];
    this.fields.forEach((fragment) => {
      validableInputs = validableInputs.concat(deepFindInputs(fragment));
    });

    const objectSchema: Record<string, AnySchema> = {};
    validableInputs.forEach((input) => {
      objectSchema[input.name] = transformer.transformInput(input);
    });
    return yup.object(objectSchema);
  }

  static override fromJSON(json: FormSchemaObject, fromJSONParser = defaultFromJSONParser): FormYupSchema {
    const fields = json[`fields`].map((field) => {
      return fromJSONParser[field[`FRAGMENT_TYPE`]](field as JsonObject, fromJSONParser);
    });
    return new FormYupSchema(json.name, fields, json.options, json._id);
  }
}
