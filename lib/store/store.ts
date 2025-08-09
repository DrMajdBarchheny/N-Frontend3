import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import designRequestsReducer from './slices/designRequestsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    designRequests: designRequestsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 