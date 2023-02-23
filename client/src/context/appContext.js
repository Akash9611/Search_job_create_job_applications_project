
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from './reducer'
import {
    DISPLAY_ALERT, CLEAR_ALERT,
    /*   REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR,
       LOGIN_USER_BEGIN, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR,*/
    SETUP_USER_BEGIN, SETUP_USER_SUCCESS, SETUP_USER_ERROR, //todo:LOGIN & REGISTER
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    UPDATE_USER_BEGIN, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR, //todo: Update profile
    HANDLE_CHANGE, CLEAR_VALUES, //todo: Submit and clear button functionalities for Add Job page
    CREATE_JOB_BEGIN, CREATE_JOB_SUCCESS, CREATE_JOB_ERROR, //todo: Add job 
    GET_JOBS_BEGIN, GET_JOBS_SUCCESS, //todo: ALL Jobs 
    SET_EDIT_JOB,  //todo: Edit Job by redirecting and using functionalities of Add job page 
    DELETE_JOB_BEGIN, DELETE_JOB_ERROR,
    EDIT_JOB_BEGIN, EDIT_JOB_SUCCESS, EDIT_JOB_ERROR,
    SHOW_STATS_BEGIN, SHOW_STATS_SUCCESS,
    CLEAR_FILTER,
    CHANGE_PAGE,
    GET_CURRENT_USER_BEGIN, GET_CURRENT_USER_SUCCESS
} from './actions'
import axios from 'axios'

//! REMOVE [token] from every where Because now we are Storing Token inside COOKIES ...i.e we not need LocalStorage Approach. use LOCAL STORAGE when you are Storing token inside local Storage
// const token = localStorage.getItem('token')
// const user = localStorage.getItem('user')
// const userLocation = localStorage.getItem('location')

const initialState = {
    userLoading: true, //using when Cookies to store token ...it for showing loading when user getting logged-in . Imp for getCurrentUser when we are storing user and location values in initialState 
    isLoading: false,  //button enable or disabling
    showAlert: false,  //showing alert msg
    alertType: '',
    alertText: '',
    //******User adding to localStorage imp values getting from upside defined const values  */
    // user: user ? JSON.parse(user) : null,//to get user data from backend -same for following properties //!use when we are using Local Storage to access token
    user: null,//todo: when we are using Cookies to access token
    // token: token,   //!use when we are using Local Storage to access token
    // userLocation: userLocation || '',//!use when we are using Local Storage to access token
    userLocation: '',//todo: when we are using Cookies to access token
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    showSidebar: false,  //for Toggling Sidebar
    //*******for Job Page */    
    isEditing: false,   //button
    editJobId: '',   //taking Id from UserSchema
    // jobLocation: userLocation || '',//!use when we are using Local Storage to access token
    jobLocation: '', //todo: when we are using Cookies to access token
    position: '',
    company: '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'], //because we also have that array values on backend inside Job Schema as enum...we also want to show it on frontend i.e 
    jobType: 'full-time',
    statusOptions: ['interview', 'declined', 'pending'],
    status: 'pending',

    jobs: [],   //for All Jobs showing all data On All Jobs Page
    totalJobs: 0,
    numOfPages: 1,
    page: 1,

    stats: {},   //show STATS
    monthlyApplications: [],

    search: '',  //Search Job Filter on All Jobs Page
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a']

}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT })
        clearAlert()
    }
    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT })
        }, 5000)
    }

    //! local Storage /adding and removing [token] from local storage
    /*  const addUserToLocalStorage = ({ user, token, location }) => {
          localStorage.setItem('user', JSON.stringify(user))
          localStorage.setItem('token', token)
          localStorage.setItem('location', location)
      }
      const removeUserFromLocalStorage = () => {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          localStorage.removeItem('location')
      }
  */
    //*************************LOGIN & REGISTER********************************

    //*********LOGIN AND REGISTER Separately APPROACH 1.....(it is better for email verification)

    /*  const registerUser = async (currentUser) => {
          // console.log(currentUser)
          dispatch({ type: REGISTER_USER_BEGIN })
          try {
              const response = await axios.post('/api/v1/user/register', currentUser)
              // console.log(response)
              const { user, token, location } = response.data //we need data to be stored i.e we use [response.data]
  
              dispatch({
                  type: REGISTER_USER_SUCCESS,
                  payload: { user, token, location }
              })
  
              //adding localStorage that holds and store following data
              addUserToLocalStorage({ user, token, location })
  
          } catch (error) {
              console.log(error.response)
              dispatch({
                  type: REGISTER_USER_ERROR,
                  payload: { msg: error.response.data.msg } //getting error from response
              })
          }
          clearAlert()
      }
  
      const loginUser = async (currentUser) => {
          dispatch({ type: LOGIN_USER_BEGIN })
          try {
              const { data } = await axios.post('/api/v1/user/login',currentUser)
              const { user, token, location } = data //we need here data to be fetched not store i.e we use only [data]
  
              dispatch({
                  type: LOGIN_USER_SUCCESS,
                  payload: { user, token, location }
              })
              addUserToLocalStorage({ user, token, location })
          } catch (error) {
              dispatch({
                  type: LOGIN_USER_ERROR,
                  payload: { msg: error.response.data.msg} //getting error from response
              })
          }
          clearAlert()
      }
  */

    //*********LOGIN AND REGISTER Together APPROACH 2.....
    const setupUser = async ({ currentUser, endPoint, alertText }) => {
        dispatch({ type: SETUP_USER_BEGIN })
        try {
            const { data } = await axios.post(`/api/v1/user/${endPoint}`, currentUser)
            // const { user, token, location } = data //!when using Local Storage to access and strore token
            const { user, location } = data //!using cookies to store and access token

            dispatch({
                type: SETUP_USER_SUCCESS,
                // payload: { user, token, location, alertText }
                payload: { user, location, alertText }
            })

            // addUserToLocalStorage({ user, token, location })

        } catch (error) {
            dispatch({
                type: SETUP_USER_ERROR,
                payload: { msg: error.response.data.msg }
            })
        }
        clearAlert()
    }

    //^^^^^^^^^^^^^^^^LOGIN & REGISTER^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //Toggling SIDEBAR by using button
    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDEBAR })
    }

    //Logout User
    const logoutUser = async() => {
        await authFetch.get('/user/logout') //when we are using cookies Approach
        dispatch({ type: LOGOUT_USER })
        // removeUserFromLocalStorage() //!use when using localStorage
    }

    //*******************Update User in Profile page ************************* 
    //method 4*******setting up Axios- Interceptors ........use this in every project ...it's More Secure and efficient handle badReq error   
    const authFetch = axios.create({ baseURL: 'api/v1' })   //creating axios instance that holds only starting URL  

    // response interceptor //!use only when storing token in localStorage
    /* authFetch.interceptors.request.use(
         (config) => {
             config.headers['Authorization'] = `Bearer ${state.token}`;
             return config;
         },
         (error) => {
             return Promise.reject(error);
         }
     );
     */
    // response interceptor
    authFetch.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.log(error.response);
            if (error.response.status === 401) {
                logoutUser()
                // console.log('AUTH ERROR')
            }
            return Promise.reject(error);
        }
    );

    const updateUser = async (currentUser) => {
        dispatch({ type: UPDATE_USER_BEGIN })
        try {
            const { data } = await authFetch.patch('/user/updateUser', currentUser)

            // const { user, location,token } = data
            const { user, location } = data
            dispatch({
                type: UPDATE_USER_SUCCESS,
                // payload: { user, location,token }
                payload: { user, location }
            })
            // addUserToLocalStorage({ user, location, token })
        } catch (error) {
            if (error.response.status !== 401) {
                dispatch({
                    type: UPDATE_USER_ERROR,
                    payload: { msg: error.response.data.msg }
                })
            }
        }
        clearAlert()
    }
    //FOR TESTING method 4 
    // const updateUser = async (currentUser) => {
    //     try {
    //         const { data } = await authFetch.patch('/user/updateUser', currentUser)
    //         console.log(data)
    //     } catch (error) {
    //         // console.log(error.response)

    //     }
    // }

    //method 3*******setting up Axios- by creating Instance ...it's secure    
    /*
        const authFetch = axios.create({       //create this axios instance and use it where you want without including baseURL on start 
            baseURL: 'api/v1',
            headers: { Authorization: `Bearer ${state.token}` }
        })
        const updateUser = async (currentUser) => {
            try {
                const { data } = await authFetch.patch('/user/updateUser', currentUser)
                console.log(data)
            } catch (error) {
                console.log(error.response)
    
            }
        }
        
        //method 2**************setting up axios Global setup for getting Authorization-Bearer token.......it is less secure
        
        axios.defaults.headers['Authorization'] = `Bearer ${state.token}`
        
        const updateUser =async(currentUser)=>{
            try{    
                        const {data}= await axios.patch('/api/v1/user/updateUser', currentUser)
                            console.log(data)
                }catch(error){
                    console.log(error.response)
        
                }
                }
        //method1 **********setting up axios Manually for getting Authorization-Bearer token ......it is Secure
            const updateUser =async(currentUser)=>{
                try{    
                        const {data}= await axios.patch('/api/v1/user/updateUser', currentUser,
                        //setting up axios Manually for getting Authorization-Bearer token      
                          {
                            headers:{
                                Authorization: `Bearer ${state.token}`
                            }})
                            console.log(data)
                }catch(error){
                    console.log(error.response)
        
                }
                }
             */
    //^^^^^^^^^^^^^^^^^^^^^ Update User in Profile page ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 


    //*****************Add Job ==> Handle Change (Using dynamic object property changing functionality).. Refer this video to know about the functionality[Dynamic Object Keys](https://youtu.be/_qxCYtWm0tw)***************************/
    const handleChange = ({ name, value }) => {
        dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
    }
    //Clearing All values when we are clicking Clear button on Add Job/Edit Job page
    const clearValues = () => {
        dispatch({ type: CLEAR_VALUES })
    }

    //Create Job / Adding job
    const createJob = async () => {
        dispatch({ type: CREATE_JOB_BEGIN })
        try {
            const { position, company, jobLocation, jobType, status } = state   //we have store them in state then it will send it into database 

            await authFetch.post('/job', { position, company, jobLocation, jobType, status })
            dispatch({ type: CREATE_JOB_SUCCESS })
            dispatch({ type: CLEAR_VALUES }) //OR use clearValues()...to clear All values after Submitting 
        } catch (error) {
            if (error.response.status === 401) return
            dispatch({ type: CREATE_JOB_ERROR, payload: { msg: error.response.data.msg } })
        }
        clearAlert()
    }
    //^^^^^^^^^^^^^^^Add Job^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //***************ALL JOBS*************************************************************
    const getJobs = async () => {
        const { page, search, searchStatus, searchType, sort } = state; //! for search form

        let url = `/job?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}` //! for search form

        if (search) {//! for search form
            url = url + `&search=${search}`
        }

        // let url = '/job'   //just to get all jobs without search
        dispatch({ type: GET_JOBS_BEGIN })
        try {
            const { data } = await authFetch(url)
            const { jobs, totalJobs, numOfPages } = data
            dispatch({
                type: GET_JOBS_SUCCESS,
                payload: { jobs, totalJobs, numOfPages }
            })
        } catch (error) {
            // console.log(error.response)
            logoutUser()

        }
        clearAlert()
    }
    // useEffect(()=>{  //to see the array values comes in jobs[]//!for testing
    //     getJobs()
    // },[])

    const setEditJob = (id) => {
        dispatch({ type: SET_EDIT_JOB, payload: { id } })
        // console.log(`Edit on job : ${id}`)//!for testing
    }
    const editJob = async () => {
        dispatch({ type: EDIT_JOB_BEGIN })
        try {
            const { position, company, jobLocation, jobType, status } = state
            await authFetch.patch(`/job/${state.editJobId}`, { position, company, jobLocation, jobType, status })

            dispatch({ type: EDIT_JOB_SUCCESS })
            dispatch({ type: CLEAR_VALUES })
        } catch (error) {
            if (error.response.status === 401) return
            dispatch({
                type: EDIT_JOB_ERROR,
                payload: { msg: error.response.data.msg }
            })
            // console.log('Job edit ') //!for testing
        }
        clearAlert()
    }
    const deleteJob = async (jobId) => {
        dispatch({ type: DELETE_JOB_BEGIN })
        try {
            await authFetch.delete(`/job/${jobId}`)
            getJobs()
        } catch (error) {
            // console.log(error.response)
            if (error.response.status === 401) return
            dispatch({
                type: DELETE_JOB_ERROR,
                payload: { msg: error.response.data.msg }
            })
        }
        // console.log(`job deleted with ${jobId}`) //!for testing
    }
    //^^^^^^^^^^^^^^^^^ALL JOBS^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    //*********************SHOW STATS************************************
    const showStats = async () => {
        dispatch({ type: SHOW_STATS_BEGIN })
        try {
            const { data } = await authFetch('/job/stats')  //authFetch.get('/job/stats') we can also define like this ,but if you haven't define route ,then it will by default use get method route
            dispatch({
                type: SHOW_STATS_SUCCESS,
                payload: {
                    stats: data.defaultStats,
                    monthlyApplications: data.monthlyApplications,
                }
            })
        } catch (error) {
            // console.log(error.response)
            logoutUser()
        }
        clearAlert()
    }

    //********Search Filter for ALL JOBS Page*************************************
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER })
        // console.log('Clear Filter')
    }
    //************PAGINATION CHANGE PAGE*************************************/
    const changePage = (page) => {
        dispatch({ type: CHANGE_PAGE, payload: { page } })
    }

    //*******Storing user and location values in initialState when we are using COOKIES. We use localStorage for it, But now we are using Cookies So we have use this approach */
    const getCurrentUser = async () => {
        dispatch({ type: GET_CURRENT_USER_BEGIN })
        try {
            const { data } = await authFetch('/user/getCurrentUser')
            const { user, location } = data

            dispatch({
                type: GET_CURRENT_USER_SUCCESS,
                payload: { user, location }
            })
        } catch (error) {
            if (error.response.status === 401) return
            logoutUser();
        }
    }
    useEffect(() => {
        getCurrentUser()
    }, [])


    return <AppContext.Provider
        value={{
            ...state, displayAlert, /*registerUser, loginUser,*/ setupUser,
            toggleSidebar, logoutUser, updateUser,
            handleChange, clearValues, createJob,
            getJobs, setEditJob, editJob, deleteJob,
            showStats, clearFilter, changePage
        }}>
        {children}
    </AppContext.Provider>
}


const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }


