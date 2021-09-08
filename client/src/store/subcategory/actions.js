import {
    GET_SUBCATEGORIES,
    GET_SUBCATEGORIES_FAIL,
    GET_SUBCATEGORIES_SUCCESS,
    ADD_SUBCATEGORY,
    ADD_SUBCATEGORY_FAIL,
    ADD_SUBCATEGORY_SUCCESS,
    GET_SUBCATEGORY,
    GET_SUBCATEGORY_FAIL,
    GET_SUBCATEGORY_SUCCESS,
    UPDATE_SUBCATEGORY,
    UPDATE_SUBCATEGORY_FAIL,
    UPDATE_SUBCATEGORY_SUCCESS,
    DELETE_SUBCATEGORY,
    DELETE_SUBCATEGORY_FAIL,
    DELETE_SUBCATEGORY_SUCCESS,
    CHANGE_STATUS_SUBCATEGORY,
    CHANGE_STATUS_SUBCATEGORY_SUCCESS,
    CHANGE_STATUS_SUBCATEGORY_FAIL,
    GET_SUBCATEGORY_OPTIONS,
    GET_SUBCATEGORY_OPTIONS_SUCCESS,
    GET_SUBCATEGORY_OPTIONS_FAIL,
  } from './actionTypes';
  
  export const getSubcategories = () => ({
    type: GET_SUBCATEGORIES,
  });
  
  export const getSubcategoriesSuccess = (subcategory) => ({
    type: GET_SUBCATEGORIES_SUCCESS,
    payload: subcategory, 
  });
  
  export const getSubcategoriesFail = (error) => ({
    type: GET_SUBCATEGORIES_FAIL,
    payload: error,
  });
  
  export const addSubcategory = (subcategory) => ({
    type: ADD_SUBCATEGORY,
    payload: subcategory,
  });
  
  export const addSubcategorySuccess = (subcategory) => ({
    type: ADD_SUBCATEGORY_SUCCESS,
    payload: subcategory,
  });
  
  export const addSubcategoryFail = (subcategory) => ({
    type: ADD_SUBCATEGORY_FAIL,
    payload: subcategory,
  });
  
  export const getSubcategory = (subcategory) => ({
    type: GET_SUBCATEGORY,
    payload: subcategory,
  });
  
  export const getSubcategorySuccess = (subcategory) => ({
    type: GET_SUBCATEGORY_SUCCESS,
    payload: subcategory,
  });
  
  export const getSubcategoryFail = (error) => ({
    type: GET_SUBCATEGORY_FAIL,
    payload: error,
  });
  
  export const updateSubcategory = (subcategory)=> ({
    type: UPDATE_SUBCATEGORY,
    payload: subcategory,
  });
  
  export const updateSubcategorySuccess = (subcategory) => ({
    type: UPDATE_SUBCATEGORY_SUCCESS,
    payload: subcategory,
  });
  
  export const updateSubcategoryFail = (error) => ({
    type: UPDATE_SUBCATEGORY_FAIL,
    payload: error,
  });
  
  export const deleteSubcategory = (subcategory, auth_user) => ({
    type: DELETE_SUBCATEGORY,
    payload: subcategory,
    auth_data: auth_user,
  });
  
  export const deleteSubcategorySuccess = (subcategory) => ({
    type: DELETE_SUBCATEGORY_SUCCESS,
    payload: subcategory,
  });
  
  export const deleteSubcategoryFail = (error) => ({
    type: DELETE_SUBCATEGORY_FAIL,
    payload: error,
  });
  export const toggleActiveStatus = (subcategory, auth_user) => ({
    type: CHANGE_STATUS_SUBCATEGORY,
    payload: subcategory,
    auth_data: auth_user,
  });
  
  export const toggleActiveStatusSuccess = (subcategory) => ({
    type: CHANGE_STATUS_SUBCATEGORY_SUCCESS,
    payload: subcategory,
  });
  
  export const toggleActiveStatusFail = (error) => ({
    type: CHANGE_STATUS_SUBCATEGORY_FAIL,
    payload: error,
  });
  
  export const getSubcategoryOptions = () => ({
    type: GET_SUBCATEGORY_OPTIONS,
  });
  
  export const getSubcategoryOptionsSuccess = (subcategory) => ({
    type: GET_SUBCATEGORY_OPTIONS_SUCCESS,
    payload: subcategory,
  });
  
  export const getSubcategoryOptionsFail = (error) => ({
    type: GET_SUBCATEGORY_OPTIONS_FAIL,
    payload: error,
  });