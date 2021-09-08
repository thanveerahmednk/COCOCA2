import {
  GET_PRIVILAGES_OPTIONS_SUCCESS,
  GET_PRIVILAGES_OPTIONS_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  privilagesOptions: [],
};

const Privilages = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PRIVILAGES_OPTIONS_SUCCESS:
      return {
        ...state,
        privilagesOptions: action.payload,
      };

    case GET_PRIVILAGES_OPTIONS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default Privilages;
