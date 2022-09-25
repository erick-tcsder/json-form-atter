import { Input } from './Input';
import { InputValidation } from './Validation';
import inputFixture from '../data/Input.json';

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('1'),
}));

const validation: InputValidation[] = [
  {
    type: 'VALIDATION_EMAIL',
    msg: 'Should be an email',
  },
];
const options = {
  defaultValue: 'testing default',
  placeholder: 'testing placeholder',
  label: 'testing label',
  helperText: 'test helper text',
};

describe('Testing Input class', () => {
  it('should be able to instantiate', () => {
    const input = new Input('INPUT_TEST', 'test', 'string');
    expect(input).toBeDefined();
    expect(input).toBeInstanceOf(Input);
  });

  it('should have accessible props', () => {
    const input = new Input('INPUT_TEST', 'test', 'string', validation, options, '123');
    expect(input.name).toBe('test');
    expect(input.type).toBe('INPUT_TEST');
    expect(input.validation).toStrictEqual(validation);
    expect(input.options).toStrictEqual(options);
    expect(input._id).toBe('123');
    expect(input.FRAGMENT_TYPE).toBe('INPUT');
  });

  it('should be able to convert to object', () => {
    const input = new Input('INPUT_TEST', 'test', 'string', validation, options);

    expect(input.toObject()).toStrictEqual(inputFixture);
  });

  it('should be able to convert from JSON', () => {
    const input = Input.fromJSON(inputFixture);
    expect(input).toBeDefined();
    expect(input).toBeInstanceOf(Input);

    expect(input.name).toBe('test');
    expect(input.type).toBe('INPUT_TEST');
    expect(input.validation).toStrictEqual(validation);
    expect(input.options).toStrictEqual(options);
  });

  it('should throw error on uncomplete JSON object', () => {
    expect(() => Input.fromJSON({})).toThrow('Input name is required');
    expect(() => Input.fromJSON({ name: 'test' })).toThrow('Input type is required');
  });
});
