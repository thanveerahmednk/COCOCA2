import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";
import categories from "./category/reducer";
import users from "./users/reducer";
import privilages from "./privilages/reducer";
import companies from "./companies/reducer";
import branches from "./branches/reducer";
import Menus from './menu/reducer';
import units from './unit/reducer';
import communityrequests from './communityrequest/reducer';
import subcategories from './subcategory/reducer';
import thirdcategories from './thirdcategory/reducer';
import sliders from './slider/reducer';
import suppliers from './supplier/reducer';
import states from './states/reducer';
import stocks from './stock/reducer';
import stocklogs from './stocklog/reducer';
import orders from './vieworder/reducer';
import customers from './customer/reducer';
// import categories from './category/reducer';

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  users,
  Menus,
  privilages,
  companies,
  branches,
  units,
  communityrequests,
  categories,
  subcategories,
  thirdcategories,
  sliders,
  suppliers,
  states,
  stocks,
  stocklogs,
  orders,
  customers,
});

export default rootReducer;
