import {Navigate, Route, Routes} from 'react-router-dom'

import CompanyCreator from '../company/create'
import AdminPanel from '../company/create/panel/admin-dashboard'
import Layout from './layout'
import Home from './pages/home'
import {ADMIN_PANEL, COMPANY_CREATOR, HOME} from './paths'

const Router = () => (
  <Routes>
    <Route path={HOME} element={<Layout />}>
      <Route index={true} element={<Home />} />
      <Route path={COMPANY_CREATOR} element={<CompanyCreator />} />
      <Route path={ADMIN_PANEL} element={<AdminPanel />} />
    </Route>

    <Route path="*" element={<Navigate to={{pathname: '/'}} />} />
  </Routes>
)

export default Router
