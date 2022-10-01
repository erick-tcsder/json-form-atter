import { JsonObject } from 'type-fest';
import { Fragment } from './Fragment';
import { defaultFromJSONParser } from './FromJSONParser';
import { BlockValidation } from './Validation';

export type BlockObject = {
  _id: string;
  type: string;
  name: string;
  fields?: JsonObject[];
  validation?: BlockValidation[];
  FRAGMENT_TYPE: 'BLOCK';
  options?: JsonObject;
};

export class Block extends Fragment {
  public override FRAGMENT_TYPE = 'BLOCK';
  constructor(
    public type: string,
    name?: string,
    public fields?: Fragment[],
    public validation?: BlockValidation[],
    public options?: JsonObject,
    id?: string,
  ) {
    super(name, id);
  }

  override toObject(): JsonObject {
    return {
      _id: this._id,
      type: this.type,
      name: this.name ?? null,
      fields: this.fields?.map((field) => field.toObject()) ?? null,
      validation: this.validation ?? null,
      options: this.options ?? null,
      FRAGMENT_TYPE: this.FRAGMENT_TYPE,
    };
  }

  static override fromJSON(json: JsonObject, fromJSONParser = defaultFromJSONParser): Block {
    return fromJSONParser['BLOCK'](json) as Block;
  }
}
