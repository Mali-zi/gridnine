import { combineReducers, configureStore } from '@reduxjs/toolkit';
import flightReducer from '../store/flightSlice';

const rootReducer = combineReducers({
  flights: flightReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
