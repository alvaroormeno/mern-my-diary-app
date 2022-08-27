import React, {createContext, useContext, useReducer, useEffect} from "react";
import axios from 'axios'
import globalReducer from "./GlobalReducer";

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
// INITIAL GLOBAL STATE
const initialState = {
  user: null,
  entries: []
}




////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
// CREATE THE CONTEXT
export const GlobalContext = createContext(initialState)

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
// GLOBAL PROVIDER COMPONENT
export const GlobalProvider = (props) => {

  const[state, dispatch] = useReducer(globalReducer, initialState)

  useEffect( () => {
    getCurrentUser()
  }, [])

  // ACTION 1: GET CURRENT USER
  const getCurrentUser = async () => {
    
    try {

      const res = await axios.get('api/user/current')

      if(res.data) {
        dispatch({type: "SET_CURRENT_USER", payload: res.data })
      }

      
    } catch (error) {
      
    }
  }


  // Value for all globalprivder functions
  const value = {
    ...state,
    getCurrentUser
  }

  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  )



}

export function useGlobalContext() {
  return useContext(GlobalContext)
}

