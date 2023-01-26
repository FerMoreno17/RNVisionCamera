import {combineReducers, Reducer} from 'redux';
import {IAction} from '../action/types';
import {IDesafiosReducer, DesafiosReducer} from './DesafiosReducer';

export interface IRootState {
  desafios: IDesafiosReducer;
}

const appReducer: Reducer<IRootState> = combineReducers({
  desafios: DesafiosReducer,
});

const rootReducer = (state: any, action: IAction) => {
  return appReducer(state, action);
};

export default rootReducer;
