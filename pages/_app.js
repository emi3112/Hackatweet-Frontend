import '../styles/globals.css';
import Head from 'next/head';



// redux imports
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import likes from '../reducers/liketweets'; //?????



import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import storage from 'redux-persist/lib/storage';

const reducers = combineReducers({likes,}); // listerles reducers ----
const persistConfig = { key: 'tweetsstore', storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});// ---persistor



const persistor = persistStore(store); // ---persistor
import { Provider } from 'react-redux';
import user from '../reducers/user';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const reducers = combineReducers({user});
const persistConfig = { key: 'applicationName', storage };


const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
 });

 const persistor = persistStore(store);



 function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
       <PersistGate persistor={persistor}>
     <Provider store={store}>
      <PersistGate persistor={persistor}>
      <Head>
        <title>Hackatweet</title>
      </Head>
      <Component {...pageProps} />
      </PersistGate>
      </Provider>
    </>
  );
}

export default App;
