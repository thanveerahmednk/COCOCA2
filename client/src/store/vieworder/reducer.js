import {
    GET_ORDERS,
    GET_ORDERS_FAIL,
    GET_ORDERS_SUCCESS,
    ADD_ORDER,
    ADD_ORDER_FAIL,
    ADD_ORDER_SUCCESS,
    DELETE_ORDER,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    UPDATE_ORDER,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    DELIVER_ORDER,
    DELIVER_ORDER_SUCCESS,
    DELIVER_ORDER_FAIL,
    OUTOF_DELIVER_ORDER,
    OUTOF_DELIVER_ORDER_SUCCESS,
    OUTOF_DELIVER_ORDER_FAIL
  } from './actionTypes';
  
  const INIT_STATE = {
    orders: [],
    addingOrder: false,
    deletingOrder: false,
    addOrderResponse: {},
    updateOrderResponse: {},
    deleteOrderResponse: {},
    deliverOrderResponse:{},
    orderIdToBeDeleted: '',
    order: {},
    error: {},
  };
  
  const Order = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_ORDERS:
        return {
          ...state,
          params: action.payload,
        };
  
      case GET_ORDERS_SUCCESS:
        return {
          ...state,
          orders: action.payload.data,
        };
  
      case GET_ORDERS_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case ADD_ORDER:
        return {
          ...state,
          addingOrder: true,
          order: action.payload,
        };
  
      case ADD_ORDER_SUCCESS:
        /*let newOrders = state.orders.filter((order) => {
            return order;
           });*/
        let newOrders = [JSON.parse(JSON.stringify(action.payload.data[0]))];
        newOrders.push(...state.orders);
        //console.log(...state.orders);
        //console.log(JSON.parse(JSON.stringify(action.payload.data[0])));
        return {
          ...state,
          addingOrder: false,
          addOrderResponse: {
            type: 'success',
            message: 'Order added successfully',
          },
          orders: newOrders,
          error: {},
        };
  
      case ADD_ORDER_FAIL:
        return {
          ...state,
          addingOrder: false,
          addOrderResponse: { type: 'failure', message: 'Adding order failed' },
          error: action.payload,
        };
      case DELETE_ORDER:
        return {
          ...state,
          deletingOrder: true,
          orderIdToBeDeleted: action.payload,
        };
  
      case DELETE_ORDER_SUCCESS:
        let newOrders2 = state.orders.filter((order) => {
          return order.o_id != state.orderIdToBeDeleted;
        });
        return {
          ...state,
          deletingOrder: false,
          orderIdToBeDeleted: '',
          deletingOrder: false,
          deleteOrderResponse: {
            type: 'success',
            message: 'Order deleted successfully',
          },
          orders: newOrders2,
        };
  
      case DELETE_ORDER_FAIL:
        return {
          ...state,
          deletingOrder: false,
          deleteOrderResponse: {
            type: 'failure',
            message: 'Deleting Order failed',
          },
          error: action.payload,
        };
  
      case UPDATE_ORDER:
        return {
          ...state,
          updatingOrder: true,
          order: action.payload,
        };
  
      case UPDATE_ORDER_SUCCESS:
        let neworderarr = [];
        let newOrders1 = state.orders.filter((order) => {
          if (order.order_id == state.order.order_id) {
            console.log(JSON.parse(JSON.stringify(action.payload.data[0])));
            neworderarr.push(JSON.parse(JSON.stringify(action.payload.data[0])));
          } else {
            //console.log(order);
            neworderarr.push(order);
          }
        });
  
        return {
          ...state,
          updatingOrder: false,
          order: '',
          updatingOrder: false,
          updateOrderResponse: {
            type: 'success',
            message: 'Order updated successfully',
          },
          orders: neworderarr,
        };
  
      case UPDATE_ORDER_FAIL:
        return {
          ...state,
          updatingOrder: false,
          updateOrderResponse: {
            type: 'failure',
            message: 'Updating order failed',
          },
          error: action.payload,
        };
  
        case DELIVER_ORDER:
          return {
            ...state,
          };
    
        case DELIVER_ORDER_SUCCESS:
          return {
            ...state,
            deliverOrderResponse: {
              type: 'success',
              message: 'Delivered successfully',
            },
          };
    
        case DELIVER_ORDER_FAIL:
          return {
            ...state,
            deliverOrderResponse: {
              type: 'failure',
              message: 'Failed',
            },
            error: action.payload,
          };
    
          case OUTOF_DELIVER_ORDER:
            return {
              ...state,
            };
      
          case OUTOF_DELIVER_ORDER_SUCCESS:
            return {
              ...state,
              deliverOrderResponse: {
                type: 'success',
                message: 'Out of delivered successfully',
              },
            };
      
          case OUTOF_DELIVER_ORDER_FAIL:
            return {
              ...state,
              deliverOrderResponse: {
                type: 'failure',
                message: 'Failed',
              },
              error: action.payload,
            };
      default:
        return state;
    }
  };
  
  export default Order;
  