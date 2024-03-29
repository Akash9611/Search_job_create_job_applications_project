import React from 'react'
import Wrapper from '../assets/wrappers/SmallSidebar';
import Logo from './Logo';
import { FaTimes } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import NavLinks from './NavLinks';

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useAppContext()

  return (<Wrapper>
    <div className={showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
      <div className='content'>
        {/* cross mark ICON toggle button*/}
        <button type='button' className='close-btn' onClick={toggleSidebar}>
          <FaTimes />
        </button>
        {/* Logo */}
        <header>
          <Logo />
        </header>
        {/*Dashboard page link  */}
        <NavLinks  toggleSidebar={toggleSidebar}/>
      </div>
    </div>
  </Wrapper>
  )
}

export default SmallSidebar