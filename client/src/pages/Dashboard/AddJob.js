import React from 'react'
import { FormRow, Alert, FormRowSelect } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const AddJob = () => {
  const { showAlert, displayAlert,
    isEditing, position, company, jobLocation,
    jobTypeOptions, jobType, statusOptions, status,
    handleChange, clearValues, isLoading, createJob, editJob } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!position || !company || !jobLocation) {  //condition for required fields
      displayAlert()
      return
    }
    if (isEditing) {
      editJob()
      return
    }
    createJob();
  }
  const handleJobInput = (e) => {
    // const name = e.target.name
    // const value = e.target.value
    // console.log(`${name}:${value}`)
    handleChange({ name: e.target.name, value: e.target.value })  //calling that dynamic object changing property defined in reducer Add page =>handle_Change
  }

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'Edit Job' : 'Add Job'}</h3>
        {showAlert && <Alert />}  {/*showing alert*/}


        <div className='form-center'>
          {/* using FormRow Component that we have created in components folder */}
          <FormRow type='text' name='position' value={position} handleChange={handleJobInput} />
          <FormRow type='text' name='company' value={company} handleChange={handleJobInput} />
          <FormRow type='text' labelText='job location' name='jobLocation' value={jobLocation} handleChange={handleJobInput} />
          {/* ************************************************** */}
          {/* Normal way to create DropdownList textBox */}
          {/* <div className='form-row'>
                <label htmlFor='jobType' className='form-label'>
                  job Type
                </label>
                <select name='jobType' value={jobType} onChange={handleJobInput} className='form-select'>
                  {jobTypeOptions.map((itemValue,index) => {
                   return( <option key={index} value={itemValue}>{itemValue}</option>);
                  })}
                </select>
              </div>  */}

          {/* by using FormRowSelect component created in components folder */}
          <FormRowSelect labelText='job type' name='jobType' value={jobType} handleChange={handleJobInput} list={jobTypeOptions} />
          <FormRowSelect name='status' value={status} handleChange={handleJobInput} list={statusOptions} />
          {/* *************************************************** */}
          
          <div className='btn-container'>

            {/* Submit Button */}
            <button type='submit' className='btn btn-block submit-btn' onClick={handleSubmit} disabled={isLoading}>
              submit
            </button>

            {/* Clear Button with functionality*/}
            <button className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault();   //IMP to define ...else page refresh when click on button and Throw error/values got submitted
                clearValues();
              }} >   {/*function called here*/}
              clear
            </button>
          </div>
        </div>

      </form>
    </Wrapper>
  )
}

export default AddJob