import {DESAFIOS, IAction} from './types';

const DesafiosAction = (value: string[]): IAction => ({
  type: DESAFIOS,
  payload: value,
});

export default DesafiosAction;
