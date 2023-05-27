import {Route} from 'react-router-dom'

import {EMPLOYEE_CALENDAR, EMPLOYEE_DOCUMENTS, EMPLOYEE_TASK, EMPLOYEE_TOOL} from '@/router/paths'

import EmployeeCalendar from './calendar'
import Dashboard from './dashboard'
import Documents from './documents'
import EmployeePanelLayout from './layout'
import TaskViewer from './task-viewer'
import ToolViewer from './tool-viewer'

const EmployeePanelRouter = () => (
  <Route element={<EmployeePanelLayout />}>
    <Route index={true} element={<Dashboard />} />
    <Route path={EMPLOYEE_DOCUMENTS} element={<Documents />} />
    <Route path={EMPLOYEE_CALENDAR} element={<EmployeeCalendar />} />
    <Route path={EMPLOYEE_TASK} element={<TaskViewer />} />
    <Route path={EMPLOYEE_TOOL} element={<ToolViewer />} />
  </Route>
)

export default EmployeePanelRouter
