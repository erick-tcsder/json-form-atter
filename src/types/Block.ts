import { Fragment } from "./Fragment";
import { defaultFromJSONParser } from "./FromJSONParser";
import {BlockValidation} from "./Validation";

export class Block extends Fragment {
  public override FRAGMENT_TYPE = "BLOCK"
  constructor(
    public type: string,
    name?: string,
    public fields?: Fragment[],
    public validation?: BlockValidation[],
    id?: string
  ) {
    super(name,id);
  }

  override toObject(): Record<string, any> {
    return {
      _id: this._id,
      type: this.type,
      name: this.name ?? null,
      fields: this.fields?.map((field) => field.toObject()) ?? null,
      validation: this.validation ?? null,
      FRAGMENT_TYPE:this.FRAGMENT_TYPE
    }
  }

  static override fromJSON(json: Record<string, any>,fromJSONParser=defaultFromJSONParser): Block {
    return fromJSONParser['BLOCK'](json) as Block
  }
}