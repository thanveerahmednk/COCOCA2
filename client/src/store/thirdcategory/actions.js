import {
    GET_THIRDCATEGORIES,
    GET_THIRDCATEGORIES_FAIL,
    GET_THIRDCATEGORIES_SUCCESS,
    ADD_THIRDCATEGORY,
    ADD_THIRDCATEGORY_FAIL,
    ADD_THIRDCATEGORY_SUCCESS,
    GET_THIRDCATEGORY,
    GET_THIRDCATEGORY_FAIL,
    GET_THIRDCATEGORY_SUCCESS,
    UPDATE_THIRDCATEGORY,
    UPDATE_THIRDCATEGORY_FAIL,
    UPDATE_THIRDCATEGORY_SUCCESS,
    DELETE_THIRDCATEGORY,
    DELETE_THIRDCATEGORY_FAIL,
    DELETE_THIRDCATEGORY_SUCCESS,
    CHANGE_STATUS_THIRDCATEGORY,
    CHANGE_STATUS_THIRDCATEGORY_SUCCESS,
    CHANGE_STATUS_THIRDCATEGORY_FAIL,
    GET_THIRDCATEGORIES_OPTIONS,
    GET_THIRDCATEGORIES_OPTIONS_SUCCESS,
    GET_THIRDCATEGORIES_OPTIONS_FAIL,
  } from './actionTypes';
  
  export const getThirdcategories = () => ({
    type: GET_THIRDCATEGORIES,
  });
  
  export const getThirdcategoriesSuccess = (thirdcategory) => ({
    type: GET_THIRDCATEGORIES_SUCCESS,
    payload: thirdcategory, 
  });
  
  export const getThirdcategoriesFail = (error) => ({
    type: GET_THIRDCATEGORIES_FAIL,
    payload: error,
  });
  
  export const addThirdcategory = (thirdcategory) => ({
    type: ADD_THIRDCATEGORY,
    payload: thirdcategory,
  });
  
  export const addThirdcategorySuccess = (thirdcategory) => ({
    type: ADD_THIRDCATEGORY_SUCCESS,
    payload: thirdcategory,
  });
  
  export const addThirdcategoryFail = (thirdcategory) => ({
    type: ADD_THIRDCATEGORY_FAIL,
    payload: thirdcategory,
  });
  
  export const getThirdcategory = (thirdcategory) => ({
    type: GET_THIRDCATEGORY,
    payload: thirdcategory,
  });
  
  export const getThirdcategorySuccess = (thirdcategory) => ({
    type: GET_THIRDCATEGORY_SUCCESS,
    payload: thirdcategory,
  });
  
  export const getThirdcategoryFail = (error) => ({
    type: GET_THIRDCATEGORY_FAIL,
    payload: error,
  });
  
  export const updateThirdcategory = (thirdcategory)=> ({
    type: UPDATE_THIRDCATEGORY,
    payload: thirdcategory,
  });
  
  export const updateThirdcategorySuccess = (thirdcategory) => ({
    type: UPDATE_THIRDCATEGORY_SUCCESS,
    payload: thirdcategory,
  });
  
  export const updateThirdcategoryFail = (error) => ({
    type: UPDATE_THIRDCATEGORY_FAIL,
    payload: error,
  });
  
  export const deleteThirdcategory = (thirdcategory, auth_user) => ({
    type: DELETE_THIRDCATEGORY,
    payload: thirdcategory,
    auth_data: auth_user,
  });
  
  export const deleteThirdcategorySuccess = (thirdcategory) => ({
    type: DELETE_THIRDCATEGORY_SUCCESS,
    payload: thirdcategory,
  });
  
  export const deleteThirdcategoryFail = (error) => ({
    type: DELETE_THIRDCATEGORY_FAIL,
    payload: error,
  });
  export const toggleActiveStatus = (thirdcategory, auth_user) => ({
    type: CHANGE_STATUS_THIRDCATEGORY,
    payload: thirdcategory,
    auth_data: auth_user,
  });
  
  export const toggleActiveStatusSuccess = (thirdcategory) => ({
    type: CHANGE_STATUS_THIRDCATEGORY_SUCCESS,
    payload: thirdcategory,
  });
  
  export const toggleActiveStatusFail = (error) => ({
    type: CHANGE_STATUS_THIRDCATEGORY_FAIL,
    payload: error,
  });
  
  export const getThirdcategoriesOptions = () => ({
    type: GET_THIRDCATEGORIES_OPTIONS,
  });
  
  export const getThirdcategoriesOptionsSuccess = (thirdcategories) => ({
    type: GET_THIRDCATEGORIES_OPTIONS_SUCCESS,
    payload: thirdcategories,
  });
  
  export const getThirdcategoriesOptionsFail = (error) => ({
    type: GET_THIRDCATEGORIES_OPTIONS_FAIL,
    payload: error,
  });