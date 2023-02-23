import React, { useEffect } from 'react'
import Wrapper from '../assets/wrappers/JobsContainer'
import Job from './Job'
import Alert from './Alert'
import Loading from './Loading'
import { useAppContext } from '../context/appContext'
import PageBtnContainer from './PageBtnContainer'

const JobsContainer = () => {
    const { getJobs, jobs, totalJobs, page, isLoading, showAlert, search, searchStatus, searchType, sort, numOfPages } = useAppContext()

    useEffect(() => {
        getJobs()
    }, [page, search, searchStatus, searchType, sort])

    if (isLoading) {
        return <Loading center />
    }
    if (jobs.length === 0) {
        return (
            <Wrapper>
                <h2>No job to display.....</h2>
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            {showAlert && <Alert/>}
            <h5> {totalJobs} job{jobs.length > 1 && 's'} found </h5>
            <div className='jobs'>
                {jobs.map((item) => {
                    return <Job key={item._id} {...item} />   //getting all the values holds in jobs[] from Job.js folder
                    // with each saved job in database...with _id as a mapKey value to get index for mapping....item is to spread that values...or show that values contains in jobs[]...we can use any name to map it like item, job, index etc.
                })}
            </div>

            {numOfPages > 1 && <PageBtnContainer />}
        </Wrapper>
    )
}

export default JobsContainer