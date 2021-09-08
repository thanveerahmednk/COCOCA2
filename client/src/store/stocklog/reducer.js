import {
    GET_STOCKLOGS,
    GET_STOCKLOGS_FAIL,
    GET_STOCKLOGS_SUCCESS,
    ADD_STOCKLOG,
    ADD_STOCKLOG_FAIL,
    ADD_STOCKLOG_SUCCESS,
    DELETE_STOCKLOG,
    DELETE_STOCKLOG_SUCCESS,
    DELETE_STOCKLOG_FAIL,
    UPDATE_STOCKLOG,
    UPDATE_STOCKLOG_SUCCESS,
    UPDATE_STOCKLOG_FAIL,
  } from './actionTypes';
  
  const INIT_STATE = {
    stocklogs: [],
    addingStocklog: false,
    deletingStocklog: false,
    addStocklogResponse: {},
    updateStocklogResponse: {},
    deleteStocklogResponse: {},
    stocklogIdToBeDeleted: '',
    stocklog: {},
    error: {},
  };
  
  const Stocklog = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_STOCKLOGS:
        return {
          ...state,
          params: action.payload,
        };
  
      case GET_STOCKLOGS_SUCCESS:
        return {
          ...state,
          stocklogs: action.payload.data,
        };
  
      case GET_STOCKLOGS_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case ADD_STOCKLOG:
        return {
          ...state,
          addingStocklog: true,
          stocklog: action.payload,
        };
  
      case ADD_STOCKLOG_SUCCESS:
        /*let newStocklogs = state.stocklogs.filter((stocklog) => {
            return stocklog;
           });*/
        let newStocklogs = [JSON.parse(JSON.stringify(action.payload.data[0]))];
        newStocklogs.push(...state.stocklogs);
        //console.log(...state.stocklogs);
        //console.log(JSON.parse(JSON.stringify(action.payload.data[0])));
        return {
          ...state,
          addingStocklog: false,
          addStocklogResponse: {
            type: 'success',
            message: 'Stocklog added successfully',
          },
          stocklogs: newStocklogs,
          error: {},
        };
  
      case ADD_STOCKLOG_FAIL:
        return {
          ...state,
          addingStocklog: false,
          addStocklogResponse: { type: 'failure', message: 'Adding stocklog failed' },
          error: action.payload,
        };
      case DELETE_STOCKLOG:
        return {
          ...state,
          deletingStocklog: true,
          stocklogIdToBeDeleted: action.payload,
        };
  
      case DELETE_STOCKLOG_SUCCESS:
        let newStocklogs2 = state.stocklogs.filter((stocklog) => {
          return stocklog.stocklog_id != state.stocklogIdToBeDeleted;
        });
        return {
          ...state,
          deletingStocklog: false,
          stocklogIdToBeDeleted: '',
          deletingStocklog: false,
          deleteStocklogResponse: {
            type: 'success',
            message: 'Stocklog deleted successfully',
          },
          stocklogs: newStocklogs2,
        };
  
      case DELETE_STOCKLOG_FAIL:
        return {
          ...state,
          deletingStocklog: false,
          deleteStocklogResponse: {
            type: 'failure',
            message: 'Deleting Stocklog failed',
          },
          error: action.payload,
        };
  
      case UPDATE_STOCKLOG:
        return {
          ...state,
          updatingStocklog: true,
          stocklog: action.payload,
        };
  
      case UPDATE_STOCKLOG_SUCCESS:
        let newstocklogarr = [];
        let newStocklogs1 = state.stocklogs.filter((stocklog) => {
          if (stocklog.stocklog_id == state.stocklog.stocklog_id) {
            console.log(JSON.parse(JSON.stringify(action.payload.data[0])));
            newstocklogarr.push(JSON.parse(JSON.stringify(action.payload.data[0])));
          } else {
            //console.log(stocklog);
            newstocklogarr.push(stocklog);
          }
        });
  
        return {
          ...state,
          updatingStocklog: false,
          stocklog: '',
          updatingStocklog: false,
          updateStocklogResponse: {
            type: 'success',
            message: 'Stocklog updated successfully',
          },
          stocklogs: newstocklogarr,
        };
  
      case UPDATE_STOCKLOG_FAIL:
        return {
          ...state,
          updatingStocklog: false,
          updateStocklogResponse: {
            type: 'failure',
            message: 'Updating stocklog failed',
          },
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default Stocklog;
  