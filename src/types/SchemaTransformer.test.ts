import {getYupTransformer, SchemaTransformer} from './SchemaTransformer'
import * as yup from 'yup'
import { InputValidation } from './Validation'
import { Input } from './Input'

describe('default TypeMapper',()=>{
  it('should return have accessible keys',()=>{
    const typeMapper = getYupTransformer().getTypeMapper
    expect(typeMapper).toBeDefined()
    Object.keys(typeMapper).forEach(key=>{
      expect(typeMapper[key]).toBeDefined()
      expect(typeMapper[key]).toBeInstanceOf(Function)
      expect(typeMapper[key]()).toBeDefined()
    })
  })
})

describe('default ValidationTransformers',()=>{
  it('should pass through wrong validation',()=>{
    const defaultTransformer = getYupTransformer().getValidationTransformers
    const validationWrong : InputValidation = {
      type: 'CUSTOM_VALIDATION_WRONG',
      options: {},
    }
    Object.keys(defaultTransformer).forEach(key=>{
      expect(JSON.stringify(defaultTransformer[key](validationWrong,yup.string()))).toBe(JSON.stringify(yup.string()))
    })
  })
  it('should apply string validtions', ()=>{
    const defaultTransformer = getYupTransformer().getValidationTransformers
    const schema = yup.string()
    const passedRequired = defaultTransformer['VALIDATION_REQUIRED']({
      type: 'VALIDATION_REQUIRED',
      msg: 'this is required'
    },schema)
    expect(JSON.stringify(passedRequired)).toBe(JSON.stringify(yup.string().required('this is required')))
    const passedEmail = defaultTransformer['VALIDATION_EMAIL']({
      type: 'VALIDATION_EMAIL',
      msg: 'this is email'
    },schema)
    expect(JSON.stringify(passedEmail)).toBe(JSON.stringify(yup.string().email('this is email')))
    const passedRegexp = defaultTransformer['VALIDATION_REGEXP']({
      type: 'VALIDATION_REGEXP',
      value: '^[a-z]+$',
      msg: 'this is regexp'
    },schema)
    expect(JSON.stringify(passedRegexp)).toBe(JSON.stringify(yup.string().matches(new RegExp('^[a-z]+$'),'this is regexp')))
    const passedNullable = defaultTransformer['VALIDATION_NULLABLE']({
      type: 'VALIDATION_NULLABLE',
      msg: 'this is nullable'
    },schema)
    expect(JSON.stringify(passedNullable)).toBe(JSON.stringify(yup.string().nullable()))
  })

  it('should apply date validations',()=>{
    const defaultTransformer = getYupTransformer().getValidationTransformers
    const schema = yup.date()
    const passedBefore = defaultTransformer['VALIDATION_DATE_BEFORE']({
      type: 'VALIDATION_DATE_BEFORE',
      value: '2021-01-01',
      msg: 'this is before'
    },schema)
    expect(JSON.stringify(passedBefore)).toBe(JSON.stringify(yup.date().max(new Date('2021-01-01'),'this is before')))
    const passedAfter = defaultTransformer['VALIDATION_DATE_AFTER']({
      type: 'VALIDATION_DATE_AFTER',
      value: '2021-01-01',
      msg: 'this is after'
    },schema)
    expect(JSON.stringify(passedAfter)).toBe(JSON.stringify(yup.date().min(new Date('2021-01-01'),'this is after')))
  })
})

describe('SchemaTransformer', () => {
  it('should be able to instantiate',()=>{
    const transformer = getYupTransformer()
    expect(transformer).toBeDefined()
    expect(transformer).toBeInstanceOf(SchemaTransformer)
  })

  it('should be able to add a new transformer',()=>{
    const transformer = getYupTransformer()
    transformer.addTransformer('test',(type:any,sch:any)=>yup.string())
    expect(transformer.getValidationTransformers['test']).toBeDefined()
    expect(transformer.getValidationTransformers['test']).toBeInstanceOf(Function)
    const stringSchema = transformer.getValidationTransformers['test']({type:'VALIDATION_REQUIRED',msg:'test'},yup.number())
    expect(JSON.stringify(stringSchema)).toBe(JSON.stringify(yup.string()))
  })

  it('should be able to add a mapper',()=>{
    const transformer = getYupTransformer()
    expect(transformer.getTypeMapper['test']).toBeUndefined()
    transformer.addTypeMapper('test',()=>yup.string())
    expect(transformer.getTypeMapper['test']).toBeDefined()
    expect(transformer.getTypeMapper['test']).toBeInstanceOf(Function)
    expect(JSON.stringify(transformer.getTypeMapper['test']())).toBe(JSON.stringify(yup.string()))
  })

  it('should be able to transforma an input',()=>{
    const transformer = getYupTransformer()
    const validations : InputValidation[] = [
      {
        type: 'VALIDATION_REQUIRED',
        msg: 'this is required'
      },
      {
        type: 'VALIDATION_MIN',
        value: 2000,
        msg: 'year should be at least 2000'
      },
      {
        type: 'VALIDATION_MAX',
        value: 3000,
        msg: 'year should be at least 3000'
      }
    ]
    const input = new Input('INPUT_NUMBER','year','number',validations,undefined)
    const sch = transformer.transformInput(input)
    const fixtureschema = yup.number().required('this is required').min(2000,'year should be at least 2000').max(3000,'year should be at least 3000')
    expect(JSON.stringify(sch)).toBe(JSON.stringify(fixtureschema))
  })
})