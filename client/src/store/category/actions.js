import {
    GET_CATEGORIES,
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_SUCCESS,
    ADD_CATEGORY,
    ADD_CATEGORY_FAIL,
    ADD_CATEGORY_SUCCESS,
    GET_CATEGORY,
    GET_CATEGORY_FAIL,
    GET_CATEGORY_SUCCESS,
    UPDATE_CATEGORY,
    UPDATE_CATEGORY_FAIL,
    UPDATE_CATEGORY_SUCCESS,
    DELETE_CATEGORY,
    DELETE_CATEGORY_FAIL,
    DELETE_CATEGORY_SUCCESS,
    CHANGE_STATUS_CATEGORY,
    CHANGE_STATUS_CATEGORY_SUCCESS,
    CHANGE_STATUS_CATEGORY_FAIL,
    GET_CATEGORY_OPTIONS,
    GET_CATEGORY_OPTIONS_SUCCESS,
    GET_CATEGORY_OPTIONS_FAIL,
  } from './actionTypes';
  
  export const getCategories = () => ({
    type: GET_CATEGORIES,
  });
  
  export const getCategoriesSuccess = (category) => ({
    type: GET_CATEGORIES_SUCCESS,
    payload: category,
  });
  
  export const getCategoriesFail = (error) => ({
    type: GET_CATEGORIES_FAIL,
    payload: error,
  });
  
  export const addCategory = (category) => ({
    type: ADD_CATEGORY,
    payload: category,
  });
  
  export const addCategorySuccess = (category) => ({
    type: ADD_CATEGORY_SUCCESS,
    payload: category,
  });
  
  export const addCategoryFail = (category) => ({
    type: ADD_CATEGORY_FAIL,
    payload: category,
  });
  
  export const getCategory = (category) => ({
    type: GET_CATEGORY,
    payload: category,
  });
  
  export const getCategorySuccess = (category) => ({
    type: GET_CATEGORY_SUCCESS,
    payload: category,
  });
  
  export const getCategoryFail = (error) => ({
    type: GET_CATEGORY_FAIL,
    payload: error,
  });
  
  export const updateCategory = (category) => ({
    type: UPDATE_CATEGORY,
    payload: category,
  });
  
  export const updateCategorySuccess = (category) => ({
    type: UPDATE_CATEGORY_SUCCESS,
    payload: category,
  });
  
  export const updateCategoryFail = (error) => ({
    type: UPDATE_CATEGORY_FAIL,
    payload: error,
  });
  
  export const deleteCategory = (category, auth_user) => ({
    type: DELETE_CATEGORY,
    payload: category,
    auth_data: auth_user,
  });
  
  export const deleteCategorySuccess = (category) => ({
    type: DELETE_CATEGORY_SUCCESS,
    payload: category,
  });
  
  export const deleteCategoryFail = (error) => ({
    type: DELETE_CATEGORY_FAIL,
    payload: error,
  });
  export const toggleActiveStatus = (category, auth_user) => ({
    type: CHANGE_STATUS_CATEGORY,
    payload: category,
    auth_data: auth_user,
  });
  
  export const toggleActiveStatusSuccess = (category) => ({
    type: CHANGE_STATUS_CATEGORY_SUCCESS,
    payload: category,
  });
  
  export const toggleActiveStatusFail = (error) => ({
    type: CHANGE_STATUS_CATEGORY_FAIL,
    payload: error,
  });
  
  export const getCategoryOptions = () => ({
    type: GET_CATEGORY_OPTIONS,
  });
  
  export const getCategoryOptionsSuccess = (category) => ({
    type: GET_CATEGORY_OPTIONS_SUCCESS,
    payload: category,
  });
  
  export const getCategoryOptionsFail = (error) => ({
    type: GET_CATEGORY_OPTIONS_FAIL,
    payload: error,
  });