import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import DashboardEcommerce from "../pages/DashboardEcommerce";

//AuthenticationInner pages
import BasicSignIn from "../pages/AuthenticationInner/Login/BasicSignIn";
import BasicSignUp from "../pages/AuthenticationInner/Register/BasicSignUp";
import BasicPasswReset from "../pages/AuthenticationInner/PasswordReset/BasicPasswReset";
//pages

import BasicLockScreen from "../pages/AuthenticationInner/LockScreen/BasicLockScr";
import BasicLogout from "../pages/AuthenticationInner/Logout/BasicLogout";
import BasicSuccessMsg from "../pages/AuthenticationInner/SuccessMessage/BasicSuccessMsg";
import BasicTwosVerify from "../pages/AuthenticationInner/TwoStepVerification/BasicTwosVerify";
import Basic404 from "../pages/AuthenticationInner/Errors/Basic404";
import Alt404 from "../pages/AuthenticationInner/Errors/Alt404";
import Error500 from "../pages/AuthenticationInner/Errors/Error500";

import BasicPasswCreate from "../pages/AuthenticationInner/PasswordCreate/BasicPasswCreate";
import Offlinepage from "../pages/AuthenticationInner/Errors/Offlinepage";

//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
// User Profile
import UserProfile from "../pages/Authentication/user-profile";
import POSList from "../pages/Pos/POSList";

import TaxView from "../pages/Tax/TaxViews";
import CategoryList from "../pages/Category/CategoryList";
import TaxAdd from "../pages/Tax/TaxAdd";

import CategoryAdd from "../pages/Category/CategoryAdd";

import ProductsList from "../pages/Products/ProductsList";
import UnitView from "../pages/Unit/UnitView";
import CreateProduct from "../pages/Products/CreateProduct";
import { components } from "react-select";
import StateList from "../pages/Setting/StateList";
import DistrictList from "../pages/Setting/DistrictList";
import TalukaList from "../pages/Setting/TalukaList";
import VillageList from "../pages/Setting/VillageList";
import JobCategoryList from "../pages/JobCategory/JobCategoryList";
import JobList from "../pages/Job/JobList";
import JobAppList from "../pages/JobApplication/JobAppList";
import JobPortal from "../JobPortal/JobPortal";


const authProtectedRoutes = [
  { path: "/dashboard", component: <DashboardEcommerce /> },
  { path: "/pos-list", component: <POSList /> },

  //User Profile
  { path: "/profile", component: <UserProfile /> },

  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  { path: "*", component: <Navigate to="/dashboard" /> },

  // Tax Routes Starts
  { path: "/tax-list", component: <TaxView /> },
  { path: "/tax-add", component: <TaxAdd /> },

  //Category Routes
  { path: "/category-list", component: <CategoryList /> },

  { path: "/category-add", component: <CategoryAdd /> },

  // Product LIst
  { path: "/product-list", component: <ProductsList /> },
  { path: "/create/products", component: <CreateProduct /> },

  // Unit Routes
  { path: "/unit-list", component: <UnitView /> },



  { path: "/state-list", component: <StateList/>} ,
  { path: "/district-list", component: <DistrictList/>} ,
  { path: "/taluka-list", component: <TalukaList/>} ,
  { path: "/village-list", component: <VillageList/>} ,

  { path: "/jobcategory-list", component: <JobCategoryList/>} ,
  { path: "/job-list", component: <JobList/>} ,
  { path: "/jobApp-list", component: <JobAppList/>} ,

];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/job-portal", component: <JobPortal/> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },
  //AuthenticationInner pages
  { path: "/auth-signin-basic", component: <BasicSignIn /> },
  { path: "/auth-signup-basic", component: <BasicSignUp /> },
  { path: "/auth-pass-reset-basic", component: <BasicPasswReset /> },
  { path: "/auth-lockscreen-basic", component: <BasicLockScreen /> },
  { path: "/auth-logout-basic", component: <BasicLogout /> },
  { path: "/auth-success-msg-basic", component: <BasicSuccessMsg /> },
  { path: "/auth-twostep-basic", component: <BasicTwosVerify /> },
  { path: "/auth-404-basic", component: <Basic404 /> },
  { path: "/auth-404-alt", component: <Alt404 /> },
  { path: "/auth-500", component: <Error500 /> },
  { path: "/auth-pass-change-basic", component: <BasicPasswCreate /> },
  { path: "/auth-offline", component: <Offlinepage /> },
];

export { authProtectedRoutes, publicRoutes };
