interface BaseMessageValidation {
    /**
     * @default ""
     */
    msg: string;
}
interface SingleValueValidation<T> extends BaseMessageValidation {
    value: T;
}
interface RefValidation {
    ref: string;
    value: any;
    then?: Validation[];
    else?: Validation[];
}
export declare type BlockValidation = {
    type: 'VALIDATION_REF';
} & RefValidation;
export declare type InputValidation = ({
    type: 'VALIDATION_REQUIRED';
} & BaseMessageValidation) | ({
    type: 'VALIDATION_MIN';
} & SingleValueValidation<number>) | ({
    type: 'VALIDATION_MAX';
} & SingleValueValidation<number>) | ({
    type: 'VALIDATION_REF';
} & RefValidation) | ({
    type: 'VALIDATION_DATE_AFTER';
} & SingleValueValidation<string>) | ({
    type: 'VALIDATION_DATE_BEFORE';
} & SingleValueValidation<string>) | ({
    type: 'VALIDATION_STRING';
} & BaseMessageValidation) | ({
    type: 'VALIDATION_EMAIL';
} & BaseMessageValidation) | ({
    type: 'VALIDATION_NUMBER';
} & BaseMessageValidation) | ({
    type: 'VALIDATION_REGEXP';
} & SingleValueValidation<string>) | ({
    type: 'VALIDATION_NULLABLE';
} & BaseMessageValidation);
export declare type Validation = InputValidation | BlockValidation;
export {};
