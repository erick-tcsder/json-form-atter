import { FromJSONParser } from './FromJSONParser';
export declare class Fragment {
    name?: string;
    _id?: string;
    FRAGMENT_TYPE: string;
    constructor(name?: string, _id?: string);
    toObject(): Record<string, any>;
    static fromJSON(obj: Record<string, any>, fromJSONParser?: FromJSONParser): Fragment;
}
