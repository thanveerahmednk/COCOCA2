import {
  GET_USERS,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  ADD_USER,
  ADD_USER_FAIL,
  ADD_USER_SUCCESS,
  GET_USER,
  GET_USER_FAIL,
  GET_USER_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
  DELETE_USER,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
} from "./actionTypes";

export const getUsers = () => ({
  type: GET_USERS,
});

export const getUsersSuccess = (users) => ({
  type: GET_USERS_SUCCESS,
  payload: users,
});

export const getUsersFail = (error) => ({
  type: GET_USERS_FAIL,
  payload: error,
});

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const addUserSuccess = (user) => ({
  type: ADD_USER_SUCCESS,
  payload: user,
});

export const addUserFail = (error) => ({
  type: ADD_USER_FAIL,
  payload: error,
});

export const getUser = (user) => ({
  type: GET_USER,
  payload: user,
});

export const getUserSuccess = (user) => ({
  type: GET_USER_SUCCESS,
  payload: user,
});

export const getUserFail = (error) => ({
  type: GET_USER_FAIL,
  payload: error,
});

export const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user,
});

export const updateUserSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});

export const updateUserFail = (error) => ({
  type: UPDATE_USER_FAIL,
  payload: error,
});

export const deleteUser = (user) => ({
  type: DELETE_USER,
  payload: user,
});

export const deleteUserSuccess = (user) => ({
  type: DELETE_USER_SUCCESS,
  payload: user,
});

export const deleteUserFail = (error) => ({
  type: DELETE_USER_FAIL,
  payload: error,
});
