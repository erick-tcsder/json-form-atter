import {v4 as uuidV4} from 'uuid'

export class Fragment {
  constructor(
    public name?: string,
    public _id?: string
  ){
    if(!_id) this._id = uuidV4()
  }
  toObject():Record<string,any> {
    throw new Error('to Object not implemented')
  }
  static fromJSON(obj:Record<string,any>):Fragment {
    return new Fragment(obj['name'],obj['_id'])
  }
}