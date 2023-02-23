import React from 'react'
const FormRowSelect = ({labelText, name, value, handleChange, list}) => {
    return (
        /*  // Normal Logic for Dropdown(select tag) list with label 
        <div className='form-row'>
                     <label htmlFor='jobType' className='form-label'>
                       job Type
                     </label>
                     <select name='jobType' value={jobType} onChange={handleJobInput} className='form-select'>
                       {jobTypeOptions.map((itemValue,index) => {
                        return( <option key={index} value={itemValue}>{itemValue}</option>);
                       })}
                     </select>
                     </div>
                 */
        <div className='form-row'>
            <label htmlFor={name} className='form-label'>
                {labelText || name}
            </label>
            <select name={name} value={value} onChange={handleChange} className='form-select'>
                {list.map((itemValue, index) => {   /*list is a schemaName/object that holds array values */
                    return (
                        <option key={index} value={itemValue}>
                            {itemValue}
                        </option>);
                })}
            </select>
        </div>
    )
}

export default FormRowSelect