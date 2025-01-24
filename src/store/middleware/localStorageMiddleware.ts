import { isAction, Middleware } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { LOCAL_STORAGE_KEY } from '@/constants';

const localStorageMiddleware: Middleware<{}, RootState> =
  store => next => action => {
    const result = next(action);
    if (isAction(action) && action.type.startsWith('board')) {
      const state = store.getState();
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(state.boardReducer)
      );
    }
    return result;
  };

export default localStorageMiddleware;
