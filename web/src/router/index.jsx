import {Navigate, Route, Routes} from 'react-router-dom'

import Layout from './layout'
import Home from './pages/home'
import {HOME} from './paths'

const Router = () => (
  <Routes>
    <Route path={HOME} element={<Layout />}>
      <Route index={true} element={<Home />} />
    </Route>

    <Route path="*" element={<Navigate to={{pathname: '/'}} />} />
  </Routes>
)

export default Router
