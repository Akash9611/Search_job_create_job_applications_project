import React from 'react'
import {FormRow, FormRowSelect} from '.'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'
import { useState,useMemo } from 'react'   //useMemo[for accessing local Storage] used for debounce function
const SearchContainer = () => {
    const [localSearch, setLocalSearch] = useState('')  //!used for Debounce 

    const {isLoading , search, searchStatus, searchType, sort, sortOptions, statusOptions, jobTypeOptions, handleChange, clearFilter } = useAppContext()

    const handleSubmit =(e)=>{
        e.preventDefault()
        setLocalSearch('');   //<-just for clearing search filed //because we used different approach[debounce] here so we also have to define that variable to clear that search box filed...Note-[following function will clear the that filed]
        clearFilter()
    }

    const handleSearch =(e)=>{
        if(isLoading) return
        handleChange({name:e.target.name, value:e.target.value})
        // console.log(e.target.name)
    }
    //!Debounce -it is functionality that allows you to send request after some time[i.e we have set inside setTimeout()] when user stopped typing/clicking on button.
    //todo:  It is mostly used for searching ...
    
    const debounce = () =>{
        let timeoutID ;
        return(e)=>{
            // console.log('debounce')
            setLocalSearch(e.target.value)  //getting and setting up values
            clearTimeout(timeoutID)  //clearing previous values[For Ex. when we clicking on button we get multiple req that how many times we click on it. This built-in function clear previous values on-click and only takes last-one and perform following action]
            
            timeoutID=setTimeout(()=>{
                handleChange({name:e.target.name, value:e.target.value})
            },1000)
        } 
    }
    const optimizeDebounce = useMemo(()=>debounce(),[]) //*IMP to use useMemo for storing and accessing debounce value

  return (
    <Wrapper>
        <form className='form'>
            <h2>Search Job</h2>
            <div className='form-center'>
                {/* search by position [Search Bar]*/}

                {/* <FormRow  type='text' name='search' value={search} handleChange={handleSearch}  />  */}  {/* //!basic Search method */}
                <FormRow  type='text' name='search' value={localSearch} handleChange={optimizeDebounce}  />{/* //!using Debounce for Search*/}
                
                {/* search by status */}
                <FormRowSelect labelText='status' name='searchStatus' value={searchStatus} handleChange={handleSearch} list={['all',...statusOptions]}/>

                <FormRowSelect labelText='type' name='searchType' value={searchType} handleChange={handleSearch} list={['all',...jobTypeOptions]} />

                <FormRowSelect name='sort' value={sort} handleChange={handleSearch} list={sortOptions} />

                <button className='btn btn-block btn-danger' disabled={isLoading} onClick={handleSubmit}>
                    clear filter
                </button>
            </div>
        </form>
    </Wrapper>
    
  )
}

export default SearchContainer