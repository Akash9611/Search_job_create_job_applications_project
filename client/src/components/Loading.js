import React from 'react'

const Loading = ({center}) => {
  return  <div className={center ? 'loading loading-center' : 'loading'}></div>  //css is present in global css
  
}
export default Loading