import React from 'react'
import { Link } from 'react-router-dom'
import img from '../assets/images/not-found.svg'
import Wrapper from '../assets/wrappers/ErrorPage'  //for importing css

const Error = () =>{
    return(
        <Wrapper className='full-page'>
            <div>
                <img src={img} alt='Not Found' />
                <h1>Ohh! Page Not Found</h1>
                <Link to='/'>Return Back To Home Page</Link> 
            </div>
        </Wrapper>
    )
}

export default Error