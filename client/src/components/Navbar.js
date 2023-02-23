import React, {useState} from 'react'
import { useAppContext } from '../context/appContext'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'   //used for ICONs [React Icons website](https://react-icons.github.io/react-icons/)
import Logo from './Logo'
import Wrapper from '../assets/wrappers/Navbar'


const Navbar = () => {
    const { user ,toggleSidebar, logoutUser } = useAppContext()
    const [showLogout, setShowLogout] = useState(false)

    return (
        <Wrapper>
            <div className='nav-center'>
{/*Sidebar button*/}                
                <button type='button' className='toggle-btn' onClick={toggleSidebar}> {/*toggle button*/}
                    <FaAlignLeft />  {/* Toggle button ICON */}
                </button>
{/*Logo*/}                
                <div>
                    <Logo />          
                    <h3 className='logo-text'>dashboard</h3>
                </div>
{/*Login button*/}
                <div className='btn-container'>   
                    <button type='button' className='btn' onClick={()=>setShowLogout(!showLogout)}> {/*show/hide dropdown for logout*/}
                        <FaUserCircle />   {/*Login User profile ICON*/}
                            {user.name}  {/* [Akash] User Name on Login button */}
                        <FaCaretDown />    {/*dropdown arrow ICON*/}
                    </button>
{/*Logout button*/}
                    <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}> {/*toggling Logout button*/}
                        <button type='button' className='dropdown-btn' onClick={logoutUser}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default Navbar