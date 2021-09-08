import {
    GET_CATEGORIES,
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_SUCCESS,
    ADD_CATEGORY,
    ADD_CATEGORY_FAIL,
    ADD_CATEGORY_SUCCESS,
    DELETE_CATEGORY,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    UPDATE_CATEGORY,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    CHANGE_STATUS_CATEGORY,
    CHANGE_STATUS_CATEGORY_SUCCESS,
    CHANGE_STATUS_CATEGORY_FAIL,
    GET_CATEGORY_OPTIONS_SUCCESS,
    GET_CATEGORY_OPTIONS_FAIL,
  } from './actionTypes';
  
  const INIT_STATE = {
    categories: [],
    addingCategory: false,
    deletingCategory: false,
    addCategoryResponse: {},
    updateCategoryResponse: {},
    deleteCategoryResponse: {},
    statusCategoryResponse: {},
    categoryIdToBeDeleted: '',
    category: {},
    error: {},
    categoryOptions: [],
  };
  
  const Category = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_CATEGORIES:
        return {
          ...state,
          params: action.payload,
        };
  
      case GET_CATEGORIES_SUCCESS:
        return {
          ...state,
          categories: action.payload.data,
        };
  
      case GET_CATEGORIES_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      
        case ADD_CATEGORY:
        return {
          ...state,
          addingCategory: true,
          category: action.payload,
        };
  
      case ADD_CATEGORY_SUCCESS:
        let newCategories = [JSON.parse(JSON.stringify(action.payload.data[0]))];
        newCategories.push(...state.categories);
  
        return {
          ...state,
          addingCategory: false,
          addCategoryResponse: {
            type: 'success',
            message: 'Category added successfully',
          },
          categories: newCategories,
          error: {},
        };
  
      case ADD_CATEGORY_FAIL:
        return {
          ...state,
          addingCategory: false,
          addCategoryResponse: {
            type: 'failure',
            message: 'Adding category failed',
          },
          error: action.payload,
        };
      case DELETE_CATEGORY:
        return {
          ...state,
          deletingCategory: true,
          categoryIdToBeDeleted: action.payload,
        };
  
      case DELETE_CATEGORY_SUCCESS:
        let newCategories2 = state.categories.filter((category) => {
          return category.category_id != state.categoryIdToBeDeleted;
        });
        return {
          ...state,
          deletingCategory: false,
          categoryIdToBeDeleted: '',
          deletingCategory: false,
          deleteCategoryResponse: {
            type: 'success',
            message: 'Category deleted successfully',
          },
          categories: newCategories2,
        };
  
      case DELETE_CATEGORY_FAIL:
        return {
          ...state,
          deletingCategory: false,
          deleteCategoryResponse: {
            type: 'failure',
            message: 'Deleting Category failed',
          },
          error: action.payload,
        };
  
      case UPDATE_CATEGORY:
        return {
          ...state,
          updatingCategory: true,
          category: action.payload,
        };
  
      case UPDATE_CATEGORY_SUCCESS:
        let newcategoryarr = [];
        let newCategories1 = state.categories.filter((category) => {
          if (category.category_id == state.category.category_id) {
            console.log(JSON.parse(JSON.stringify(action.payload.data[0])));
            newcategoryarr.push(
              JSON.parse(JSON.stringify(action.payload.data[0]))
            );
          } else {
            newcategoryarr.push(category);
          }
        });
  
        return {
          ...state,
          updatingCategory: false,
          category: '',
          updatingCategory: false,
          updateCategoryResponse: {
            type: 'success',
            message: 'Category updated successfully',
          },
          categories: newcategoryarr,
        };
  
      case UPDATE_CATEGORY_FAIL:
        return {
          ...state,
          updatingCategory: false,
          updateCategoryResponse: {
            type: 'failure',
            message: 'Updating category failed',
          },
          error: action.payload,
        };
  
      case CHANGE_STATUS_CATEGORY:
        return {
          ...state,
          // deletingCategory: true,
          // categoryIdToBeDeleted: action.payload,
        };
  
      case CHANGE_STATUS_CATEGORY_SUCCESS:
        /* let newCategories2 = state.categories.filter((category) => {
            return category.category_id != state.categoryIdToBeDeleted;
          });*/
        return {
          ...state,
          //deletingCategory: false,
          //categoryIdToBeDeleted: "",
          //deletingCategory: false,
          statusCategoryResponse: {
            type: 'success',
            message: 'Status Changed successfully',
          },
          //categories: newCategories2,
        };
  
      case CHANGE_STATUS_CATEGORY_FAIL:
        return {
          ...state,
          //deletingCategory: false,
          statusCategoryResponse: {
            type: 'failure',
            message: 'Deleting Category failed',
          },
          error: action.payload,
        };
        case GET_CATEGORY_OPTIONS_SUCCESS:
          return {
            ...state,
            categoryOptions: action.payload,
          };
    
        case GET_CATEGORY_OPTIONS_FAIL:
          return {
            ...state,
            error: action.payload,
          };
      default:
        return state;
    }
  };
  
  export default Category;