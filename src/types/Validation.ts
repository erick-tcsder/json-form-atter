

interface BaseMessageValidation {
  msg: string;
}

interface SingleValueValidation<T> extends BaseMessageValidation {
  value: T;
}

interface RefValidation extends BaseMessageValidation {
  ref: string;
  value: string;
  then?: Validation[];
  else?: Validation[];
}

export type Validation = 
| ({type: "VALIDATION_REQUIRED"} & BaseMessageValidation)
| ({type: "VALIDATION_MIN"} & SingleValueValidation<number>)
| ({type: "VALIDATION_MAX"} & SingleValueValidation<number>)
| ({type: "VALIDATION_REF"} & RefValidation)
| ({type: "VALIDATION_DATE_AFTER"} & SingleValueValidation<string>)
| ({type: "VALIDATION_DATE_BEFORE"} & SingleValueValidation<string>)
| ({type: "VALIDATION_STRING"} & BaseMessageValidation)
| ({type: "VALIDATION_EMAIL"} & BaseMessageValidation)
| ({type: "VALIDATION_NUMBER"} & BaseMessageValidation)
| ({type: "VALIDATION_REGEXP"} & SingleValueValidation<string>)