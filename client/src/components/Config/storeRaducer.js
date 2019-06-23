import {
    SEET_STORE_CREATED,
  } from "./types";
  const isEmpty = require("is-empty");
  const initialState = {
    isAuthenticated: false,
    cretedStore: {},
    loading: false
  };
  export default function(state = initialState, action) {
    switch (action.type) {
      case SEET_STORE_CREATED:
        return {
          ...state,
          isCreated: !isEmpty(action.payload),
          cretedStore: action.payload
        };

      default:
        return state;
    }
  }