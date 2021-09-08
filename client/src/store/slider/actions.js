import {
    GET_SLIDERS,
    GET_SLIDERS_FAIL,
    GET_SLIDERS_SUCCESS,
    ADD_SLIDER,
    ADD_SLIDER_FAIL,
    ADD_SLIDER_SUCCESS,
    GET_SLIDER,
    GET_SLIDER_FAIL,
    GET_SLIDER_SUCCESS,
    UPDATE_SLIDER,
    UPDATE_SLIDER_FAIL,
    UPDATE_SLIDER_SUCCESS,
    DELETE_SLIDER,
    DELETE_SLIDER_FAIL,
    DELETE_SLIDER_SUCCESS,
    CHANGE_STATUS_SLIDER,
    CHANGE_STATUS_SLIDER_SUCCESS,
    CHANGE_STATUS_SLIDER_FAIL,
  } from './actionTypes';
  
  export const getSliders = () => ({
    type: GET_SLIDERS,
  });
  
  export const getSlidersSuccess = (slider) => ({
    type: GET_SLIDERS_SUCCESS,
    payload: slider,
  });
  
  export const getSlidersFail = (error) => ({
    type: GET_SLIDERS_FAIL,
    payload: error,
  });
  
  export const addSlider = (slider) => ({
    type: ADD_SLIDER,
    payload: slider,
  });
  
  export const addSliderSuccess = (slider) => ({
    type: ADD_SLIDER_SUCCESS,
    payload: slider,
  });
  
  export const addSliderFail = (error) => ({
    type: ADD_SLIDER_FAIL,
    payload: error,
  });
  
  export const getSlider = (slider) => ({
    type: GET_SLIDER,
    payload: slider,
  });
  
  export const getSliderSuccess = (slider) => ({
    type: GET_SLIDER_SUCCESS,
    payload: slider,
  });
  
  export const getSliderFail = (error) => ({
    type: GET_SLIDER_FAIL,
    payload: error,
  });
  
  export const updateSlider = (slider) => ({
    type: UPDATE_SLIDER,
    payload: slider,
  });
  
  export const updateSliderSuccess = (slider) => ({
    type: UPDATE_SLIDER_SUCCESS,
    payload: slider,
  });
  
  export const updateSliderFail = (error) => ({
    type: UPDATE_SLIDER_FAIL,
    payload: error,
  });
  
  export const deleteSlider = (slider, auth_user) => ({
    type: DELETE_SLIDER,
    payload: slider,
    auth_data: auth_user,
  });
  
  export const deleteSliderSuccess = (slider) => ({
    type: DELETE_SLIDER_SUCCESS,
    payload: slider,
  });
  
  export const deleteSliderFail = (error) => ({
    type: DELETE_SLIDER_FAIL,
    payload: error,
  });
  export const toggleActiveStatus = (slider, auth_user) => ({
    type: CHANGE_STATUS_SLIDER,
    payload: slider,
    auth_data: auth_user,
  });
  
  export const toggleActiveStatusSuccess = (slider) => ({
    type: CHANGE_STATUS_SLIDER_SUCCESS,
    payload: slider,
  });
  
  export const toggleActiveStatusFail = (error) => ({
    type: CHANGE_STATUS_SLIDER_FAIL,
    payload: error,
  });
  