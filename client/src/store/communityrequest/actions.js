import {
    GET_COMMUNITYREQUESTS,
    GET_COMMUNITYREQUESTS_FAIL,
    GET_COMMUNITYREQUESTS_SUCCESS,
    ADD_COMMUNITYREQUEST,
    ADD_COMMUNITYREQUEST_FAIL,
    ADD_COMMUNITYREQUEST_SUCCESS,
    GET_COMMUNITYREQUEST,
    GET_COMMUNITYREQUEST_FAIL,
    GET_COMMUNITYREQUEST_SUCCESS,
    UPDATE_COMMUNITYREQUEST,
    UPDATE_COMMUNITYREQUEST_FAIL,
    UPDATE_COMMUNITYREQUEST_SUCCESS,
    DELETE_COMMUNITYREQUEST,
    DELETE_COMMUNITYREQUEST_FAIL,
    DELETE_COMMUNITYREQUEST_SUCCESS,
  } from './actionTypes';
  
  export const getCommunityrequests = () => ({
    type: GET_COMMUNITYREQUESTS,
  });
  
  export const getCommunityrequestsSuccess = (communityrequest) => ({
    type: GET_COMMUNITYREQUESTS_SUCCESS,
    payload: communityrequest,
  });
  
  export const getCommunityrequestsFail = (error) => ({
    type: GET_COMMUNITYREQUESTS_FAIL,
    payload: error,
  });
  
  export const addCommunityrequest = (communityrequest) => ({
    type: ADD_COMMUNITYREQUEST,
    payload: communityrequest,
  });
  
  export const addCommunityrequestSuccess = (communityrequest) => ({
    type: ADD_COMMUNITYREQUEST_SUCCESS,
    payload: communityrequest,
  });
  
  export const addCommunityrequestFail = (error) => ({
    type: ADD_COMMUNITYREQUEST_FAIL,
    payload: error,
  });
  
  export const getCommunityrequest = (communityrequest) => ({
    type: GET_COMMUNITYREQUEST,
    payload: communityrequest,
  });
  
  export const getCommunityrequestSuccess = (communityrequest) => ({
    type: GET_COMMUNITYREQUEST_SUCCESS,
    payload: communityrequest,
  });
  
  export const getCommunityrequestFail = (error) => ({
    type: GET_COMMUNITYREQUEST_FAIL,
    payload: error,
  });
  
  export const updateCommunityrequest = (communityrequest) => ({
    type: UPDATE_COMMUNITYREQUEST,
    payload: communityrequest,
  });
  
  export const updateCommunityrequestSuccess = (communityrequest) => ({
    type: UPDATE_COMMUNITYREQUEST_SUCCESS,
    payload: communityrequest,
  });
  
  export const updateCommunityrequestFail = (error) => ({
    type: UPDATE_COMMUNITYREQUEST_FAIL,
    payload: error,
  });
  
  export const deleteCommunityrequest = (communityrequest, auth_user) => ({
    type: DELETE_COMMUNITYREQUEST,
    payload: communityrequest,
    auth_data: auth_user,
  });
  
  export const deleteCommunityrequestSuccess = (communityrequest) => ({
    type: DELETE_COMMUNITYREQUEST_SUCCESS,
    payload: communityrequest,
  });
  
  export const deleteCommunityrequestFail = (error) => ({
    type: DELETE_COMMUNITYREQUEST_FAIL,
    payload: error,
  });