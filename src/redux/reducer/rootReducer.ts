import {IDesafiosReducer, DesafiosReducer} from './DesafiosReducer';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PersistConfig} from 'redux-persist/es/types';
import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const principalConfig: PersistConfig<IDesafiosReducer> = {
  key: 'principal',
  storage: AsyncStorage,
};

export const rootReducer = configureStore({
  reducer: {
    desafios: persistReducer(principalConfig, DesafiosReducer),
  },
  middleware: [thunk]
});

export const persistor = persistStore(rootReducer);
