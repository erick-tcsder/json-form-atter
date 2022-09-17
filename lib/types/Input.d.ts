import { Fragment } from "./Fragment";
import { FromJSONParser } from "./FromJSONParser";
import { InputValidation } from "./Validation";
export declare class Input extends Fragment {
    type: string;
    validation?: InputValidation[];
    options?: Record<string, any>;
    excludeFromValidation: boolean;
    FRAGMENT_TYPE: string;
    constructor(type: string, 
    /**
     * Name will be used as the key in the input object
     */
    name: string, validation?: InputValidation[], options?: Record<string, any>, id?: string, excludeFromValidation?: boolean);
    toObject(): Record<string, any>;
    static fromJSON(obj: Record<string, any>, fromJSONParser?: FromJSONParser): Input;
}
