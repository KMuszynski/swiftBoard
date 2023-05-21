import {Navigate, Route, Routes} from 'react-router-dom'

import CompanyCreator from '../company/create'
import Layout from './layout'
import Home from './pages/home'
import {COMPANY_CREATOR, HOME} from './paths'

const Router = () => (
  <Routes>
    <Route path={HOME} element={<Layout />}>
      <Route index={true} element={<Home />} />
      <Route path={COMPANY_CREATOR} element={<CompanyCreator />} />
    </Route>

    <Route path="*" element={<Navigate to={{pathname: '/'}} />} />
  </Routes>
)

export default Router
