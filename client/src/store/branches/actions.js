import {
  GET_BRANCHES_OPTIONS,
  GET_BRANCHES_OPTIONS_SUCCESS,
  GET_BRANCHES_OPTIONS_FAIL,
} from "./actionTypes";

export const getBranchesOptions = (companyId) => ({
  type: GET_BRANCHES_OPTIONS,
  payload: companyId,
});

export const getBranchesOptionsSuccess = (branches) => ({
  type: GET_BRANCHES_OPTIONS_SUCCESS,
  payload: branches,
});

export const getBranchesOptionsFail = (error) => ({
  type: GET_BRANCHES_OPTIONS_FAIL,
  payload: error,
});
