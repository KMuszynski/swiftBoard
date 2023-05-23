import {Navigate, Route, Routes} from 'react-router-dom'

import Layout from './layout'
import Home from './pages/home'
import RegisterCompanyPage from './pages/register-company'
import {HOME, REGISTER_COMAPNY} from './paths'

const Router = () => (
  <Routes>
    <Route path={HOME} element={<Layout />}>
      <Route index={true} element={<Home />} />
      <Route path={REGISTER_COMAPNY} element={<RegisterCompanyPage />} />
    </Route>

    <Route path="*" element={<Navigate to={{pathname: HOME}} />} />
  </Routes>
)

export default Router
