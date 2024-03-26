import React from 'react'

const PrivateWrapper = ({children}) => {
    console.log("private entered")
  return (
    <div>{children}</div>
  )
}

export default PrivateWrapper