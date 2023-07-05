import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import audiosReducer from '@/src/redux/audios/audios';

export const store = configureStore({
  reducer: {
    audiosAll: audiosReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
