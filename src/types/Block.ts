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
    const res = {
      _id: this._id,
      type: this.type,
      FRAGMENT_TYPE: this.FRAGMENT_TYPE,
    };
    if (this.name) res['name'] = this.name;
    if (this.fields && this.fields.length) res['fields'] = this.fields.map((field) => field.toObject());
    if (this.options) res['options'] = this.options;
    if (this.validation) res['validation'] = this.validation;

    return res;
  }

  static override fromJSON(json: JsonObject, fromJSONParser = defaultFromJSONParser): Block {
    return fromJSONParser['BLOCK'](json) as Block;
  }
}
