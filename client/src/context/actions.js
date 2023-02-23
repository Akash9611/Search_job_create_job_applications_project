//for showing alert and error msg on top of login and register page
export const DISPLAY_ALERT = "SHOW_ALERT"
export const CLEAR_ALERT = "CLEAR_ALERT"

//***************LOGIN & REGISTER***********************/
/*
//------BOTH SEPARATELY
//Register user
export const REGISTER_USER_BEGIN='REGISTER_USER_BEGIN'
export const REGISTER_USER_SUCCESS='REGISTER_USER_SUCCESS'
export const REGISTER_USER_ERROR ='REGISTER_USER_ERROR'

//Login user
export const LOGIN_USER_BEGIN= 'LOGIN_USER_BEGIN'
export const LOGIN_USER_SUCCESS ='LOGIN_USER_SUCCESS '
export const LOGIN_USER_ERROR='LOGIN_USER_ERROR'
*/

//-----BOTH TOGETHER [login and register both together with in one time]
export const SETUP_USER_BEGIN= 'SETUP_USER_BEGIN'
export const SETUP_USER_SUCCESS ='SETUP_USER_SUCCESS '
export const SETUP_USER_ERROR='SETUP_USER_ERROR'

//^^^^^^^^^^^^LOGIN & REGISTER^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^/

//Toggling SIDEBAR 
export const TOGGLE_SIDEBAR='TOGGLE_SIDEBAR'

//Logout User
export const LOGOUT_USER ='LOGOUT_USER'

//Update User 
export const UPDATE_USER_BEGIN ="UPDATE_USER_BEGIN"
export const UPDATE_USER_SUCCESS ="UPDATE_USER_SUCCESS"
export const UPDATE_USER_ERROR ="UPDATE_USER_ERROR"

//On Add Job Page .....And Edit Job ->submit and clear button click functionalities
export const HANDLE_CHANGE ='HANDLE_CHANGE' 
export const CLEAR_VALUES ='CLEAR_VALUES'

//Add Job page Saving/Storing Job 
export const CREATE_JOB_BEGIN ='CREATE_JOB_BEGIN'
export const CREATE_JOB_SUCCESS ='CREATE_JOB_SUCCESS'
export const CREATE_JOB_ERROR ='CREATE_JOB_ERROR'

//Get All Jobs...calling job get rout
export const GET_JOBS_BEGIN= 'GET_JOBS_BEGIN'
export const GET_JOBS_SUCCESS = 'GET_JOBS_SUCCESS'

//Set ALL VALUES OF JOB IN EDIT JOB page 
export const SET_EDIT_JOB = 'SET_EDIT_JOB'

//DELETE JOB 
export const DELETE_JOB_BEGIN ='DELETE_JOB_BEGIN'
export const DELETE_JOB_ERROR ='DELETE_JOB_ERROR'

//EDIT JOB /UPDATE JOB
export const EDIT_JOB_BEGIN = 'EDIT_JOB_BEGIN'
export const EDIT_JOB_SUCCESS = 'EDIT_JOB_SUCCESS'
export const EDIT_JOB_ERROR = 'EDIT_JOB_ERROR'

//STATS
export const SHOW_STATS_BEGIN ='SHOW_STATS_BEGIN'
export const SHOW_STATS_SUCCESS ='SHOW_STATS_SUCCESS'

//SEARCH Form clear filter button in ALL JOBS 
export const CLEAR_FILTER ='CLEAR_FILTER'

//Pagination in ALL JOBS
export const CHANGE_PAGE ='CHANGE_PAGE'

//for Storing user and location in initialState when we are using COOKIES
export const GET_CURRENT_USER_BEGIN= 'GET_CURRENT_USER_BEGIN'
export const GET_CURRENT_USER_SUCCESS= 'GET_CURRENT_USER_SUCCESS'