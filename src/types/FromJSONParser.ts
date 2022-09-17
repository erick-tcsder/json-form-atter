import { Block } from './Block';
import { Fragment } from './Fragment';
import { Input } from './Input';

export type FromJSONParser = Record<string, (obj: Record<string, any>, fromJSONParser?: FromJSONParser) => Fragment>;

export const defaultFromJSONParser: FromJSONParser = {
  BLOCK: (json) =>
    new Block(
      json['type'],
      json['name'],
      json['fields']?.map((field: Record<string, any>) => {
        return defaultFromJSONParser[field['FRAGMENT_TYPE']](field, defaultFromJSONParser);
      }),
      json['validation'],
      json['_id'],
    ),
  INPUT: (json) => {
    if (!json['name']) throw new Error('Input name is required');
    if (!json['type']) throw new Error('Input type is required');

    return new Input(
      json['type'],
      json['name'],
      json['validation'],
      json['options'],
      json['_id'],
      json['excludeFromValidation'],
    );
  },
};
