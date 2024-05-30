import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction("SET_USERS");

const initialState = {};

export const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(setUser, (state, action) => {
    return action.payload;
  });
});
/*
Los actions:
Estos objetos generalmente tienen dos campos principales:

type: Este campo indica el tipo de acción que se está realizando. Es una cadena que describe la acción de manera específica. Por ejemplo, "ADD_TODO", "REMOVE_TODO", "FETCH_DATA", etc. El tipo de acción generalmente se utiliza en los reducers para determinar cómo actualizar el estado de la aplicación.
payload: Este campo contiene datos adicionales asociados con la acción. Puede ser cualquier tipo de dato, como un objeto, una cadena, un número, un arreglo, etc. El payload es opcional y se utiliza para enviar datos relevantes junto con la acción. Por ejemplo, si estás realizando una acción para agregar un nuevo elemento a una lista, el payload podría contener los detalles de ese elemento.
*/

/* Reducer:
en el reductor, estás utilizando builder.addCase(setUser, ...) para manejar esta acción. Cuando esta acción se dispara, el estado se actualiza con el valor del payload de la acción, que presumiblemente contiene los datos de los usuarios.
*/
