import {
    GET_STOCKS,
    GET_STOCKS_FAIL,
    GET_STOCKS_SUCCESS,
    ADD_STOCK,
    ADD_STOCK_FAIL,
    ADD_STOCK_SUCCESS,
    GET_STOCK,
    GET_STOCK_FAIL,
    GET_STOCK_SUCCESS,
    UPDATE_STOCK,
    UPDATE_STOCK_FAIL,
    UPDATE_STOCK_SUCCESS,
    DELETE_STOCK,
    DELETE_STOCK_FAIL,
    DELETE_STOCK_SUCCESS,
  } from './actionTypes';
  
  export const getStocks = () => ({
    type: GET_STOCKS,
  });
  
  export const getStocksSuccess = (stock) => ({
    type: GET_STOCKS_SUCCESS,
    payload: stock,
  });
  
  export const getStocksFail = (error) => ({
    type: GET_STOCKS_FAIL,
    payload: error,
  });
  
  export const addStock = (stock) => ({
    type: ADD_STOCK,
    payload: stock,
  });
  
  export const addStockSuccess = (stock) => ({
    type: ADD_STOCK_SUCCESS,
    payload: stock,
  });
  
  export const addStockFail = (error) => ({
    type: ADD_STOCK_FAIL,
    payload: error,
  });
  
  export const getStock = (stock) => ({
    type: GET_STOCK,
    payload: stock,
  });
  
  export const getStockSuccess = (stock) => ({
    type: GET_STOCK_SUCCESS,
    payload: stock,
  });
  
  export const getStockFail = (error) => ({
    type: GET_STOCK_FAIL,
    payload: error,
  });
  
  export const updateStock = (stock) => ({
    type: UPDATE_STOCK,
    payload: stock,
  });
  
  export const updateStockSuccess = (stock) => ({
    type: UPDATE_STOCK_SUCCESS,
    payload: stock,
  });
  
  export const updateStockFail = (error) => ({
    type: UPDATE_STOCK_FAIL,
    payload: error,
  });
  
  export const deleteStock = (stock, auth_user) => ({
    type: DELETE_STOCK,
    payload: stock,
    auth_data: auth_user,
  });
  
  export const deleteStockSuccess = (stock) => ({
    type: DELETE_STOCK_SUCCESS,
    payload: stock,
  });
  
  export const deleteStockFail = (error) => ({
    type: DELETE_STOCK_FAIL,
    payload: error,
  });
  