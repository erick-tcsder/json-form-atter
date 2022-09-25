import { JsonObject, JsonValue } from 'type-fest';

type BaseMessageValidation = {
  msg: string;
};

type SingleValueValidation = BaseMessageValidation & {
  value: JsonValue;
};

type RefValidation = {
  ref: string;
  value: any;
  then: Validation[];
  else: Validation[];
};

type defaultValidations =
  | 'VALIDATION_REQUIRED'
  | 'VALIDATION_NULLABLE'
  | 'VALIDATION_EMAIL'
  | 'VALIDATION_DATE_BEFORE'
  | 'VALIDATION_DATE_AFTER'
  | 'VALIDATION_MIN'
  | 'VALIDATION_MAX'
  | 'VALIDATION_REGEXP'
  | 'VALIDATION_REF'
  | 'VALIDATION_HIDDEN';

export type BlockValidation = ({ type: 'VALIDATION_REF' } & RefValidation) | ({ type: 'VALIDATION_HIDDEN' } & {});

export type InputValidation =
  | ({ type: 'VALIDATION_REQUIRED' } & BaseMessageValidation)
  | ({ type: 'VALIDATION_MIN' } & SingleValueValidation)
  | ({ type: 'VALIDATION_MAX' } & SingleValueValidation)
  | ({ type: 'VALIDATION_REF' } & RefValidation)
  | ({ type: 'VALIDATION_DATE_AFTER' } & SingleValueValidation)
  | ({ type: 'VALIDATION_DATE_BEFORE' } & SingleValueValidation)
  | ({ type: 'VALIDATION_EMAIL' } & BaseMessageValidation)
  | ({ type: 'VALIDATION_REGEXP' } & SingleValueValidation)
  | ({ type: 'VALIDATION_NULLABLE' } & BaseMessageValidation)
  | {
      type: `CUSTOM_VALIDATION_${string extends defaultValidations ? never : string}`;
      options: JsonObject;
    };

export type Validation = InputValidation | BlockValidation;
