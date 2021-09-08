import {
  GET_UNITS,
  GET_UNITS_FAIL,
  GET_UNITS_SUCCESS,
  ADD_UNIT,
  ADD_UNIT_FAIL,
  ADD_UNIT_SUCCESS,
  GET_UNIT,
  GET_UNIT_FAIL,
  GET_UNIT_SUCCESS,
  UPDATE_UNIT,
  UPDATE_UNIT_FAIL,
  UPDATE_UNIT_SUCCESS,
  DELETE_UNIT,
  DELETE_UNIT_FAIL,
  DELETE_UNIT_SUCCESS,
} from './actionTypes';

export const getUnits = () => ({
  type: GET_UNITS,
});

export const getUnitsSuccess = (unit) => ({
  type: GET_UNITS_SUCCESS,
  payload: unit,
});

export const getUnitsFail = (error) => ({
  type: GET_UNITS_FAIL,
  payload: error,
});

export const addUnit = (unit) => ({
  type: ADD_UNIT,
  payload: unit,
});

export const addUnitSuccess = (unit) => ({
  type: ADD_UNIT_SUCCESS,
  payload: unit,
});

export const addUnitFail = (error) => ({
  type: ADD_UNIT_FAIL,
  payload: error,
});

export const getUnit = (unit) => ({
  type: GET_UNIT,
  payload: unit,
});

export const getUnitSuccess = (unit) => ({
  type: GET_UNIT_SUCCESS,
  payload: unit,
});

export const getUnitFail = (error) => ({
  type: GET_UNIT_FAIL,
  payload: error,
});

export const updateUnit = (unit) => ({
  type: UPDATE_UNIT,
  payload: unit,
});

export const updateUnitSuccess = (unit) => ({
  type: UPDATE_UNIT_SUCCESS,
  payload: unit,
});

export const updateUnitFail = (error) => ({
  type: UPDATE_UNIT_FAIL,
  payload: error,
});

export const deleteUnit = (unit, auth_user) => ({
  type: DELETE_UNIT,
  payload: unit,
  auth_data: auth_user,
});

export const deleteUnitSuccess = (unit) => ({
  type: DELETE_UNIT_SUCCESS,
  payload: unit,
});

export const deleteUnitFail = (error) => ({
  type: DELETE_UNIT_FAIL,
  payload: error,
});
