import React from 'react'
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'
import { Link, Navigate } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
const Landing = () => {
    const {user} =useAppContext()
    return (
        <React.Fragment>
            {user && <Navigate to='/' />} {/* if user is logged-In, & then if user try to go /landing route or landing page- then we kick-back the user to Dashboard page,Because user is already in login*/}
        <Wrapper>
            <nav>
               <Logo/>
            </nav>
            <div className='container page'>
                <div className='info'>
                    <h1>Job <span>Tracking</span> App</h1>
                    <p>Mumblecore humblebrag truffaut hammock air plant shoreditch brunch authentic four dollar toast kickstarter 8-bit photo booth food truck squid. Fanny pack ascot hexagon VHS lyft neutra. Activated charcoal beard locavore, jianbing poutine mustache sustainable lo-fi bitters mumblecore hot chicken fingerstache direct trade trust fund aesthetic. Unicorn normcore blue bottle austin.</p>
                    <Link to='/register' className='btn btn-hero'>Login/Register</Link>
                </div>
                <img src={main} alt='loding' className='img main-img'/>

            </div>

        </Wrapper>
        </React.Fragment>
    )
}


export default Landing