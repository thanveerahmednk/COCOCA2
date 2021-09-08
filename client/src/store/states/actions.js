import {
    GET_STATES_OPTIONS,
    GET_STATES_OPTIONS_SUCCESS,
    GET_STATES_OPTIONS_FAIL,
  } from './actionTypes';
  
  export const getStatesOptions = () => ({
    type: GET_STATES_OPTIONS,
  });
  
  export const getStatesOptionsSuccess = (privilages) => ({
    type: GET_STATES_OPTIONS_SUCCESS,
    payload: privilages,
  });
  
  export const getStatesOptionsFail = (error) => ({
    type: GET_STATES_OPTIONS_FAIL,
    payload: error,
  });
