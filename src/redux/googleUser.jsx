import { createAction, createReducer } from "@reduxjs/toolkit";
export const setGoogleUser = createAction("SET_GOOGLEUSER");

const initialState = {};

export const googleUserReducer = createReducer(initialState, (builder) => {
  builder.addCase(setGoogleUser, (state, action) => {
    return action.payload;
  });
});
