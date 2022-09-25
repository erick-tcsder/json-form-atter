import {AnySchema, DateSchema, NumberSchema, StringSchema} from 'yup'
import { InputValidation } from "./Validation";
import * as yup from 'yup'
import { Input } from './Input';

export const defaultTransformer : Record<string,(validation:InputValidation,current_schema:AnySchema)=>AnySchema> = {
  'VALIDATION_REQUIRED': (validation,current_schema) => 
    {
      if(validation.type === 'VALIDATION_REQUIRED'){
        return current_schema.required(validation.msg)
      } else { return current_schema;}
    },
  'VALIDATION_MIN': (validation,current_schema) =>
    {
      if(validation.type === 'VALIDATION_MIN'){
        return (current_schema as NumberSchema).min(validation.value as number,validation.msg)
      } else { return current_schema;}
    },
  'VALIDATION_MAX': (validation,current_schema) =>
    {
      if(validation.type === 'VALIDATION_MAX'){
        return (current_schema as NumberSchema).max(validation.value as number,validation.msg)
      } else { return current_schema;}
    },
  'VALIDATION_DATE_AFTER': (validation,current_schema) =>
    {
      if(validation.type === 'VALIDATION_DATE_AFTER'){
        return (current_schema as DateSchema).min(validation.value as string,validation.msg)
      } else { return current_schema;}
    },
  'VALIDATION_DATE_BEFORE': (validation,current_schema) =>
    {
      if(validation.type === 'VALIDATION_DATE_BEFORE'){
        return (current_schema as DateSchema).max(validation.value as string,validation.msg)
      } else { return current_schema;}
    },
  'VALIDATION_EMAIL': (validation,current_schema) => 
    {
      if(validation.type === 'VALIDATION_EMAIL'){
        return (current_schema as StringSchema).email(validation.msg)
      } else { return current_schema;}
    },
  'VALIDATION_REGEXP': (validation,current_schema) =>
    {
      if(validation.type === 'VALIDATION_REGEXP'){
        const regexp = new RegExp(validation.value as string)
        return (current_schema as StringSchema).matches(regexp,validation.msg)
      } else { return current_schema;}
    },
  'VALIDATION_NULLABLE': (validation,current_schema) =>
    {
      if(validation.type === 'VALIDATION_NULLABLE'){
        return current_schema.nullable()
      } else { return current_schema;}
    }
}

export const defaultTypeMapper : Record<string,()=>AnySchema> = {
  'string': () => yup.string(),
  'number': () => yup.number(),
  'date': () => yup.date(),
  'boolean': () => yup.boolean(),
  'object': () => yup.object(),
  'array': () => yup.array()
}

export class SchemaTransformer <T = AnySchema> {
  private validationTransformers: Record<string,(validation:InputValidation,current_schema:T)=>T>
  private typeMapper: Record<string,()=>T>
  public constructor(
    validationTransformers: Record<string,(validation:InputValidation,current_schema:T)=>T>,
    typeMapper: Record<string,()=>T>
  ){
    this.validationTransformers = validationTransformers
    this.typeMapper = typeMapper
  }

  public get getValidationTransformers(){
    return this.validationTransformers
  }
  public get getTypeMapper(){
    return this.typeMapper
  }

  public addTransformer(type:string,transformer:(validation:InputValidation,current_schema:T)=>T){
    this.validationTransformers[type] = transformer
  }
  public addTypeMapper(type:string,mapper:()=>T){
    this.typeMapper[type] = mapper
  }

  public transformInput(input: Input):T{
    let schema = this.typeMapper[input.dataType]()
    input.validation.forEach(validation => {
      const transformer = this.validationTransformers[validation.type]
      if(transformer){
        schema = transformer(validation,schema)
      }
    })
    return schema
  }
}

export const getYupTransformer = () => new SchemaTransformer<AnySchema>(defaultTransformer,defaultTypeMapper)