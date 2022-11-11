import { AnySchema, DateSchema, NumberSchema, StringSchema } from 'yup';
import { InputValidation } from './Validation';
import * as yup from 'yup';
import { Input } from './Input';

export const defaultTransformer: Record<string, (validation: InputValidation, currentSchema: AnySchema) => AnySchema> =
  {
    VALIDATION_REQUIRED: (validation, currentSchema) => {
      if (validation.type === 'VALIDATION_REQUIRED') {
        return currentSchema.required(validation.msg);
      } else {
        return currentSchema;
      }
    },
    VALIDATION_MIN: (validation, currentSchema) => {
      if (validation.type === 'VALIDATION_MIN') {
        return (currentSchema as NumberSchema).min(validation.value as number, validation.msg);
      } else {
        return currentSchema;
      }
    },
    VALIDATION_MAX: (validation, currentSchema) => {
      if (validation.type === 'VALIDATION_MAX') {
        return (currentSchema as NumberSchema).max(validation.value as number, validation.msg);
      } else {
        return currentSchema;
      }
    },
    VALIDATION_DATE_AFTER: (validation, currentSchema) => {
      if (validation.type === 'VALIDATION_DATE_AFTER') {
        return (currentSchema as DateSchema).min(validation.value as string, validation.msg);
      } else {
        return currentSchema;
      }
    },
    VALIDATION_DATE_BEFORE: (validation, currentSchema) => {
      if (validation.type === 'VALIDATION_DATE_BEFORE') {
        return (currentSchema as DateSchema).max(validation.value as string, validation.msg);
      } else {
        return currentSchema;
      }
    },
    VALIDATION_EMAIL: (validation, currentSchema) => {
      if (validation.type === 'VALIDATION_EMAIL') {
        return (currentSchema as StringSchema).email(validation.msg);
      } else {
        return currentSchema;
      }
    },
    VALIDATION_REGEXP: (validation, currentSchema) => {
      if (validation.type === 'VALIDATION_REGEXP') {
        const regexp = new RegExp(validation.value as string);
        return (currentSchema as StringSchema).matches(regexp, validation.msg);
      } else {
        return currentSchema;
      }
    },
    VALIDATION_NULLABLE: (validation, currentSchema) => {
      if (validation.type === 'VALIDATION_NULLABLE') {
        return currentSchema.nullable();
      } else {
        return currentSchema;
      }
    },
    VALIDATION_REF: (validation, currentSchema) => {
      if (validation.type === 'VALIDATION_REF') {
        return currentSchema.when(validation.ref, {
          is: validation.value,
          then(schema) {
            return validation.then.reduce((acc, val) => {
              return defaultTransformer[val.type](val as InputValidation, acc);
            }, schema);
          },
          otherwise(schema) {
            return validation.else.reduce((acc, val) => {
              return defaultTransformer[val.type](val as InputValidation, acc);
            }, schema);
          },
        });
      } else {
        return currentSchema;
      }
    },
  };

export const defaultTypeMapper: Record<string, () => AnySchema> = {
  string: () => yup.string(),
  number: () => yup.number(),
  date: () => yup.date(),
  boolean: () => yup.boolean(),
  object: () => yup.object(),
  array: () => yup.array(),
};

export class SchemaTransformer<T = AnySchema> {
  private validationTransformers: Record<string, (validation: InputValidation, currentSchema: T) => T>;
  private typeMapper: Record<string, () => T>;
  public constructor(
    validationTransformers: Record<string, (validation: InputValidation, currentSchema: T) => T>,
    typeMapper: Record<string, () => T>,
  ) {
    this.validationTransformers = validationTransformers;
    this.typeMapper = typeMapper;
  }

  public get getValidationTransformers() {
    return this.validationTransformers;
  }
  public get getTypeMapper() {
    return this.typeMapper;
  }

  public addTransformer(type: string, transformer: (validation: InputValidation, currentSchema: T) => T) {
    this.validationTransformers[type] = transformer;
  }
  public addTypeMapper(type: string, mapper: () => T) {
    this.typeMapper[type] = mapper;
  }

  public transformInput(input: Input): T {
    let schema = this.typeMapper[input.dataType]();
    input.validation.forEach((validation) => {
      const transformer = this.validationTransformers[validation.type];
      if (transformer) {
        schema = transformer(validation, schema);
      }
    });
    return schema;
  }
}

export const getYupTransformer = () => new SchemaTransformer<AnySchema>(defaultTransformer, defaultTypeMapper);
