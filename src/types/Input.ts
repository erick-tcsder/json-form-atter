import { JsonArray, JsonObject } from 'type-fest';
import { Fragment } from './Fragment';
import { defaultFromJSONParser, FromJSONParser } from './FromJSONParser';
import { InputValidation } from './Validation';

export type InputObject = {
  _id: string;
  type: string;
  name: string;
  dataType: 'string' | 'number' | 'boolean' | 'date' | 'array';
  validation?: InputValidation[];
  options?: JsonObject;
  excludeFromValidation?: boolean;
  FRAGMENT_TYPE: 'INPUT';
};

export class Input extends Fragment {
  public override FRAGMENT_TYPE = 'INPUT';
  constructor(
    public type: string,
    /**
     * Name will be used as the key in the input object
     */
    name: string,
    public dataType: 'string' | 'number' | 'boolean' | 'date' | 'array',
    public validation?: InputValidation[],
    public options?: Record<string, any>,
    id?: string,
    public excludeFromValidation: boolean = false,
  ) {
    super(name, id);
  }

  override toObject(): JsonObject {
    return {
      _id: this._id,
      name: this.name,
      type: this.type,
      dataType: this.dataType,
      validation: this.validation ?? null,
      options: this.options ?? null,
      excludeFromValidation: this.excludeFromValidation,
      FRAGMENT_TYPE: this.FRAGMENT_TYPE,
    };
  }

  static override fromJSON(obj: JsonObject, fromJSONParser = defaultFromJSONParser): Input {
    return fromJSONParser['INPUT'](obj) as Input;
  }
}
