import {
    GET_CUSTOMERS,
    GET_CUSTOMERS_FAIL,
    GET_CUSTOMERS_SUCCESS,
    ADD_CUSTOMER,
    ADD_CUSTOMER_FAIL,
    ADD_CUSTOMER_SUCCESS,
    DELETE_CUSTOMER,
    DELETE_CUSTOMER_SUCCESS,
    DELETE_CUSTOMER_FAIL,
    UPDATE_CUSTOMER,
    UPDATE_CUSTOMER_SUCCESS,
    UPDATE_CUSTOMER_FAIL,
    GET_CUSTOMER_OPTIONS_SUCCESS,
    GET_CUSTOMER_OPTIONS_FAIL
  } from './actionTypes';
  
  const INIT_STATE = {
    customers: [],
    customerOptions: [],
    addingCustomer: false,
    deletingCustomer: false,
    addCustomerResponse: {},
    updateCustomerResponse: {},
    deleteCustomerResponse: {},
    customerIdToBeDeleted: '',
    customer: {},
    error: {},
  };
  
  const Customer = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_CUSTOMERS:
        return {
          ...state,
          params: action.payload,
        };
  
      case GET_CUSTOMERS_SUCCESS:
        return {
          ...state,
          customers: action.payload.data,
        };
  
      case GET_CUSTOMERS_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case ADD_CUSTOMER:
        return {
          ...state,
          addingCustomer: true,
          customer: action.payload,
        };
  
      case ADD_CUSTOMER_SUCCESS:
        /*let newCustomers = state.customers.filter((customer) => {
            return customer;
           });*/
        let newCustomers = [JSON.parse(JSON.stringify(action.payload.data[0]))];
        newCustomers.push(...state.customers);
        //console.log(...state.customers);
        //console.log(JSON.parse(JSON.stringify(action.payload.data[0])));
        return {
          ...state,
          addingCustomer: false,
          addCustomerResponse: {
            type: 'success',
            message: 'Customer added successfully',
          },
          customers: newCustomers,
          error: {},
        };
  
      case ADD_CUSTOMER_FAIL:
        return {
          ...state,
          addingCustomer: false,
          addCustomerResponse: { type: 'failure', message: 'Adding customer failed' },
          error: action.payload,
        };
      case DELETE_CUSTOMER:
        return {
          ...state,
          deletingCustomer: true,
          customerIdToBeDeleted: action.payload,
        };
  
      case DELETE_CUSTOMER_SUCCESS:
        let newCustomers2 = state.customers.filter((customer) => {
          return customer.customer_id != state.customerIdToBeDeleted;
        });
        return {
          ...state,
          deletingCustomer: false,
          customerIdToBeDeleted: '',
          deletingCustomer: false,
          deleteCustomerResponse: {
            type: 'success',
            message: 'Customer deleted successfully',
          },
          customers: newCustomers2,
        };
  
      case DELETE_CUSTOMER_FAIL:
        return {
          ...state,
          deletingCustomer: false,
          deleteCustomerResponse: {
            type: 'failure',
            message: 'Deleting Customer failed',
          },
          error: action.payload,
        };
  
      case UPDATE_CUSTOMER:
        return {
          ...state,
          updatingCustomer: true,
          customer: action.payload,
        };
  
      case UPDATE_CUSTOMER_SUCCESS:
        let newcustomerarr = [];
        let newCustomers1 = state.customers.filter((customer) => {
          if (customer.customer_id == state.customer.customer_id) {
            console.log(JSON.parse(JSON.stringify(action.payload.data[0])));
            newcustomerarr.push(JSON.parse(JSON.stringify(action.payload.data[0])));
          } else {
            //console.log(customer);
            newcustomerarr.push(customer);
          }
        });
  
        return {
          ...state,
          updatingCustomer: false,
          customer: '',
          updatingCustomer: false,
          updateCustomerResponse: {
            type: 'success',
            message: 'Customer updated successfully',
          },
          customers: newcustomerarr,
        };
  
      case UPDATE_CUSTOMER_FAIL:
        return {
          ...state,
          updatingCustomer: false,
          updateCustomerResponse: {
            type: 'failure',
            message: 'Updating customer failed',
          },
          error: action.payload,
        };
  
  
  
      // case UPDATE_CUSTOMER_SUCCESS:
      //   let newcustomerarr = [];
      //   let newcustomer1 = state.customers.filter((customer) => {
      //     if (customer.customer_id == state.customers.customer_id) {
      //       console.log(JSON.parse(JSON.stringify(action.payload.data[0])));
      //       newcustomerarr.push(JSON.parse(JSON.stringify(action.payload.data[0])));
      //     } else {
      //       //console.log(unit);
      //       newcustomerarr.push(customer);
      //     }
      //   });
  
      //   return {
      //     ...state,
      //     updatingCustomer: false,
      //     customer: '',
      //     updatingCustomer: false,
      //     updateCustomerResponse: {
      //       type: 'success',
      //       message: 'customer updated successfully',
      //     },
      //     customers: newcustomerarr,
      //   };
  
      // case UPDATE_CUSTOMER_FAIL:
      //   return {
      //     ...state,
      //     updatingCustomer: false,
      //     updateCustomerResponse: {
      //       type: 'failure',
      //       message: 'Updating customer failed',
      //     },
      //     error: action.payload,
      //   };
  
      
  
  
  
  
        case GET_CUSTOMER_OPTIONS_SUCCESS:
          return {
            ...state,
            customerOptions: action.payload,
          };
    
        case GET_CUSTOMER_OPTIONS_FAIL:
          return {
            ...state,
            error: action.payload,
          };
  
      default:
        return state;
    }
  };
  
  export default Customer;
  