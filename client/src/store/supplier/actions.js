import {
    GET_SUPPLIERS,
    GET_SUPPLIERS_FAIL,
    GET_SUPPLIERS_SUCCESS,
    ADD_SUPPLIER,
    ADD_SUPPLIER_FAIL,
    ADD_SUPPLIER_SUCCESS,
    GET_SUPPLIER,
    GET_SUPPLIER_FAIL,
    GET_SUPPLIER_SUCCESS,
    UPDATE_SUPPLIER,
    UPDATE_SUPPLIER_FAIL,
    UPDATE_SUPPLIER_SUCCESS,
    DELETE_SUPPLIER,
    DELETE_SUPPLIER_FAIL,
    DELETE_SUPPLIER_SUCCESS,
  } from './actionTypes';
  
  export const getSuppliers = () => ({
    type: GET_SUPPLIERS,
  });
  
  export const getSuppliersSuccess = (supplier) => ({
    type: GET_SUPPLIERS_SUCCESS,
    payload: supplier,
  });
  
  export const getSuppliersFail = (error) => ({
    type: GET_SUPPLIERS_FAIL,
    payload: error,
  });
  
  export const addSupplier = (supplier) => ({
    type: ADD_SUPPLIER,
    payload: supplier,
  });
  
  export const addSupplierSuccess = (supplier) => ({
    type: ADD_SUPPLIER_SUCCESS,
    payload: supplier,
  });
  
  export const addSupplierFail = (error) => ({
    type: ADD_SUPPLIER_FAIL,
    payload: error,
  });
  
  export const getSupplier = (supplier) => ({
    type: GET_SUPPLIER,
    payload: supplier,
  });
  
  export const getSupplierSuccess = (supplier) => ({
    type: GET_SUPPLIER_SUCCESS,
    payload: supplier,
  });
  
  export const getSupplierFail = (error) => ({
    type: GET_SUPPLIER_FAIL,
    payload: error,
  });
  
  export const updateSupplier = (supplier) => ({
    type: UPDATE_SUPPLIER,
    payload: supplier,
  });
  
  export const updateSupplierSuccess = (supplier) => ({
    type: UPDATE_SUPPLIER_SUCCESS,
    payload: supplier,
  });
  
  export const updateSupplierFail = (error) => ({
    type: UPDATE_SUPPLIER_FAIL,
    payload: error,
  });
  
  export const deleteSupplier = (supplier, auth_user) => ({
    type: DELETE_SUPPLIER,
    payload: supplier,
    auth_data: auth_user,
  });
  
  export const deleteSupplierSuccess = (supplier) => ({
    type: DELETE_SUPPLIER_SUCCESS,
    payload: supplier,
  });
  
  export const deleteSupplierFail = (error) => ({
    type: DELETE_SUPPLIER_FAIL,
    payload: error,
  });