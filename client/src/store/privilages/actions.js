import {
  GET_PRIVILAGES_OPTIONS,
  GET_PRIVILAGES_OPTIONS_SUCCESS,
  GET_PRIVILAGES_OPTIONS_FAIL,
} from "./actionTypes";

export const getPrivilagesOptions = () => ({
  type: GET_PRIVILAGES_OPTIONS,
});

export const getPrivilagesOptionsSuccess = (privilages) => ({
  type: GET_PRIVILAGES_OPTIONS_SUCCESS,
  payload: privilages,
});

export const getPrivilagesOptionsFail = (error) => ({
  type: GET_PRIVILAGES_OPTIONS_FAIL,
  payload: error,
});
