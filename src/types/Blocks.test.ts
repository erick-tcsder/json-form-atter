import {Block} from './Blocks'
import { Validation } from './Validation'
import blockFixture from '../data/Block.json'

jest.mock('uuid',()=>({
  v4: jest.fn().mockReturnValue('1')
}))


describe("Block class", ()=>{
  it("it should be able to instantiate", ()=>{
    const block = new Block('BLOCK_TEST')
    expect(block).toBeDefined()
    expect(block).toBeInstanceOf(Block)
  })

  it("it should have accessible props",()=>{
    const testingValidation : Validation[] = [
      {
        type: 'VALIDATION_REQUIRED',
        msg: 'This field is required'
      },
      {
        type: 'VALIDATION_STRING',
        msg: 'This field must be a string'
      }
    ]
    const childBlock1 = new Block('BLOCK_TEST_CHILD_1')
    const childBlock2 = new Block('BLOCK_TEST_CHILD_2')
    const block = new Block('BLOCK_TEST', 'Test Block', [childBlock1,childBlock2], testingValidation)
    expect(block.type).toBe("BLOCK_TEST")
    expect(block.name).toBe('Test Block')
    expect(block.fields).toStrictEqual([childBlock1,childBlock2])
    expect(block.validation).toStrictEqual(testingValidation)
  })

  it("it should be able to convert to object", ()=>{
    const testingValidation : Validation[] = [
      {
        type: 'VALIDATION_REQUIRED',
        msg: 'This field is required'
      },
      {
        type: 'VALIDATION_STRING',
        msg: 'This field must be a string'
      }
    ]
    const childBlock1 = new Block('BLOCK_TEST_CHILD_1')
    const childBlock2 = new Block('BLOCK_TEST_CHILD_2')
    const block = new Block('BLOCK_TEST', 'Test Block', [childBlock1,childBlock2], testingValidation)

    expect(block.toObject()).toStrictEqual(blockFixture)
  })

  it("it should be able to convert from JSON",()=>{
    const block = Block.fromJSON(blockFixture)
    expect(block).toBeInstanceOf(Block)
    expect(block.type).toBe('BLOCK_TEST')
    expect(block.name).toBe('Test Block')
    expect(block.fields).toBeDefined()
    expect(block.fields).toHaveLength(2)
    expect(block.fields?.[0]).toBeInstanceOf(Block)
    expect(block.fields?.[1]).toBeInstanceOf(Block)
  })
})