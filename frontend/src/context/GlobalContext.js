import React, {createContext, useContext, useReducer, useEffect} from "react";
import axios from 'axios'


////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
// INITIAL GLOBAL STATE
const initialState = {
  user: [],
  entries: [],
  userEntries: [],
}

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
    
      case "SET_USER_ENTRIES":
        return {
          ...state,
          userEntries: action.payload,
        }
    


    default: 
      return state;
  }



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
    // getCurrentUser()
    
  }, [])

  // ACTION 1: GET CURRENT USER
  const getCurrentUser = async () => {
    
    try {

      const res = await axios.get("/api/user/current")

     
      

      if(res.data) {
        dispatch({type: "SET_CURRENT_USER", payload: res.data.name })
      }

      
    } catch (error) {
      console.log(error)
    }
  }

  const getAllEntries = async () => {
    try {
      const res = await axios.get("/api/entry")

      if(res.data) {
        dispatch({type: "SET_ALL_ENTRIES", payload: res.data })
      }


    } catch (error) {
      console.log(error)
    }
  }

  const getUserEntries = async () => {
    try {
      const res = await axios.get("/api/user")

      if(res.data) {
        dispatch({type: "SET_USER_ENTRIES", payload: res.data })
      }


    } catch (error) {
      console.log(error)
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

