import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user";
import { googleUserReducer } from "./googleUser";

const store = configureStore({
  reducer: {
    user: userReducer,
    googleUser: googleUserReducer,
  },
});

export default store;

/* 
¿Qué es un Store?

Es la entidad que se encarga de administrar el estado, pasándole la información adecuada. También genera los cambios y sirve la data para su consumo.

Siempre que quieras interactuar con el estado vas a necesitar al Store de intermediario.
*/
