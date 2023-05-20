import {Navigate, Route, Routes} from 'react-router-dom'

import SignIn from '../auth/signin'
import SignUp from '../auth/signup'
import Layout from './layout'
import Home from './pages/home'
import {HOME, SIGN_IN, SIGN_UP} from './paths'

const Router = () => (
  <Routes>
    <Route path={HOME} element={<Layout />}>
      <Route index={true} element={<Home />} />
      <Route path={SIGN_IN} element={<SignIn />} />
      <Route path={SIGN_UP} element={<SignUp />} />
    </Route>

    <Route path="*" element={<Navigate to={{pathname: '/'}} />} />
  </Routes>
)

export default Router
