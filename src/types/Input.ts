import { Fragment } from './Fragment';
import { defaultFromJSONParser, FromJSONParser } from './FromJSONParser';
import { InputValidation } from './Validation';

export class Input extends Fragment {
  public override FRAGMENT_TYPE = 'INPUT';
  constructor(
    public type: string,
    /**
     * Name will be used as the key in the input object
     */
    name: string,
    public validation?: InputValidation[],
    public options?: Record<string, any>,
    id?: string,
    public excludeFromValidation: boolean = false,
  ) {
    super(name, id);
  }

  override toObject(): Record<string, any> {
    return {
      _id: this._id,
      name: this.name,
      type: this.type,
      validation: this.validation ?? null,
      options: this.options ?? null,
      excludeFromValidation: this.excludeFromValidation,
      FRAGMENT_TYPE: this.FRAGMENT_TYPE,
    };
  }

  static override fromJSON(obj: Record<string, any>, fromJSONParser = defaultFromJSONParser): Input {
    return fromJSONParser['INPUT'](obj) as Input;
  }
}
