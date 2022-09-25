import { Block } from '../types/Block';
import { Fragment } from '../types/Fragment';
import { Input } from '../types/Input';

export const deepFindInputs = (fragment: Fragment): Input[] => {
  let inputs = [];
  if (fragment.FRAGMENT_TYPE === 'INPUT' && !(fragment as Input).excludeFromValidation) {
    inputs.push(fragment);
  } else if (fragment.FRAGMENT_TYPE === 'BLOCK') {
    (fragment as Block).fields.forEach((child) => {
      inputs = inputs.concat(deepFindInputs(child));
    });
  }
  return inputs;
};
