import axios from "axios";
import { post, del, get, put } from "./api_helper";
import * as url from "./url_helper";

// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Login Method
const login = (data) => post(url.POST_LOGIN, data);

// postForgetPwd
// const postJwtForgetPwd = (data) =>
//   post(url.POST_FAKE_JWT_PASSWORD_FORGET, data);

// get Product detail
// export const getProductDetail = (id) =>
//   get(`${url.GET_PRODUCTS_DETAIL}/${id}`, { params: { id } });

export const getUserProfile = () => get(url.GET_USER_PROFILE);

// get users
export const getUsers = () => get(url.GET_USERS);

// add user
export const addUser = (user) => post(url.ADD_USER, user);
export const getUser = (userId) => get(url.GET_USER, userId);
// export const updateUser = (user) => put(url.UPDATE_USER, user);
export const updateUser = (user) => put(url.UPDATE_USER+"/"+user.id, user);
export const deleteUser = (userId) => del(url.DELETE_USER, userId);

// add unit
export const addUnit = (unit) => post(url.ADD_UNIT, unit);
export const getUnits = () => get(url.GET_UNITS);
export const getUnit = (unitId) => get(url.GET_UNIT, unitId);
export const updateUnit = (unit) => put(url.UPDATE_UNIT+"/"+unit.unit_id, unit);
export const deleteUnit = (unitId,auth_user) => del(url.DELETE_UNIT+"/"+auth_user, unitId);


// add category
export const addCategory = (category) => post(url.ADD_CATEGORY, category);
export const getCategories = () => get(url.GET_CATEGORIES);
export const getCategory = (categoryId) => get(url.GET_CATEGORY, categoryId);
export const updateCategory = (category) => put(url.UPDATE_CATEGORY+"/"+category.category_id, category);
export const deleteCategory = (categoryId,auth_user) => del(url.DELETE_CATEGORY+"/"+auth_user, categoryId);
export const toggleActiveStatus = (categoryId, auth_user) =>
  del(url.CHANGE_STATUS_CATEGORY + '/' + auth_user, categoryId);

  //add subcategory
  export const addSubcategory = (subcategory) => post(url.ADD_SUBCATEGORY, subcategory);
  export const getSubcategories = () => get(url.GET_SUBCATEGORIES);
  export const getSubcategory = (subcategoryId) => get(url.GET_SUBCATEGORY, subcategoryId);
  export const updateSubcategory = (subcategory) => put(url.UPDATE_SUBCATEGORY+"/"+subcategory.subcategory_id, subcategory);
  export const deleteSubcategory = (subcategoryId,auth_user) => del(url.DELETE_SUBCATEGORY+"/"+auth_user, subcategoryId);
  export const toggleActiveStatus1 = (subcategoryId, auth_user) =>
    del(url.CHANGE_STATUS_SUBCATEGORY + '/' + auth_user, subcategoryId);


    //thirdcategory

  export const addThirdcategory = (thirdcategory) => post(url.ADD_THIRDCATEGORY, thirdcategory); 
  export const getThirdcategories = () => get(url.GET_THIRDCATEGORIES);
  export const getThirdcategory = (thirdcategoryId) => get(url.GET_THIRDCATEGORY, thirdcategoryId);
  export const updateThirdcategory = (thirdcategory) => put(url.UPDATE_THIRDCATEGORY+"/"+thirdcategory.thirdcategory_id, thirdcategory);
  export const deleteThirdcategory = (thirdcategoryId,auth_user) => del(url.DELETE_THIRDCATEGORY+"/"+auth_user, thirdcategoryId);
  export const toggleActiveStatus2 = (thirdcategoryId, auth_user) =>
    del(url.CHANGE_STATUS_THIRDCATEGORY + '/' + auth_user, thirdcategoryId); 

// add communityrequest
export const addCommunityrequest = (communityrequest) => post(url.ADD_COMMUNITYREQUEST, communityrequest);
export const getCommunityrequests = () => get(url.GET_COMMUNITYREQUESTS);
export const getCommunityrequest = (communityrequestId) => get(url.GET_COMMUNITYREQUEST, communityrequestId);
export const updateCommunityrequest = (communityrequest) => put(url.UPDATE_COMMUNITYREQUEST+"/"+communityrequest.request_id, communityrequest);
export const deleteCommunityrequest = (communityrequestId,auth_user) => del(url.DELETE_COMMUNITYREQUEST+"/"+auth_user, communityrequestId);

// add stock
export const addStock = (stock) => post(url.ADD_STOCK, stock);
export const getStocks = () => get(url.GET_STOCKS);
export const getStock = (stockId) => get(url.GET_STOCK, stockId);
export const updateStock = (stock) => put(url.UPDATE_STOCK+"/"+stock.stock_id, stock);
export const deleteStock = (stockId,auth_user) => del(url.DELETE_STOCK+"/"+auth_user, stockId);

//stocklog
export const GET_STOCKLOGS = '/stocklog';
export const ADD_STOCKLOG = '/stocklog';
export const GET_STOCKLOG = '/stocklog';
export const UPDATE_STOCKLOG = '/stocklog';
export const DELETE_STOCKLOG = '/stocklog';

//order
export const addOrder = (order) => post(url.ADD_ORDER, order);
export const getOrders = () => get(url.GET_ORDERS);
export const getOrder = (orderId) => get(url.GET_ORDER, orderId);
export const updateOrder = (order) => put(url.UPDATE_ORDER+"/"+order.order_id, order);
export const deleteOrder = (orderId,auth_user) => del(url.DELETE_ORDER+"/"+auth_user, orderId);
export const deliverOrder = (o_id, auth_user) =>
  del(url.DELIVER_ORDER + '/' + auth_user, o_id);
export const outofdeliverOrder = (o_id, auth_user) =>
  del(url.OUTOF_DELIVER_ORDER + '/' + auth_user, o_id);

  // customer
export const addCustomer = (customer) => post(url.ADD_CUSTOMER, customer);
export const getCustomers = () => get(url.GET_CUSTOMERS);
export const getCustomer = (customerId) => get(url.GET_CUSTOMER, customerId);
export const updateCustomer = (customer) => put(url.UPDATE_CUSTOMER+"/"+customer.customer_id, customer);
export const deleteCustomer = (customerId,auth_user) => del(url.DELETE_CUSTOMER+"/"+auth_user, customerId);

//stocklogs
export const addStocklog = (stocklog) => post(url.ADD_STOCKLOG, stocklog);
export const getStocklogs = () => get(url.GET_STOCKLOGS);
export const getStocklog = (stocklogId) => get(url.GET_STOCKLOG, stocklogId);
export const updateStocklog = (stocklog) => put(url.UPDATE_STOCKLOG+"/"+stocklog.stock_log_id, stocklog);
export const deleteStocklog = (stocklogId,auth_user) => del(url.DELETE_STOCKLOG+"/"+auth_user, stocklogId);

// get privilages options
export const getPrivilagesOptions = () => get(url.GET_PRIVILAGES_OPTIONS);
export const getCustomerOptions = () => get(url.GET_CUSTOMER_OPTIONS);
// get companies options
export const getCompaniesOptions = () => get(url.GET_COMPANIES_OPTIONS);
// get menu options
export const getMenusOptions = () => get(url.GET_Menu_OPTIONS);
export const getStatesOptions = () => get(url.GET_STATES_OPTIONS);
// get Branches options
export const getBranchesOptions = (companyId) =>
  get(url.GET_BRANCHES_OPTIONS + "/" + companyId);
  export const getCategoryOptions = () => get(url.GET_CATEGORY_OPTIONS);
  export const getSubcategoryOptions = () => get(url.GET_SUBCATEGORY_OPTIONS);
  export const getThirdcategoriesOptions = () => get(url.GET_THIRDCATEGORIES_OPTIONS);
export { getLoggedInUser, isUserAuthenticated, login };



export const addSlider = (slider) => post(url.ADD_SLIDER, slider); 
export const getSliders = () => get(url.GET_SLIDERS);
export const getSlider = (sliderId) => get(url.GET_SLIDER, sliderId);
export const updateSlider = (slider) => put(url.UPDATE_SLIDER+"/"+slider.slider_id, slider);
export const deleteSlider = (sliderId,auth_user) => del(url.DELETE_SLIDER+"/"+auth_user, sliderId);
export const toggleActiveStatus3 = (sliderId,auth_user) => del(url.CHANGE_STATUS_SLIDER+"/"+auth_user, sliderId);

export const addSupplier = (supplier) => post(url.ADD_SUPPLIER, supplier);
export const getSuppliers = () => get(url.GET_SUPPLIERS);
export const getSupplier = (supplierId) => get(url.GET_SUPPLIER, supplierId);
export const updateSupplier = (supplier) =>
  put(url.UPDATE_SUPPLIER + '/' + supplier.supplier_id, supplier);
export const deleteSupplier = (supplierId, auth_user) =>
  del(url.DELETE_SUPPLIER + '/' + auth_user, supplierId);