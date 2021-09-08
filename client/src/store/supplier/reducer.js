import {
    GET_SUPPLIERS,
    GET_SUPPLIERS_FAIL,
    GET_SUPPLIERS_SUCCESS,
    ADD_SUPPLIER,
    ADD_SUPPLIER_FAIL,
    ADD_SUPPLIER_SUCCESS,
    DELETE_SUPPLIER,
    DELETE_SUPPLIER_SUCCESS,
    DELETE_SUPPLIER_FAIL,
    UPDATE_SUPPLIER,
    UPDATE_SUPPLIER_SUCCESS,
    UPDATE_SUPPLIER_FAIL,
  } from './actionTypes';
  
  const INIT_STATE = {
    suppliers: [],
    addingSupplier: false,
    deletingSupplier: false,
    addSupplierResponse: {},
    updateSupplierResponse: {},
    deleteSupplierResponse: {},
    supplierIdToBeDeleted: '',
    supplier: {},
    error: {},
  };
  
  const Supplier = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_SUPPLIERS:
        return {
          ...state,
          params: action.payload,
        };
  
      case GET_SUPPLIERS_SUCCESS:
        return {
          ...state,
          suppliers: action.payload.data,
        };
  
      case GET_SUPPLIERS_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case ADD_SUPPLIER:
        return {
          ...state,
          addingSupplier: true,
          supplier: action.payload,
        };
  
      case ADD_SUPPLIER_SUCCESS:
        /*let newSuppliers = state.suppliers.filter((supplier) => {
            return supplier;
           });*/
        let newSuppliers = [JSON.parse(JSON.stringify(action.payload.data[0]))];
        newSuppliers.push(...state.suppliers);
        //console.log(...state.suppliers);
        //console.log(JSON.parse(JSON.stringify(action.payload.data[0])));
        return {
          ...state,
          addingSupplier: false,
          addSupplierResponse: {
            type: 'success',
            message: 'Supplier added successfully',
          },
          suppliers: newSuppliers,
          error: {},
        };
  
      case ADD_SUPPLIER_FAIL:
        return {
          ...state,
          addingSupplier: false,
          addSupplierResponse: { type: 'failure', message: 'Adding supplier failed' },
          error: action.payload,
        };
      case DELETE_SUPPLIER:
        return {
          ...state,
          deletingSupplier: true,
          supplierIdToBeDeleted: action.payload,
        };
  
      case DELETE_SUPPLIER_SUCCESS:
        let newSuppliers2 = state.suppliers.filter((supplier) => {
          return supplier.supplier_id != state.supplierIdToBeDeleted;
        });
        return {
          ...state,
          deletingSupplier: false,
          supplierIdToBeDeleted: '',
          deletingSupplier: false,
          deleteSupplierResponse: {
            type: 'success',
            message: 'Supplier deleted successfully',
          },
          suppliers: newSuppliers2,
        };
  
      case DELETE_SUPPLIER_FAIL:
        return {
          ...state,
          deletingSupplier: false,
          deleteSupplierResponse: {
            type: 'failure',
            message: 'Deleting Supplier failed',
          },
          error: action.payload,
        };
  
      case UPDATE_SUPPLIER:
        return {
          ...state,
          updatingSupplier: true,
          supplier: action.payload,
        };
  
      case UPDATE_SUPPLIER_SUCCESS:
        let newsupplierarr = [];
        let newSuppliers1 = state.suppliers.filter((supplier) => {
          if (supplier.supplier_id == state.supplier.supplier_id) {
            console.log(JSON.parse(JSON.stringify(action.payload.data[0])));
            newsupplierarr.push(JSON.parse(JSON.stringify(action.payload.data[0])));
          } else {
            //console.log(supplier);
            newsupplierarr.push(supplier);
          }
        });
  
        return {
          ...state,
          updatingSupplier: false,
          supplier: '',
          updatingSupplier: false,
          updateSupplierResponse: {
            type: 'success',
            message: 'Supplier updated successfully',
          },
          suppliers: newsupplierarr,
        };
  
      case UPDATE_SUPPLIER_FAIL:
        return {
          ...state,
          updatingSupplier: false,
          updateSupplierResponse: {
            type: 'failure',
            message: 'Updating supplier failed',
          },
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default Supplier;