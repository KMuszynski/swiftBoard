import {Route} from 'react-router-dom'

import {EMPLOYEE_CALENDAR, EMPLOYEE_CHAT, EMPLOYEE_DOCUMENTS} from '@/router/paths'

import EmployeeCalendar from './calendar'
import ChatPage from './chat/page'
import Dashboard from './dashboard'
import Documents from './documents'
import EmployeePanelLayout from './layout'

const EmployeePanelRouter = () => (
  <Route element={<EmployeePanelLayout />}>
    <Route index={true} element={<Dashboard />} />
    <Route path={EMPLOYEE_CHAT} element={<ChatPage />} />
    <Route path={EMPLOYEE_DOCUMENTS} element={<Documents />} />
    <Route path={EMPLOYEE_CALENDAR} element={<EmployeeCalendar />} />
  </Route>
)

export default EmployeePanelRouter
