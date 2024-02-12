import {
  AnyAction,
  CombinedState,
  combineReducers,
  Reducer,
} from '@reduxjs/toolkit';
import callLoaderReducer from './callLoaderSlice';

const appReducer = combineReducers({
  callLoader: callLoaderReducer,
});

export type AppState = CombinedState<{
  callLoader: ReturnType<typeof callLoaderReducer>;
}>;

const rootReducer: Reducer = (state: AppState, action: AnyAction) => {
  return appReducer(state, action);
};

export default rootReducer;
