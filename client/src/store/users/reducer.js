import {
  GET_USERS,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  ADD_USER,
  ADD_USER_FAIL,
  ADD_USER_SUCCESS,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  users: [],
  addingUser: false,
  deletingUser: false,
  addUserResponse: {},
  updateUserResponse: {},
  deleteUserResponse: {},
  userIdToBeDeleted: '',
  user: {},
  error: {},
};

const User = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        params: action.payload,
      };

    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };

    case GET_USERS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case ADD_USER:
      return {
        ...state,
        addingUser: true,
        user: action.payload,
      };

    case ADD_USER_SUCCESS:
      let newUers = [action.payload.data, ...state.users];

      return {
        ...state,
        addingUser: false,
        addUserResponse: {
          type: 'success',
          message: 'User added successfully',
        },
        users: newUers,
        error: {},
      };

    case ADD_USER_FAIL:
      return {
        ...state,
        addingUser: false,
        addUserResponse: { type: 'failure', message: 'Adding user failed' },
        error: action.payload,
      };
    case DELETE_USER:
      return {
        ...state,
        deletingUser: true,
        userIdToBeDeleted: action.payload,
      };

    case DELETE_USER_SUCCESS:
      let newUsers = state.users.filter((user) => {
        return user.id !== state.userIdToBeDeleted;
      });
      return {
        ...state,
        deletingUser: false,
        userIdToBeDeleted: '',
        deleteUserResponse: {
          type: 'success',
          message: 'User deleted successfully',
        },
        users: newUsers,
      };

    case DELETE_USER_FAIL:
      return {
        ...state,
        deletingUser: false,
        deleteUserResponse: {
          type: 'failure',
          message: 'Deleting user failed',
        },
        error: action.payload,
      };

    case UPDATE_USER:
      return {
        ...state,
        updatingUser: true,
        user: action.payload,
      };
    case UPDATE_USER_SUCCESS:
      let newUsers1 = state.users.map((item) => {
        // if (item._id === state.user._id) {
        if (item.id === state.user.id) {
          return action.payload.data;
        } else {
          return item;
        }
      });
      return {
        ...state,
        updatingUser: false,
        user: '',
        updateUserResponse: {
          type: 'success',
          message: 'User updated successfully',
        },
        users: newUsers1,
      };
    // case UPDATE_USER_SUCCESS:
    //   let newUsers1 = state.users.filter((user) => {
    //     if (user._id === state.User._id) {
    //       return action.payload.data;
    //     } else {
    //       return user;
    //     }
    //   });
    //   return {
    //     ...state,
    //     updatingUser: false,
    //     user: "",
    //     updatingUser: false,
    //     updateUserResponse: {
    //       type: "success",
    //       message: "User updated successfully",
    //     },
    //     users: newUsers1,
    //   };

    case UPDATE_USER_FAIL:
      return {
        ...state,
        updatingUser: false,
        updateUserResponse: {
          type: 'failure',
          message: 'Updating user failed',
        },
        error: action.payload,
      };

    default:
      return state;
  }
};

export default User;
