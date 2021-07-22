import { Create } from "@material-ui/icons";
import React, { createContext, useContext, useState, useReducer } from "react";

let CreatedContext = createContext();

export const useStateValue = () => useContext(CreatedContext);

export const StateProvider = ({ reducer, initialState, children }) => (
  <CreatedContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </CreatedContext.Provider>
);
