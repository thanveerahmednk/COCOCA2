import { GET_Menu_OPTIONS_SUCCESS, GET_Menu_OPTIONS_FAIL } from './actionTypes';

const INIT_STATE = {
  menuOptions: [],
};

const Menus = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_Menu_OPTIONS_SUCCESS:
      return {
        ...state,
        menuOptions: action.payload,
      };

    case GET_Menu_OPTIONS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default Menus;
