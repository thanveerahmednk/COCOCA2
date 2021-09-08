import {
    GET_STATES_OPTIONS_SUCCESS,
    GET_STATES_OPTIONS_FAIL,
  } from './actionTypes';
  
  const INIT_STATE = {
    statesOptions: [],
  };
  
  const States = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_STATES_OPTIONS_SUCCESS:
        return {
          ...state,
          statesOptions: action.payload,
        };
  
      case GET_STATES_OPTIONS_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default States;