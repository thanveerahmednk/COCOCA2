import {
  GET_COMPANIES_OPTIONS_SUCCESS,
  GET_COMPANIES_OPTIONS_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  companiesOptions: [],
};

const companies = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COMPANIES_OPTIONS_SUCCESS:
      return {
        ...state,
        companiesOptions: action.payload,
      };

    case GET_COMPANIES_OPTIONS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default companies;
