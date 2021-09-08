import { all, fork } from "redux-saga/effects";

//public
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import ProfileSaga from "./auth/profile/saga";
import LayoutSaga from "./layout/saga";
import userSaga from "./users/saga";
import privilagesSaga from "./privilages/saga";
import companiesSaga from "./companies/saga";
import branchesSaga from "./branches/saga";
import menuSaga from './menu/saga';
import unitSaga from './unit/saga';
import communityrequestSaga from './communityrequest/saga';
import categorySaga from './category/saga';
import subcategorySaga from './subcategory/saga';
import thirdcategorySaga from "./thirdcategory/saga";
import sliderSaga from "./slider/saga";
import supplierSaga from "./supplier/saga";
import statesSaga from './states/saga';
import stockSaga from './stock/saga';
import stocklogSaga from './stocklog/saga';
import orderSaga from './vieworder/saga';
import customerSaga from "./customer/saga";
export default function* rootSaga() {
  yield all([
    //public
    AccountSaga(),
    fork(AuthSaga),
    ProfileSaga(),
    ForgetSaga(),
    fork(LayoutSaga),
    fork(userSaga),
    fork(privilagesSaga),
    fork(companiesSaga),
    fork(branchesSaga),
    fork(menuSaga),
    fork(unitSaga),
    fork(communityrequestSaga),
    fork(categorySaga),
    fork(subcategorySaga),
    fork(thirdcategorySaga),
    fork(sliderSaga),
    fork(supplierSaga),
    fork(statesSaga),
    fork(stockSaga),
    fork(stocklogSaga),
    fork(orderSaga),
    fork(customerSaga),
  ]);

}
