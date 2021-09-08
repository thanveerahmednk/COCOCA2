import {
    GET_ORDERS,
    GET_ORDERS_FAIL,
    GET_ORDERS_SUCCESS,
    ADD_ORDER,
    ADD_ORDER_FAIL,
    ADD_ORDER_SUCCESS,
    GET_ORDER,
    GET_ORDER_FAIL,
    GET_ORDER_SUCCESS,
    UPDATE_ORDER,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_SUCCESS,
    DELETE_ORDER,
    DELETE_ORDER_FAIL,
    DELETE_ORDER_SUCCESS,
    DELIVER_ORDER,
    DELIVER_ORDER_SUCCESS,
    DELIVER_ORDER_FAIL,
    OUTOF_DELIVER_ORDER,
    OUTOF_DELIVER_ORDER_SUCCESS,
    OUTOF_DELIVER_ORDER_FAIL
  } from './actionTypes';
  
  export const getOrders = () => ({
    type: GET_ORDERS,
  });
  
  export const getOrdersSuccess = (order) => ({
    type: GET_ORDERS_SUCCESS,
    payload: order,
  });
  
  export const getOrdersFail = (error) => ({
    type: GET_ORDERS_FAIL,
    payload: error,
  });
  
  export const addOrder = (order) => ({
    type: ADD_ORDER,
    payload: order,
  });
  
  export const addOrderSuccess = (order) => ({
    type: ADD_ORDER_SUCCESS,
    payload: order,
  });
  
  export const addOrderFail = (error) => ({
    type: ADD_ORDER_FAIL,
    payload: error,
  });
  
  export const getOrder = (order) => ({
    type: GET_ORDER,
    payload: order,
  });
  
  export const getOrderSuccess = (order) => ({
    type: GET_ORDER_SUCCESS,
    payload: order,
  });
  
  export const getOrderFail = (error) => ({
    type: GET_ORDER_FAIL,
    payload: error,
  });
  
  export const updateOrder = (order) => ({
    type: UPDATE_ORDER,
    payload: order,
  });
  
  export const updateOrderSuccess = (order) => ({
    type: UPDATE_ORDER_SUCCESS,
    payload: order,
  });
  
  export const updateOrderFail = (error) => ({
    type: UPDATE_ORDER_FAIL,
    payload: error,
  });
  
  export const deleteOrder = (order, auth_user) => ({
    type: DELETE_ORDER,
    payload: order,
    auth_data: auth_user,
  });
  
  export const deleteOrderSuccess = (order) => ({
    type: DELETE_ORDER_SUCCESS,
    payload: order,
  });
  
  export const deleteOrderFail = (error) => ({
    type: DELETE_ORDER_FAIL,
    payload: error,
  });
  
  export const deliverOrder = (o_id, auth_user) => ({
    
    type: DELIVER_ORDER,
    payload: o_id,
    auth_data: auth_user,
  });
  
  export const deliverOrderSuccess = (o_id) => ({
    type: DELIVER_ORDER_SUCCESS,
    payload: o_id,
  });
  
  export const deliverOrderFail = (error) => ({
    type: DELIVER_ORDER_FAIL,
    payload: error,
  });
  
  export const outofdeliverOrder = (o_id, auth_user) => ({
    
    type: OUTOF_DELIVER_ORDER,
    payload: o_id,
    auth_data: auth_user,
  });
  
  export const outofdeliverOrderSuccess = (o_id) => ({
    type: OUTOF_DELIVER_ORDER_SUCCESS,
    payload: o_id,
  });
  
  export const outofdeliverOrderFail = (error) => ({
    type: OUTOF_DELIVER_ORDER_FAIL,
    payload: error,
  });