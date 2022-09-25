import {deepFindInputs} from './deepFindInput'
import deepFindData from '../data/DeepFindInputData.json'
import { Block } from '../types/Block'

describe('deepFindInputs', () => {
  it("should return all inputs from a fragment", () => {
    const block = Block.fromJSON(deepFindData)
    const input1 = deepFindData.fields[1],
      input2 = deepFindData.fields[0]?.fields?.[0],
      input3 = deepFindData.fields[0]?.fields?.[1]
    const inputs = deepFindInputs(block)
    expect(inputs).toHaveLength(3)
    const objInputs = inputs.map((input) => input.toObject())
    expect(objInputs).toContainEqual(input1)
    expect(objInputs).toContainEqual(input2)
    expect(objInputs).toContainEqual(input3)
  })
})