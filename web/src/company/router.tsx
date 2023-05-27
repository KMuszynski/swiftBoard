import {Route} from 'react-router-dom'

import {COMPANY_EMPLOYEE_VIEW} from '@/router/paths'

import CompanyPanelLayout from './layout'
import Panel from './panel'
import EmployeeDetails from './panel/employees/task-list'

const EmployeePanelRouter = () => (
  <Route element={<CompanyPanelLayout />}>
    <Route index={true} element={<Panel />} />
    <Route path={COMPANY_EMPLOYEE_VIEW} element={<EmployeeDetails />} />
  </Route>
)

export default EmployeePanelRouter
