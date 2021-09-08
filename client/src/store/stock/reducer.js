import {
    GET_STOCKS,
    GET_STOCKS_FAIL,
    GET_STOCKS_SUCCESS,
    ADD_STOCK,
    ADD_STOCK_FAIL,
    ADD_STOCK_SUCCESS,
    DELETE_STOCK,
    DELETE_STOCK_SUCCESS,
    DELETE_STOCK_FAIL,
    UPDATE_STOCK,
    UPDATE_STOCK_SUCCESS,
    UPDATE_STOCK_FAIL,
  } from './actionTypes';
  
  const INIT_STATE = {
    stocks: [],
    addingStock: false,
    deletingStock: false,
    addStockResponse: {},
    updateStockResponse: {},
    deleteStockResponse: {},
    stockIdToBeDeleted: '',
    stock: {},
    error: {},
  };
  
  const Stock = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_STOCKS:
        return {
          ...state,
          params: action.payload,
        };
  
      case GET_STOCKS_SUCCESS:
        return {
          ...state,
          stocks: action.payload.data,
        };
  
      case GET_STOCKS_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case ADD_STOCK:
        return {
          ...state,
          addingStock: true,
          stock: action.payload,
        };
  
      case ADD_STOCK_SUCCESS:
        /*let newStocks = state.stocks.filter((stock) => {
            return stock;
           });*/
        let newStocks = [JSON.parse(JSON.stringify(action.payload.data[0]))];
        newStocks.push(...state.stocks);
        //console.log(...state.stocks);
        //console.log(JSON.parse(JSON.stringify(action.payload.data[0])));
        return {
          ...state,
          addingStock: false,
          addStockResponse: {
            type: 'success',
            message: 'Stock added successfully',
          },
          stocks: newStocks,
          error: {},
        };
  
      case ADD_STOCK_FAIL:
        return {
          ...state,
          addingStock: false,
          addStockResponse: { type: 'failure', message: 'Adding stock failed' },
          error: action.payload,
        };
      case DELETE_STOCK:
        return {
          ...state,
          deletingStock: true,
          stockIdToBeDeleted: action.payload,
        };
  
      case DELETE_STOCK_SUCCESS:
        let newStocks2 = state.stocks.filter((stock) => {
          return stock.stock_id != state.stockIdToBeDeleted;
        });
        return {
          ...state,
          deletingStock: false,
          stockIdToBeDeleted: '',
          deletingStock: false,
          deleteStockResponse: {
            type: 'success',
            message: 'Stock deleted successfully',
          },
          stocks: newStocks2,
        };
  
      case DELETE_STOCK_FAIL:
        return {
          ...state,
          deletingStock: false,
          deleteStockResponse: {
            type: 'failure',
            message: 'Deleting Stock failed',
          },
          error: action.payload,
        };
  
      case UPDATE_STOCK:
        return {
          ...state,
          updatingStock: true,
          stock: action.payload,
        };
  
      case UPDATE_STOCK_SUCCESS:
        let newstockarr = [];
        let newStocks1 = state.stocks.filter((stock) => {
          if (stock.stock_id == state.stock.stock_id) {
            console.log(JSON.parse(JSON.stringify(action.payload.data[0])));
            newstockarr.push(JSON.parse(JSON.stringify(action.payload.data[0])));
          } else {
            //console.log(stock);
            newstockarr.push(stock);
          }
        });
  
        return {
          ...state,
          updatingStock: false,
          stock: '',
          updatingStock: false,
          updateStockResponse: {
            type: 'success',
            message: 'Stock updated successfully',
          },
          stocks: newstockarr,
        };
  
      case UPDATE_STOCK_FAIL:
        return {
          ...state,
          updatingStock: false,
          updateStockResponse: {
            type: 'failure',
            message: 'Updating stock failed',
          },
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default Stock;
  