import {DESAFIOS, IAction} from '../action/types';

export interface IDesafiosReducer {
  value: string[];
}

const initialState = {
  value: ['Mirar Izquierda'],
};

export function DesafiosReducer(
  state = initialState,
  action: IAction,
): IDesafiosReducer {
  switch (action.type) {
    case DESAFIOS:
      return {
        ...state,
        value: action.payload,
      };
    default:
      return state;
  }
}
