import { Fragment } from "./Fragment";
import { BlockValidation } from "./Validation";
export declare class Block extends Fragment {
    type: string;
    fields?: Fragment[];
    validation?: BlockValidation[];
    FRAGMENT_TYPE: string;
    constructor(type: string, name?: string, fields?: Fragment[], validation?: BlockValidation[], id?: string);
    toObject(): Record<string, any>;
    static fromJSON(json: Record<string, any>, fromJSONParser?: import("./FromJSONParser").FromJSONParser): Block;
}
