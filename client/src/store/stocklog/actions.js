import {
    GET_STOCKLOGS,
    GET_STOCKLOGS_FAIL,
    GET_STOCKLOGS_SUCCESS,
    ADD_STOCKLOG,
    ADD_STOCKLOG_FAIL,
    ADD_STOCKLOG_SUCCESS,
    GET_STOCKLOG,
    GET_STOCKLOG_FAIL,
    GET_STOCKLOG_SUCCESS,
    UPDATE_STOCKLOG,
    UPDATE_STOCKLOG_FAIL,
    UPDATE_STOCKLOG_SUCCESS,
    DELETE_STOCKLOG,
    DELETE_STOCKLOG_FAIL,
    DELETE_STOCKLOG_SUCCESS,
  } from './actionTypes';
  
  export const getStocklogs = () => ({
    type: GET_STOCKLOGS,
  });
  
  export const getStocklogsSuccess = (stocklog) => ({
    type: GET_STOCKLOGS_SUCCESS,
    payload: stocklog,
  });
  
  export const getStocklogsFail = (error) => ({
    type: GET_STOCKLOGS_FAIL,
    payload: error,
  });
  
  export const addStocklog = (stocklog) => ({
    type: ADD_STOCKLOG,
    payload: stocklog,
  });
  
  export const addStocklogSuccess = (stocklog) => ({
    type: ADD_STOCKLOG_SUCCESS,
    payload: stocklog,
  });
  
  export const addStocklogFail = (error) => ({
    type: ADD_STOCKLOG_FAIL,
    payload: error,
  });
  
  export const getStocklog = (stocklog) => ({
    type: GET_STOCKLOG,
    payload: stocklog,
  });
  
  export const getStocklogSuccess = (stocklog) => ({
    type: GET_STOCKLOG_SUCCESS,
    payload: stocklog,
  });
  
  export const getStocklogFail = (error) => ({
    type: GET_STOCKLOG_FAIL,
    payload: error,
  });
  
  export const updateStocklog = (stocklog) => ({
    type: UPDATE_STOCKLOG,
    payload: stocklog,
  });
  
  export const updateStocklogSuccess = (stocklog) => ({
    type: UPDATE_STOCKLOG_SUCCESS,
    payload: stocklog,
  });
  
  export const updateStocklogFail = (error) => ({
    type: UPDATE_STOCKLOG_FAIL,
    payload: error,
  });
  
  export const deleteStocklog = (stocklog, auth_user) => ({
    type: DELETE_STOCKLOG,
    payload: stocklog,
    auth_data: auth_user,
  });
  
  export const deleteStocklogSuccess = (stocklog) => ({
    type: DELETE_STOCKLOG_SUCCESS,
    payload: stocklog,
  });
  
  export const deleteStocklogFail = (error) => ({
    type: DELETE_STOCKLOG_FAIL,
    payload: error,
  });
  