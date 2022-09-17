import { Fragment } from './Fragment';
export declare type FromJSONParser = Record<string, (obj: Record<string, any>, fromJSONParser?: FromJSONParser) => Fragment>;
export declare const defaultFromJSONParser: FromJSONParser;
