import { Block } from './Block';
import { FormSchema } from './FormSchema';
import { FormYupSchema } from './FormYupSchema';
import yupFormFixture from '../data/FromYup.json';
import * as yup from 'yup';

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('1'),
}));

describe('FormSchema', () => {
  it('should be able to instantiate', () => {
    const formSchema = new FormSchema('test');
    const formSchemaWithID = new FormSchema('test', undefined, undefined, '123');
    expect(formSchemaWithID._id).toBe('123');
    expect(formSchema).toBeInstanceOf(FormSchema);
    expect(formSchema).toBeDefined();
    expect(formSchema._id).toBe('1');
    expect(formSchema.name).toBe('test');
    expect(formSchema.toObject()).toStrictEqual({ _id: '1', fields: [], name: 'test', options: undefined });
  });
  it('should be able to map through fields', () => {
    const childBlock = new Block('BLOCK_TEST_CHILD_1');
    const formSchema = new FormSchema('test', [childBlock, childBlock]);
    expect(formSchema.toObject()).toStrictEqual({
      _id: '1',
      fields: [
        {
          FRAGMENT_TYPE: 'BLOCK',
          _id: '1',
          fields: null,
          name: null,
          type: 'BLOCK_TEST_CHILD_1',
          validation: null,
          options: null
        },
        {
          FRAGMENT_TYPE: 'BLOCK',
          _id: '1',
          fields: null,
          name: null,
          type: 'BLOCK_TEST_CHILD_1',
          validation: null,
          options: null
        },
      ],
      name: 'test',
      options: undefined,
    });
  });
  it('should have abstract methods', () => {
    const formSchema = new FormSchema('test');
    expect(() => {
      formSchema.toSchema({} as any);
    }).toThrowError('Not implemented yet');
    expect(() => FormSchema.fromJSON({} as any)).toThrowError('Not implemented yet');
  });
});

describe('FormYupSchema', () => {
  it('should be able to cast from JSON', () => {
    const schema = FormYupSchema.fromJSON(yupFormFixture);
    expect(schema).toBeInstanceOf(FormYupSchema);
    expect(schema._id).toBe('5a9b1b9e3d1e86653a79b1b9');
    expect(schema.name).toBe('Sample Form');
    expect(schema.fields).toHaveLength(2);
  });

  it('should be able to cast to schema', () => {
    const schema = FormYupSchema.fromJSON(yupFormFixture);
    const yupSchema = schema.toSchema();
    const fixtureSchema = yup.object({
      email: yup.string().email('Should be an email'),
      age: yup.number().min(0, 'Should have at least 0 years').max(100, 'Are you a human?'),
    });
    expect(JSON.stringify(yupSchema)).toBe(JSON.stringify(fixtureSchema));
  });
});
