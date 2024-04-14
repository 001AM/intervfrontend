import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseURL } from '../../@core/auth/jwt/jwtService'

const Account = () => {
  const [showForm, setShowForm] = useState("login")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    username: "",
  })

  async function handleSubmit(e) {
    e.preventDefault()

    setIsSubmitting(true)

    const formData = new FormData(e.target)

    try {
      const { data } = await axios({
        method: "POST",
        url: `${baseURL}/authentication/${showForm}/`,
        data: formData
      })

      console.log("data ====>", data)

    } catch (error) {
      console.log("error =====>", error)
    } finally {
      setIsSubmitting(false)
    }


  }

  function handleInputChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function emptyFields() {
    const newObj = { ...formData }
    Object.keys(formData).forEach((key) => {
      newObj[key] = ""
    })
    setFormData(newObj)
  }

  useEffect(() => {
    emptyFields()
  }, [showForm])
  return (
    <div className='w-[100vw] h-[100vh] bg-lightBackground flex justify-center items-start font-fredoka'>
      <div className="shadow-lg rounded-md px-10 py-5 max-w-[90%] w-[400px] mt-40">
        <div className="flex items-center justify-center gap-5">
          <span onClick={() => setShowForm("login")} className={`${showForm === "login" ? "opacity-100" : "opacity-10"} cursor-pointer font-bold transition-opacity ease-in-out text-xl select-none`}>Login</span>
          <div className={`w-[45px] h-[25px] bg-black p-1 relative flex items-center rounded-full cursor-pointer`} onClick={() => setShowForm(showForm === "login" ? "signup" : "login")}>
            <div style={{ transform: `translateX(${showForm === "login" ? "0px" : "20px"})` }} className={`h-[100%] aspect-square bg-lightBackground rounded-full transition-all duration-150 ease-in-out`}></div>
          </div>
          <span onClick={() => setShowForm("signup")} className={`${showForm === "signup" ? "opacity-100" : "opacity-10"} cursor-pointer font-bold transition-opacity ease-in-out text-xl select-none`}>SignUp</span>
        </div>
        <form onSubmit={handleSubmit} key={showForm} className='py-5'>
          {showForm === "signup" && (
            <>
              <input onChange={handleInputChange} value={formData.first_name} className={`w-full rounded-lg bg-inputBg1 p-3 mb-5`} name='first_name' placeholder='First Name' type="text" />
              <input onChange={handleInputChange} value={formData.last_name} className={`w-full rounded-lg bg-inputBg1 p-3 mb-5`} name='last_name' placeholder='Last Name' type="text" />
              <input onChange={handleInputChange} value={formData.username} className={`w-full rounded-lg bg-inputBg1 p-3 mb-5`} name='username' placeholder='Username' type="text" />
            </>
          )}
          <input onChange={handleInputChange} value={formData.email} className={`w-full rounded-lg bg-inputBg1 p-3 mb-5`} name='email' placeholder='Email' type="email" />
          <input onChange={handleInputChange} value={formData.password} className={`w-full rounded-lg bg-inputBg1 p-3 mb-5`} name='password' placeholder='Password' type="password" />
          <input disabled={isSubmitting} className={`w-full rounded-lg bg-buttonBg1 text-white p-3 cursor-pointer capitalize font-bold`} value={showForm} type="submit" />
        </form>
      </div>
    </div>
  )
}

export default Account