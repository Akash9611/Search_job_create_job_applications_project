import React, { useState, useEffect } from 'react'
import { FormRow, Logo, Alert } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
}

const Register = () => {

    const [values, setValues] = useState(initialState)

    const navigate = useNavigate();  //for redirecting user to next page after register

    // const state= useAppContext()  // to see object showing or not(only for checking)  
    // console.log(state)            
    //instead of use the following code
    const { user, isLoading, showAlert, displayAlert, /* registerUser, loginUser,*/setupUser } = useAppContext()


    function toggleMember() {
        setValues({ ...values, isMember: !values.isMember })
    }

    function handleChange(e) {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const { name, email, password, isMember } = values
        if (!email || !password || (!isMember && !name)) {
            displayAlert()
            return
        }

        //********fetching data when it comes to login************
        console.log(values);
        const currentUser = { name, email, password }
        if (isMember) {   //if user already exist
            // console.log('Already a member')
            // loginUser(currentUser)    //use it when login defined separately in appContext
            setupUser({      //when login and registering appContext is only one or together 
                currentUser,
                endPoint: 'login',
                alertText: 'Login Successful!....Redirecting'
            })
        } else {
            // registerUser(currentUser)  //use it when register defined separately
            setupUser({
                currentUser,
                endPoint: 'register',
                alertText: 'User Created!....Redirecting'
            })
        }
        console.log(values);
    }

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/')   //navigating to Dashboard page, and by taking 3sec time
            }, 3000)
            // OR use directly, it makes faster redirecting to dashboard page
            // navigate('/')
        }
    }, [user, navigate])

    return (
        <Wrapper className='full-page'>
            <form className='form' onSubmit={onSubmit}>
                <Logo />

                <h3>{values.isMember ? 'Login' : 'Register'}</h3>   {/* toggling */}

                {showAlert && <Alert />} {/* Showing alert */}


                {/* input for Name */} {/* toggling for login(hiding name input) for register(showing name input) */}
                {!values.isMember && (
                    < FormRow type='text' name='name' value={values.name} handleChange={handleChange} />
                )}

                {/* input for email */}
                <FormRow type='email' name='email' value={values.email} handleChange={handleChange} />

                {/* input for password */}
                <FormRow type='password' name='password' value={values.password} handleChange={handleChange} />
                <button type='submit' className='btn btn-block' disabled={isLoading}>Submit</button>
    {/* //! ************ Demo App Button [Test User] ************************************* */}
                <button type='button' className='btn btn-block btn-hipster'
                    onClick={() => {setupUser({
                        currentUser: { email: 'testUser@gmail.com', password: '123456' }, //User Login Credential
                        endPoint: 'login',
                        alertText: 'Login Successful!....Redirecting' })}}
                    disabled={isLoading} >
                    {isLoading ? 'loading...' : 'demo app'}
                </button>
 {/* //! ^^^^^^^^^^^^^^^ Demo App Button [Test User]^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}
                <p>     {/* toggling para */}
                    {values.isMember ? 'Not a member yet?' : 'Already a member?'}

                    <button type='button' onClick={toggleMember} className='member-btn' >
                        {/* toggling */}
                        {values.isMember ? 'Register' : 'Login'}
                    </button>
                </p>
            </form>
        </Wrapper>
    )
}

export default Register