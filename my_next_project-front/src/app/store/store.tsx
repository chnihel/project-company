/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import favorisReducer from "./fovorisSlice"
import {FLUSH, PAUSE, PERSIST, PersistConfig, persistStore, PURGE, REGISTER, REHYDRATE} from "redux-persist";
//import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import createWebStorage from "redux-persist/es/storage/createWebStorage";

//Définit un stockage fictif (sans effet) pour les environnements où localStorage n'est pas disponible (comme le côté serveur).

const createNoopStorage=()=>{
  return{
      getItem(_key:any){
          return Promise.resolve(null)
      },
      //Ne stocke pas réellement les données mais retourne une promesse résolue
      setItem(_key: any, value: any) {
          return Promise.resolve(value);
       },
       //Ne fait rien, mais retourne une promesse résolue.
       removeItem(_key: any) {
          return Promise.resolve();
       },
  }
}


/* const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
}); */
const storage=typeof window !=='undefined' ? createWebStorage('local'):createNoopStorage()

const persistConfig : PersistConfig<any>= {
  key: "cart",
  storage,
  whitelist: ["totalPrice", "items"],

}

const favorisPersistConfig:PersistConfig<any>={
  //key est la meme dans slice dans interface 
  key:'favoris',
  storage,
  whitelist:["favoris"]
}
const persistreducer = persistReducer(persistConfig, cartReducer);
const persistedFavorisReducer=persistReducer(favorisPersistConfig,favorisReducer)

const rootReducer=combineReducers({
  cart:persistreducer,
  favoris:persistedFavorisReducer
})

export const store = configureStore({ reducer: rootReducer ,
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck:{
            ignoredActions:[FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),});

export const persistor = persistStore(store);

export type RootState= ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
