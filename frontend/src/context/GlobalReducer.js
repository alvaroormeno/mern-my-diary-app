import React, {useReducer} from "react";

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
// GLOBAL REDUCER
const globalReducer = (state, action ) => {

  switch (action.type) {

    case "SET_CURRENT_USER":
      return {
        ...state,
        user: action.payload,
      }

    case "SET_ALL_ENTRIES":
      return {
        ...state,
        entries: action.payload,
      }


    default: 
      return state;
  }



}

export default globalReducer