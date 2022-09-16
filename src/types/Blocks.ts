import { Fragment } from "./Fragment";
import {Validation} from "./Validation";

export class Block extends Fragment {
  constructor(
    public type: string,
    name?: string,
    public fields?: Fragment[],
    public validation?: Validation[],
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
      validation: this.validation ?? null
    }
  }

  static override fromJSON(json: Record<string, any>): Block {
    return new Block(
      json['type'],
      json['name'],
      // TODO: This is a hack, need to find a better way to do this
      json['fields']?.map((field: Record<string, any>) => Block.fromJSON(field)),
      json['validation'],
      json['_id']
    );
  }
}