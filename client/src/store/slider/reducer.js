import {
    GET_SLIDERS,
    GET_SLIDERS_FAIL,
    GET_SLIDERS_SUCCESS,
    ADD_SLIDER,
    ADD_SLIDER_FAIL,
    ADD_SLIDER_SUCCESS,
    DELETE_SLIDER,
    DELETE_SLIDER_SUCCESS,
    DELETE_SLIDER_FAIL,
    UPDATE_SLIDER,
    UPDATE_SLIDER_SUCCESS,
    UPDATE_SLIDER_FAIL,
    CHANGE_STATUS_SLIDER,
    CHANGE_STATUS_SLIDER_SUCCESS,
    CHANGE_STATUS_SLIDER_FAIL,
  } from './actionTypes';
  
  const INIT_STATE = {
    sliders: [],
    addingSlider: false,
    deletingSlider: false,
    addSliderResponse: {},
    updateSliderResponse: {},
    deleteSliderResponse: {},
    statusSliderResponse: {},
    sliderIdToBeDeleted: '',
    slider: {},
    error: {},
  };
  
  const Slider = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_SLIDERS:
        return {
          ...state,
          params: action.payload,
        };
  
      case GET_SLIDERS_SUCCESS:
        return {
          ...state,
          sliders: action.payload.data,
        };
  
      case GET_SLIDERS_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case ADD_SLIDER:
        return {
          ...state,
          addingSlider: true,
          slider: action.payload,
        };
  
      case ADD_SLIDER_SUCCESS:
        /*let newSliders = state.sliders.filter((slider) => {
            return slider;
           });*/
        let newSliders = [JSON.parse(JSON.stringify(action.payload.data[0]))];
        newSliders.push(...state.sliders);
        //console.log(...state.sliders);
        //console.log(JSON.parse(JSON.stringify(action.payload.data[0])));
        return {
          ...state,
          addingSlider: false,
          addSliderResponse: {
            type: 'success',
            message: 'Slider added successfully',
          },
          sliders: newSliders,
          error: {},
        };
  
      case ADD_SLIDER_FAIL:
        return {
          ...state,
          addingSlider: false,
          addSliderResponse: { type: 'failure', message: 'Adding slider failed' },
          error: action.payload,
        };
      case DELETE_SLIDER:
        return {
          ...state,
          deletingSlider: true,
          sliderIdToBeDeleted: action.payload,
        };
  
      case DELETE_SLIDER_SUCCESS:
        let newSliders2 = state.sliders.filter((slider) => {
          return slider.slider_id != state.sliderIdToBeDeleted;
        });
        return {
          ...state,
          deletingSlider: false,
          sliderIdToBeDeleted: '',
          deletingSlider: false,
          deleteSliderResponse: {
            type: 'success',
            message: 'Slider deleted successfully',
          },
          sliders: newSliders2,
        };
  
      case DELETE_SLIDER_FAIL:
        return {
          ...state,
          deletingSlider: false,
          deleteSliderResponse: {
            type: 'failure',
            message: 'Deleting Slider failed',
          },
          error: action.payload,
        };
  
      case UPDATE_SLIDER:
        return {
          ...state,
          updatingSlider: true,
          slider: action.payload,
        };
  
      case UPDATE_SLIDER_SUCCESS:
        let newsliderarr = [];
        let newSliders1 = state.sliders.filter((slider) => {
          if (slider.slider_id == state.slider.slider_id) {
            console.log(JSON.parse(JSON.stringify(action.payload.data[0])));
            newsliderarr.push(JSON.parse(JSON.stringify(action.payload.data[0])));
          } else {
            //console.log(slider);
            newsliderarr.push(slider);
          }
        });
  
        return {
          ...state,
          updatingSlider: false,
          slider: '',
          updatingSlider: false,
          updateSliderResponse: {
            type: 'success',
            message: 'Slider updated successfully',
          },
          sliders: newsliderarr,
        };
  
      case UPDATE_SLIDER_FAIL:
        return {
          ...state,
          updatingSlider: false,
          updateSliderResponse: {
            type: 'failure',
            message: 'Updating slider failed',
          },
          error: action.payload,
        };
        case CHANGE_STATUS_SLIDER:
            return {
              ...state,
              // deletingCategory: true,
              // categoryIdToBeDeleted: action.payload,
            };
      
          case CHANGE_STATUS_SLIDER_SUCCESS:
            /* let newCategories2 = state.categories.filter((category) => {
                return category.category_id != state.categoryIdToBeDeleted;
              });*/
            return {
              ...state,
              //deletingCategory: false,
              //categoryIdToBeDeleted: "",
              //deletingCategory: false,
              statusSliderResponse: {
                type: 'success',
                message: 'Status Changed successfully',
              },
              //categories: newCategories2,
            };
      
          case CHANGE_STATUS_SLIDER_FAIL:
            return {
              ...state,
              //deletingCategory: false,
              statusSliderResponse: {
                type: 'failure',
                message: 'Deleting Slider failed',
              },
              error: action.payload,
            };
      default:
        return state;
    }
  };
  
  export default Slider;
  