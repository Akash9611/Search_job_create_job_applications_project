import React, { useState } from 'react'
import { Alert, FormRow } from '../../components'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { useAppContext } from '../../context/appContext'

const Profile = () => {
  const { user, isLoading, showAlert, displayAlert, updateUser } = useAppContext()

  const [name, setName] = useState(user.name)     //getting values form user object (by using option chaining [object?.variable])...if user present then get name
  const [email, setEmail] = useState(user.email)
  const [lastName, setLastName] = useState(user.lastName)
  const [location, setLocation] = useState(user.location)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !lastName || !location) {
      displayAlert()
      return    //to terminate the function....[if you not return it will run following conditions and give you update user msg
                //return is IMP else Authorized user also get logout automatically or he will redirected to landing page...it is imp when we are setting [axios interceptors] for updating or saving some values
    }
    updateUser({name, email, lastName, location})
    // console.log('Update user')
  }
  return (    
    <Wrapper>
      <form className='form' onSubmit={handleSubmit} >
        <h4>Profile</h4>
        {showAlert && <Alert />} {/* Display Alert msg*/}

        <div className='form-center'>
          <FormRow type='text' name='name' value={name} handleChange={(e) => setName(e.target.value)} />
          <FormRow type='text' labelText='last name' name='lastName' value={lastName} handleChange={(e) => setLastName(e.target.value)} /> {/*if you want different name as label then use labelText */}
          <FormRow type='text' name='email' value={email} handleChange={(e) => setEmail(e.target.value)} />
          <FormRow type='text' name='location' value={location} handleChange={(e) => setLocation(e.target.value)} />

          <button type='submit' className='btn btn-block' disabled={isLoading}>
            {isLoading ? 'please wait...' : 'save changes'}
          </button>
        </div>

      </form>
    </Wrapper>
  )
}

export default Profile