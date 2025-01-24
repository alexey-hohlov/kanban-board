import { combineReducers, configureStore } from '@reduxjs/toolkit';

import boardReducer from './reducers/boardReducer';
import uiReducer from './reducers/uiReducer';
import { localStorageMiddleware } from './middleware';

const rootReducer = combineReducers({
  boardReducer,
  uiReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(localStorageMiddleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
