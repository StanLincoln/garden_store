import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import filterReducer from './slices/filterSlice'
import { apiSlice } from "./slices/apiSlice"; 
import cartReducer from "./slices/cartSlice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Используем apiSlice.reducerPath в качестве ключа для редьюсера apiSlice
const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  theme: themeReducer,
  filter: filterReducer,
  cart: cartReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware), // Добавляем middleware от apiSlice
});

export const persistor = persistStore(store);
