import {AnySchema, DateSchema, NumberSchema, StringSchema} from 'yup'
import { InputValidation } from "./Validation";
import * as yup from 'yup'
import { Input } from './Input';

const defaultTransformer : Record<string,(validation:InputValidation,current_schema:AnySchema)=>AnySchema> = {
  'VALIDATION_REQUIRED': (validation,current_schema) => 
    {
      if(validation.type !== 'VALIDATION_REQUIRED') return current_schema;
      return current_schema.required(validation.msg)
    },
  'VALIDATION_MIN': (validation,current_schema) =>
    {
      if(validation.type !== 'VALIDATION_MIN') return current_schema;
      return (current_schema as NumberSchema).min(validation.value as number,validation.msg)
    },
  'VALIDATION_MAX': (validation,current_schema) =>
    {
      if(validation.type !== 'VALIDATION_MAX') return current_schema;
      return (current_schema as NumberSchema).max(validation.value as number,validation.msg)
    },
  'VALIDATION_DATE_AFTER': (validation,current_schema) =>
    {
      if(validation.type !== 'VALIDATION_DATE_AFTER') return current_schema;
      return (current_schema as DateSchema).min(validation.value as string,validation.msg)
    },
  'VALIDATION_DATE_BEFORE': (validation,current_schema) =>
    {
      if(validation.type !== 'VALIDATION_DATE_BEFORE') return current_schema;
      return (current_schema as DateSchema).max(validation.value as string,validation.msg)
    },
  'VALIDATION_EMAIL': (validation,current_schema) => 
    {
      if(validation.type !== 'VALIDATION_EMAIL') return current_schema;
      return (current_schema as StringSchema).email(validation.msg)
    },
  'VALIDATION_REGEXP': (validation,current_schema) =>
    {
      if(validation.type !== 'VALIDATION_REGEXP') return current_schema;
      const regexp = new RegExp(validation.value as string)
      return (current_schema as StringSchema).matches(regexp,validation.msg)
    },
  'VALIDATION_NULLABLE': (validation,current_schema) =>
    {
      if(validation.type !== 'VALIDATION_NULLABLE') return current_schema;
      return current_schema.nullable()
    }
}

const defaultTypeMapper : Record<string,()=>AnySchema> = {
  'string': () => yup.string(),
  'number': () => yup.number(),
  'date': () => yup.date(),
  'boolean': () => yup.boolean(),
  'object': () => yup.object(),
  'array': () => yup.array()
}

export class SchemaTransformer {
  private validationTransformers: Record<string,(validation:InputValidation,current_schema:AnySchema)=>AnySchema>
  private typeMapper: Record<string,()=>AnySchema>
  private constructor(){
    this.validationTransformers = defaultTransformer
    this.typeMapper = defaultTypeMapper
  }
  public static getInstance(){
    return new SchemaTransformer()
  }

  public addTransformer(type:string,transformer:(validation:InputValidation,current_schema:AnySchema)=>AnySchema){
    this.validationTransformers[type] = transformer
  }
  public addTypeMapper(type:string,mapper:()=>AnySchema){
    this.typeMapper[type] = mapper
  }

  public transformInput(input: Input):AnySchema{
    let schema = this.typeMapper[input.type]()
    input.validation.forEach(validation => {
      const transformer = this.validationTransformers[validation.type]
      if(transformer){
        schema = transformer(validation,schema)
      }
    })
    return schema
  }
}