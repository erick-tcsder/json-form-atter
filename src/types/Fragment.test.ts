import { Fragment } from './Fragment';

describe('Testing Fragment Class', () => {
  it('it should work as expected', () => {
    const fragment = new Fragment('test');
    expect(fragment.name).toBe('test');
    expect(fragment._id).toBeDefined();
  });

  it('it can recieve no name', () => {
    const fragment = new Fragment();
    expect(fragment.name).toBeUndefined();
    expect(fragment._id).toBeDefined();
  });

  it('it can be initialized with custom id', () => {
    const fragment = new Fragment('test', '1234');
    expect(fragment.name).toBe('test');
    expect(fragment._id).toBe('1234');
  });

  it('it should throw an error in abstract methods', () => {
    const fragment = new Fragment('test');
    expect(fragment.toObject).toThrow('to Object not implemented');
  });

  it('it should be able to create a fragment from json', () => {
    const fragment = Fragment.fromJSON({ name: 'test', _id: '123' });
    expect(fragment).toBeInstanceOf(Fragment);
    expect(fragment.name).toBe('test');
    expect(fragment._id).toBe('123');
  });
});
