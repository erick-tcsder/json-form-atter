import { Block } from './Block';
import { BlockValidation, InputValidation, Validation } from './Validation';
import blockFixture from '../data/Block.json';
import { Input } from './Input';

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('1'),
}));

describe('Block class', () => {
  it('should be able to instantiate', () => {
    const block = new Block('BLOCK_TEST');
    expect(block).toBeDefined();
    expect(block).toBeInstanceOf(Block);
  });

  it('should have accessible props', () => {
    const testingValidation: BlockValidation[] = [
      {
        type: 'VALIDATION_REF',
        ref: 'BLOCK_TEST_CHILD_1',
        value: true,
        then: [],
        else: [],
      },
    ];
    const childBlock1 = new Block('BLOCK_TEST_CHILD_1');
    const childBlock2 = new Input('INTPUT_TEST', 'INPUT_TEST_CHILD_2','string');
    const block = new Block('BLOCK_TEST', 'Test Block', [childBlock1, childBlock2], testingValidation);
    expect(block.type).toBe('BLOCK_TEST');
    expect(block.name).toBe('Test Block');
    expect(block.fields).toStrictEqual([childBlock1, childBlock2]);
    expect(block.validation).toStrictEqual(testingValidation);
    expect(block.FRAGMENT_TYPE).toBe('BLOCK');
  });

  it('should be able to convert to object', () => {
    const testingValidation: BlockValidation[] = [
      {
        type: 'VALIDATION_REF',
        ref: 'BLOCK_TEST_CHILD_1',
        value: true,
        then: [],
        else: [],
      },
    ];
    const childBlock1 = new Block('BLOCK_TEST_CHILD_1');
    const childBlock2 = new Input('INTPUT_TEST', 'INPUT_TEST_CHILD_2','string');
    const block = new Block('BLOCK_TEST', 'Test Block', [childBlock1, childBlock2], testingValidation);

    expect(block.toObject()).toStrictEqual(blockFixture);
  });

  it('should be able to convert from JSON', () => {
    const block = Block.fromJSON(blockFixture);
    expect(block).toBeInstanceOf(Block);
    expect(block.type).toBe('BLOCK_TEST');
    expect(block.name).toBe('Test Block');
    expect(block.fields).toBeDefined();
    expect(block.fields).toHaveLength(2);
    expect(block.fields?.[0]).toBeInstanceOf(Block);
    expect(block.fields?.[1]).toBeInstanceOf(Input);
  });
});
