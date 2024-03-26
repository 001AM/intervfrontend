import React from 'react'
import { PiSmileySad } from "react-icons/pi"

const NotFound = () => {
  return (
    <div className='w-[100vw] h-[100vh] flex flex-col gap-3 justify-center items-center text-white bg-[#050D22] selection:bg-none pointer-events-none'>
      <PiSmileySad size={75} />
      <span className="text-xl">Page Not Found</span>
    </div>
  )
}

export default NotFound