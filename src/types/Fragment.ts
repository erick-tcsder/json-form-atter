import { JsonObject } from 'type-fest';
import { v4 as uuidV4 } from 'uuid';
import { FromJSONParser } from './FromJSONParser';

export class Fragment {
  public FRAGMENT_TYPE = 'FRAGMENT';
  constructor(public name?: string, public _id?: string) {
    if (!_id) this._id = uuidV4();
  }
  toObject(): JsonObject {
    throw new Error('to Object not implemented');
  }
  static fromJSON(obj: JsonObject, fromJSONParser?: FromJSONParser): Fragment {
    return new Fragment(obj['name'] as string, obj['_id'] as string);
  }
}
