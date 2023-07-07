import { configureStore } from '@reduxjs/toolkit';
import RootReducer from '../reducers/RootReducer';
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig={
    key:'root',
    storage:storage,
    blacklist:['vendorauth','adminauth','userauth']
    
}

const persistedReducer=persistReducer(persistConfig,RootReducer);

const Store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  });

const persistor=persistStore(Store);

export {Store,persistor};






