import {
    GET_COMMUNITYREQUESTS,
    GET_COMMUNITYREQUESTS_FAIL,
    GET_COMMUNITYREQUESTS_SUCCESS,
    ADD_COMMUNITYREQUEST,
    ADD_COMMUNITYREQUEST_FAIL,
    ADD_COMMUNITYREQUEST_SUCCESS,
    DELETE_COMMUNITYREQUEST,
    DELETE_COMMUNITYREQUEST_SUCCESS,
    DELETE_COMMUNITYREQUEST_FAIL,
    UPDATE_COMMUNITYREQUEST,
    UPDATE_COMMUNITYREQUEST_SUCCESS,
    UPDATE_COMMUNITYREQUEST_FAIL,
  } from './actionTypes';
  
  const INIT_STATE = {
    communityrequests: [],
    addingCommunityrequest: false,
    deletingCommunityrequest: false,
    addCommunityrequestResponse: {},
    updateCommunityrequestResponse: {},
    deleteCommunityrequestResponse: {},
    communityrequestIdToBeDeleted: '',
    communityrequest: {},
    error: {},
  };
  
  const Communityrequest = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_COMMUNITYREQUESTS:
        return {
          ...state,
          params: action.payload,
        };
  
      case GET_COMMUNITYREQUESTS_SUCCESS:
        return {
          ...state,
          communityrequests: action.payload.data,
        };
  
      case GET_COMMUNITYREQUESTS_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case ADD_COMMUNITYREQUEST:
        return {
          ...state,
          addingCommunityrequest: true,
          communityrequest: action.payload,
        };
  
      case ADD_COMMUNITYREQUEST_SUCCESS:
        /*let newUnits = state.units.filter((unit) => {
            return unit;
           });*/
        let newCommunityrequests = [JSON.parse(JSON.stringify(action.payload.data[0]))];
        newCommunityrequests.push(...state.communityrequests);
        //console.log(...state.units);
        //console.log(JSON.parse(JSON.stringify(action.payload.data[0])));
        return {
          ...state,
          addingCommunityrequest: false,
          addCommunityrequestResponse: {
            type: 'success',
            message: 'Unit added successfully',
          },
          communityrequests: newCommunityrequests,
          error: {},
        };
  
      case ADD_COMMUNITYREQUEST_FAIL:
        return {
          ...state,
          addingCommunityrequest: false,
          addCommunityrequestResponse: { type: 'failure', message: 'Adding unit failed' },
          error: action.payload,
        };
      
      case DELETE_COMMUNITYREQUEST:
        return {
          ...state,
          deletingCommunityrequest: true,
          communityrequestIdToBeDeleted: action.payload,
        };
  
      case DELETE_COMMUNITYREQUEST_SUCCESS:
        let newCommunityrequests2 = state.communityrequests.filter((communityrequest) => {
          return communityrequest.request_id != state.communityrequestIdToBeDeleted;
        });
        return {
          ...state,
          deletingCommunityrequest: false,
          communityrequestIdToBeDeleted: "",
          deletingCommunityrequest: false,
          deleteCommunityrequestResponse: {
            type: "success",
            message: "Category deleted successfully",
          },
          communityrequests: newCommunityrequests2,
        };
  
      case DELETE_COMMUNITYREQUEST_FAIL:
        return {
          ...state,
          deletingCommunityrequest: false,
          deleteCommunitycategoryResponse: {
            type: "failure",
            message: "Deleting category failed",
          },
          error: action.payload,
        };
  
      case UPDATE_COMMUNITYREQUEST:
        return {
          ...state,
          updatingCommunityrequest: true,
          communityrequest: action.payload,
        };
  
      case UPDATE_COMMUNITYREQUEST_SUCCESS:
        let newcommunityrequestarr = [];
        let newCommunityrequests1 = state.communityrequests.filter((communityrequest) => {
          if (communityrequest.request_id == state.Communityrequest.request_id) {
            console.log(JSON.parse(JSON.stringify(action.payload.data[0])));
            newcommunityrequestarr.push(JSON.parse(JSON.stringify(action.payload.data[0])));
          } else {
            //console.log(unit);
            newcommunityrequestarr.push(communityrequest);
          }
        });
  
        return {
          ...state,
          updatingCommunityrequest: false,
          Communityrequest: '',
          updatingCommunityrequest: false,
          updateCommunityrequestResponse: {
            type: 'success',
            message: 'Unit updated successfully',
          },
          communityrequests: newcommunityrequestarr,
        };
  
      case UPDATE_COMMUNITYREQUEST_FAIL:
        return {
          ...state,
          updatingCommunityrequest: false,
          updateCommunityrequestResponse: {
            type: 'failure',
            message: 'Updating unit failed',
          },
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default Communityrequest;
  