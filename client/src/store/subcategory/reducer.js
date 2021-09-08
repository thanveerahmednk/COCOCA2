import {
    GET_SUBCATEGORIES,
    GET_SUBCATEGORIES_FAIL,
    GET_SUBCATEGORIES_SUCCESS,
    ADD_SUBCATEGORY,
    ADD_SUBCATEGORY_FAIL,
    ADD_SUBCATEGORY_SUCCESS,
    DELETE_SUBCATEGORY,
    DELETE_SUBCATEGORY_SUCCESS,
    DELETE_SUBCATEGORY_FAIL,
    UPDATE_SUBCATEGORY,
    UPDATE_SUBCATEGORY_SUCCESS,
    UPDATE_SUBCATEGORY_FAIL,
    CHANGE_STATUS_SUBCATEGORY,
    CHANGE_STATUS_SUBCATEGORY_SUCCESS,
    CHANGE_STATUS_SUBCATEGORY_FAIL,
    GET_SUBCATEGORY_OPTIONS_SUCCESS,
    GET_SUBCATEGORY_OPTIONS_FAIL,
  } from './actionTypes';
  
  const INIT_STATE = {
    subcategories: [],
    addingSubcategory: false,
    deletingSubcategory: false,
    addSubcategoryResponse: {},
    updateSubcategoryResponse: {},
    deleteSubcategoryResponse: {},
    statusSubcategoryResponse: {},
    subcategoryIdToBeDeleted: '',
    subcategory: {},
    error: {},
    subcategoryOptions: [],
  };
  
  const Subcategory = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_SUBCATEGORIES:
        return {
          ...state,
          params: action.payload,
        };
  
      case GET_SUBCATEGORIES_SUCCESS:
        return {
          ...state,
          subcategories: action.payload.data,
        };
  
      case GET_SUBCATEGORIES_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      
        case ADD_SUBCATEGORY:
        return {
          ...state,
          addingSubcategory: true,
          subcategory: action.payload,
        };
  
      case ADD_SUBCATEGORY_SUCCESS:
        let newSubcategories = [JSON.parse(JSON.stringify(action.payload.data[0]))];
        newSubcategories.push(...state.subcategories);
  
        return {
          ...state,
          addingSubcategory: false,
          addSubcategoryResponse: {
            type: 'success',
            message: 'Subategory added successfully',
          },
          subcategories: newSubcategories,
          error: {},
        };
  
      case ADD_SUBCATEGORY_FAIL:
        return {
          ...state,
          addingSubcategory: false,
          addSubcategoryResponse: {
            type: 'failure',
            message: 'Adding Subcategory failed',
          },
          error: action.payload,
        };
      case DELETE_SUBCATEGORY:
        return {
          ...state,
          deletingSubcategory: true,
          subcategoryIdToBeDeleted: action.payload,
        };
  
      case DELETE_SUBCATEGORY_SUCCESS:
        let newSubcategories2 = state.subcategories.filter((subcategory) => {
          return subcategory.subcategory_id != state.subcategoryIdToBeDeleted;
        });
        return {
          ...state,
          deletingSubcategory: false,
          subcategoryIdToBeDeleted: '',
          deletingSubcategory: false,
          deleteSubcategoryResponse: {
            type: 'success',
            message: 'Subcategory deleted successfully',
          },
          subcategories: newSubcategories2,
        };
  
      case DELETE_SUBCATEGORY_FAIL:
        return {
          ...state,
          deletingSubcategory: false,
          deleteSubcategoryResponse: {
            type: 'failure',
            message: 'Deleting Subcategory failed',
          },
          error: action.payload,
        };
  
      case UPDATE_SUBCATEGORY:
        return {
          ...state,
          updatingSubcategory: true,
          subcategory: action.payload,
        };
  
      case UPDATE_SUBCATEGORY_SUCCESS:
        let newsubcategoryarr = [];
        let newSubcategories1 = state.subcategories.filter((subcategory) => {
          if (subcategory.subcategory_id == state.subcategory.subcategory_id) {
            console.log(JSON.parse(JSON.stringify(action.payload.data[0])));
            newsubcategoryarr.push(
              JSON.parse(JSON.stringify(action.payload.data[0]))
            );
          } else {
            newsubcategoryarr.push(subcategory);
          }
        });
  
        return {
          ...state,
          updatingSubcategory: false,
          subcategory: '',
          updatingSubcategory: false,
          updateSubcategoryResponse: {
            type: 'success',
            message: 'Subcategory updated successfully',
          },
          subcategories: newsubcategoryarr,
        };
  
      case UPDATE_SUBCATEGORY_FAIL:
        return {
          ...state,
          updatingSubcategory: false,
          updateSubcategoryResponse: {
            type: 'failure',
            message: 'Updating Subcategory failed',
          },
          error: action.payload,
        };
  
      case CHANGE_STATUS_SUBCATEGORY:
        return {
          ...state,
          // deletingCategory: true,
          // categoryIdToBeDeleted: action.payload,
        };
  
      case CHANGE_STATUS_SUBCATEGORY_SUCCESS:
        /* let newCategories2 = state.categories.filter((category) => {
            return category.category_id != state.categoryIdToBeDeleted;
          });*/
        return {
          ...state,
          //deletingCategory: false,
          //categoryIdToBeDeleted: "",
          //deletingCategory: false,
          statusSubcategoryResponse: {
            type: 'success',
            message: 'Status Changed successfully',
          },
          //categories: newCategories2,
        };
  
      case CHANGE_STATUS_SUBCATEGORY_FAIL:
        return {
          ...state,
          //deletingCategory: false,
          statusSubcategoryResponse: {
            type: 'failure',
            message: 'Deleting Subategory failed',
          },
          error: action.payload,
        };
        case GET_SUBCATEGORY_OPTIONS_SUCCESS:
          return {
            ...state,
            subcategoryOptions: action.payload,
          };
    
        case GET_SUBCATEGORY_OPTIONS_FAIL:
          return {
            ...state,
            error: action.payload,
          };
      default:
        return state;
    }
  };
  
  export default Subcategory;