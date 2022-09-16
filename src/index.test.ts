import {hello} from './index'

test('hello', () => {
  expect(hello('world')).toBe('Hello world')
})