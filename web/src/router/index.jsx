import {Navigate, Route, Routes} from 'react-router-dom'

import AdminRouter from '@/admin/router'
import SignIn from '@/auth/signin'
import SignUp from '@/auth/signup'
import UserProfile from '@/user'

import Home from './home'
import Layout from './layout'
import {HOME, SIGN_IN, SIGN_UP} from './paths'

const Router = () => (
  <Routes>
    <Route path={HOME} element={<Layout />}>
      <Route index={true} element={<Home />} />

      {/* Routes below require that no user is logged in */}
      <Route path={SIGN_IN} element={<SignIn />} />
      <Route path={SIGN_UP} element={<SignUp />} />

      {/* Routes below require a user to be logged in */}
      <Route path="konto">
        <Route index={true} element={<UserProfile />} />
      </Route>
    </Route>

    {/* Routes below require a user to be an admin */}
    {AdminRouter()}

    <Route path="*" element={<Navigate to={{pathname: '/'}} />} />
  </Routes>
)

export default Router
