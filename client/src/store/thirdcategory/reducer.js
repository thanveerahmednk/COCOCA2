import {
    GET_THIRDCATEGORIES,
    GET_THIRDCATEGORIES_FAIL,
    GET_THIRDCATEGORIES_SUCCESS,
    ADD_THIRDCATEGORY,
    ADD_THIRDCATEGORY_FAIL,
    ADD_THIRDCATEGORY_SUCCESS,
    DELETE_THIRDCATEGORY,
    DELETE_THIRDCATEGORY_SUCCESS,
    DELETE_THIRDCATEGORY_FAIL,
    UPDATE_THIRDCATEGORY,
    UPDATE_THIRDCATEGORY_SUCCESS,
    UPDATE_THIRDCATEGORY_FAIL,
    CHANGE_STATUS_THIRDCATEGORY,
    CHANGE_STATUS_THIRDCATEGORY_SUCCESS,
    CHANGE_STATUS_THIRDCATEGORY_FAIL,
    GET_THIRDCATEGORIES_OPTIONS_SUCCESS,
    GET_THIRDCATEGORIES_OPTIONS_FAIL,
  } from './actionTypes';
  
  const INIT_STATE = {
    thirdcategories: [],
    addingThirdcategory: false,
    deletingThirdcategory: false,
    addThirdcategoryResponse: {},
    updateThirdcategoryResponse: {},
    deleteThirdcategoryResponse: {},
    statusThirdcategoryResponse: {},
    thirdcategoryIdToBeDeleted: '',
    thirdcategory: {},
    error: {},
    thirdcategoryOptions: [],
  };
  
  const Thirdcategory = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_THIRDCATEGORIES:
        return {
          ...state,
          params: action.payload,
        };
  
      case GET_THIRDCATEGORIES_SUCCESS:
        return {
          ...state,
          thirdcategories: action.payload.data,
        };
  
      case GET_THIRDCATEGORIES_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      
        case ADD_THIRDCATEGORY:
        return {
          ...state,
          addingThirdcategory: true,
          thirdcategory: action.payload,
        };
  
      case ADD_THIRDCATEGORY_SUCCESS:
        let newThirdcategories = [JSON.parse(JSON.stringify(action.payload.data[0]))];
        newThirdcategories.push(...state.thirdcategories);
  
        return {
          ...state,
          addingThirdcategory: false,
          addThirdcategoryResponse: {
            type: 'success',
            message: 'Category added successfully',
          },
          thirdcategories: newThirdcategories,
          error: {},
        };
  
      case ADD_THIRDCATEGORY_FAIL:
        return {
          ...state,
          addingThirdcategory: false,
          addThirdcategoryResponse: {
            type: 'failure',
            message: 'Adding thirdcategory failed',
          },
          error: action.payload,
        };
      case DELETE_THIRDCATEGORY:
        return {
          ...state,
          deletingThirdcategory: true,
          thirdcategoryIdToBeDeleted: action.payload,
        };
  
      case DELETE_THIRDCATEGORY_SUCCESS:
        let newThirdcategories2 = state.thirdcategories.filter((thirdcategory) => {
          return thirdcategory.thirdcategory_id != state.thirdcategoryIdToBeDeleted;
        });
        return {
          ...state,
          deletingThirdcategory: false,
          thirdcategoryIdToBeDeleted: '',
          deletingThirdcategory: false,
          deleteThirdcategoryResponse: {
            type: 'success',
            message: 'Category deleted successfully',
          },
          thirdcategories: newThirdcategories2,
        };
  
      case DELETE_THIRDCATEGORY_FAIL:
        return {
          ...state,
          deletingThirdcategory: false,
          deleteThirdcategoryResponse: {
            type: 'failure',
            message: 'Deleting Category failed',
          },
          error: action.payload,
        };
  
      case UPDATE_THIRDCATEGORY:
        return {
          ...state,
          updatingThirdcategory: true,
          thirdcategory: action.payload,
        };
  
      case UPDATE_THIRDCATEGORY_SUCCESS:
        let newthirdcategoryarr = [];
        let newThirdcategories1 = state.thirdcategories.filter((thirdcategory) => {
          if (thirdcategory.thirdcategory_id == state.thirdcategory.thirdcategory_id) {
            console.log(JSON.parse(JSON.stringify(action.payload.data[0])));
            newthirdcategoryarr.push(
              JSON.parse(JSON.stringify(action.payload.data[0]))
            );
          } else {
            newthirdcategoryarr.push(thirdcategory);
          }
        });
  
        return {
          ...state,
          updatingThirdcategory: false,
          thirdcategory: '',
          updatingThirdcategory: false,
          updateThirdcategoryResponse: {
            type: 'success',
            message: 'Category updated successfully',
          },
          thirdcategories: newthirdcategoryarr,
        };
  
      case UPDATE_THIRDCATEGORY_FAIL:
        return {
          ...state,
          updatingThirdcategory: false,
          updateThirdcategoryResponse: {
            type: 'failure',
            message: 'Updating category failed',
          },
          error: action.payload,
        };
  
      case CHANGE_STATUS_THIRDCATEGORY:
        return {
          ...state,
          // deletingCategory: true,
          // categoryIdToBeDeleted: action.payload,
        };
  
      case CHANGE_STATUS_THIRDCATEGORY_SUCCESS:
        /* let newCategories2 = state.categories.filter((category) => {
            return category.category_id != state.categoryIdToBeDeleted;
          });*/
        return {
          ...state,
          //deletingCategory: false,
          //categoryIdToBeDeleted: "",
          //deletingCategory: false,
          statusThirdcategoryResponse: {
            type: 'success',
            message: 'Status Changed successfully',
          },
          //categories: newCategories2,
        };
  
      case CHANGE_STATUS_THIRDCATEGORY_FAIL:
        return {
          ...state,
          //deletingCategory: false,
          statusThirdcategoryResponse: {
            type: 'failure',
            message: 'Deleting Category failed',
          },
          error: action.payload,
        };
        case GET_THIRDCATEGORIES_OPTIONS_SUCCESS:
          return {
            ...state,
            thirdcategoryOptions: action.payload,
          };
    
        case GET_THIRDCATEGORIES_OPTIONS_FAIL:
          return {
            ...state,
            error: action.payload,
          };
      default:
        return state;
    }
  };
  
  export default Thirdcategory;