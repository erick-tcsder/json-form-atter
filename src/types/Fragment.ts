import {v4 as uuidV4} from 'uuid'
import { FromJSONParser } from './FromJSONParser'

export class Fragment {
  public FRAGMENT_TYPE = "FRAGMENT"
  constructor(
    public name?: string,
    public _id?: string
  ){
    if(!_id) this._id = uuidV4()
  }
  toObject():Record<string,any> {
    throw new Error('to Object not implemented')
  }
  static fromJSON(obj:Record<string,any>,fromJSONParser?:FromJSONParser):Fragment {
    return new Fragment(obj['name'],obj['_id'])
  }
}