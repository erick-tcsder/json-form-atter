import { JsonObject } from 'type-fest';
import { Block, BlockObject } from './Block';
import { Fragment } from './Fragment';
import { Input, InputObject } from './Input';

export type FromJSONParser = Record<string, (obj: JsonObject, fromJSONParser?: FromJSONParser) => Fragment>;

export const defaultFromJSONParser: FromJSONParser = {
  BLOCK: (json: BlockObject) =>
    new Block(
      json['type'],
      json['name'],
      json['fields']?.map((field: Record<string, any>) => {
        return defaultFromJSONParser[field['FRAGMENT_TYPE']](field, defaultFromJSONParser);
      }),
      json['validation'],
      json['options'],
      json['_id'],
    ),
  INPUT: (json: InputObject) => {
    if (!json['name']) throw new Error('Input name is required');
    if (!json['type']) throw new Error('Input type is required');

    return new Input(
      json['type'],
      json['name'],
      json['dataType'],
      json['validation'],
      json['options'],
      json['_id'],
      json['excludeFromValidation'],
    );
  },
};
