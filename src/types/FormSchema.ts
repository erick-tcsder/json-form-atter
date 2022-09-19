import {v4 as uuidv4} from 'uuid'
import { Fragment } from './Fragment'
import {JsonArray, JsonObject} from 'type-fest'
import { defaultFromJSONParser } from './FromJSONParser';
import { SchemaTransformer } from './SchemaTransformer';
import { deepFindInputs } from '../utils/deepFindInput';
import * as yup from 'yup'
import type { AnySchema } from 'yup';
import { Input } from './Input';

export type FormSchemaObject = {
  _id: string;
  name: string;
  fields: JsonArray;
  options: JsonObject;
}

const defaultSchemaTransformer = SchemaTransformer.getInstance()

export class FormSchema {
  public _id:string
  constructor(
    public name:string,
    public fields?: Fragment[],
    public options?: JsonObject,
  ){
    this._id = uuidv4()
  }

  public toObject():JsonObject{
    return {
      _id: this._id,
      name: this.name,
      fields: this.fields.map(field=>field.toObject()),
      options: this.options
    }
  }

  public toSchema(transformer = defaultSchemaTransformer){
    let validableInputs : Input[] = []
    this.fields.forEach(fragment=>{
      validableInputs = validableInputs.concat(deepFindInputs(fragment))
    })

    let objectSchema : Record<string, AnySchema> = {}
    validableInputs.forEach((input)=>{
      objectSchema[input.name] = transformer.transformInput(input)
    })
    return yup.object(objectSchema)
  }

  public static fromJSON(json: FormSchemaObject, fromJSONParser = defaultFromJSONParser): FormSchema {
    const fields = json[`fields`]
      ?.map((field)=>
        fromJSONParser[field[`FRAGMENT_TYPE`]](field as JsonObject, fromJSONParser)
      )
    return new FormSchema(
      json.name,
      fields,
      json.options
    )
  }
}