import React, { Fragment } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthRoutes } from './routes/Auth'
import { PrivateRoutes } from './routes/Private'
import { PublicRoutes } from './routes/Public'
import { Other_Routes } from './routes/Other'
import PrivateWrapper from '../@core/Components/PrivateWrapper'

// This is the router wrapper where all the routes are combined and rendered
const Router = () => {
  const allRoutes = [
    ...AuthRoutes,
    ...PrivateRoutes,
    ...PublicRoutes,
    ...Other_Routes
  ]

  // Defining wrappers for different layouts 
  const Wrappers = {
    default: Fragment,
    private: PrivateWrapper
  }
  
  return (
    <BrowserRouter>
      <Routes>
        {
          allRoutes?.map((route, index) => {
            // getting the layout wrapper based on layout key from each element (if no lyout is provided then the default wrapper is the React Fragment)
            const Wrapper = route.layout ? Wrappers[route.layout] : Fragment
            const element = <Wrapper>{route.element}</Wrapper>
            return (
              <Route key={index} element={element} path={route.path} />
            )
          })
        }
      </Routes>
    </BrowserRouter>
  )
}

export default Router