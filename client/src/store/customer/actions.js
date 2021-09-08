import {
    GET_CUSTOMERS,
    GET_CUSTOMERS_FAIL,
    GET_CUSTOMERS_SUCCESS,
    ADD_CUSTOMER,
    ADD_CUSTOMER_FAIL,
    ADD_CUSTOMER_SUCCESS,
    GET_CUSTOMER,
    GET_CUSTOMER_FAIL,
    GET_CUSTOMER_SUCCESS,
    UPDATE_CUSTOMER,
    UPDATE_CUSTOMER_FAIL,
    UPDATE_CUSTOMER_SUCCESS,
    DELETE_CUSTOMER,
    DELETE_CUSTOMER_FAIL,
    DELETE_CUSTOMER_SUCCESS,
    GET_CUSTOMER_OPTIONS,
    GET_CUSTOMER_OPTIONS_SUCCESS,
    GET_CUSTOMER_OPTIONS_FAIL
  } from './actionTypes';
  
  export const getCustomers = () => ({
    type: GET_CUSTOMERS,
  });
  
  export const getCustomersSuccess = (customer) => ({
    type: GET_CUSTOMERS_SUCCESS,
    payload: customer,
  });
  
  export const getCustomersFail = (error) => ({
    type: GET_CUSTOMERS_FAIL,
    payload: error,
  });
  
  export const addCustomer = (customer) => ({
    type: ADD_CUSTOMER,
    payload: customer,
  });
  
  export const addCustomerSuccess = (customer) => ({
    type: ADD_CUSTOMER_SUCCESS,
    payload: customer,
  });
  
  export const addCustomerFail = (error) => ({
    type: ADD_CUSTOMER_FAIL,
    payload: error,
  });
  
  export const getCustomer = (customer) => ({
    type: GET_CUSTOMER,
    payload: customer,
  });
  
  export const getCustomerSuccess = (customer) => ({
    type: GET_CUSTOMER_SUCCESS,
    payload: customer,
  });
  
  export const getCustomerFail = (error) => ({
    type: GET_CUSTOMER_FAIL,
    payload: error,
  });
  
  export const updateCustomer = (customer) => ({
    type: UPDATE_CUSTOMER,
    payload: customer,
  });
  
  export const updateCustomerSuccess = (customer) => ({
    type: UPDATE_CUSTOMER_SUCCESS,
    payload: customer,
  });
  
  export const updateCustomerFail = (error) => ({
    type: UPDATE_CUSTOMER_FAIL,
    payload: error,
  });
  
  export const deleteCustomer = (customer, auth_user) => ({
    type: DELETE_CUSTOMER,
    payload: customer,
    auth_data: auth_user,
  });
  
  export const deleteCustomerSuccess = (customer) => ({
    type: DELETE_CUSTOMER_SUCCESS,
    payload: customer,
  });
  
  export const deleteCustomerFail = (error) => ({
    type: DELETE_CUSTOMER_FAIL,
    payload: error,
  });
  
  export const getCustomerOptions = () => ({
    type: GET_CUSTOMER_OPTIONS,
  });
  
  export const getCustomerOptionsSuccess = (customer) => ({
    type: GET_CUSTOMER_OPTIONS_SUCCESS,
    payload: customer,
  });
  
  export const getCustomerOptionsFail = (error) => ({
    type: GET_CUSTOMER_OPTIONS_FAIL,
    payload: error,
  });