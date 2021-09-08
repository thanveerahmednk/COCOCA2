import {
  GET_BRANCHES_OPTIONS_SUCCESS,
  GET_BRANCHES_OPTIONS_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  branchesOptions: [],
};

const branches = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_BRANCHES_OPTIONS_SUCCESS:
      console.log(action.payload, "branches reducer");
      return {
        ...state,
        branchesOptions: action.payload,
      };

    case GET_BRANCHES_OPTIONS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default branches;
