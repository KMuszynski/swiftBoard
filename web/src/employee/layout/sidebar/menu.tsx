import SideMenu, {SideMenuItem} from '@/common/components/side-menu'
import {EMPLOYEE_CALENDAR, EMPLOYEE_CHAT, EMPLOYEE_DOCUMENTS, EMPLOYEE_PANEL} from '@/router/paths'

const items: SideMenuItem[] = [
  {
    label: 'Dashboard',
    link: EMPLOYEE_PANEL,
    end: true,
  },
  {
    label: 'Wirtualny asystent',
    link: EMPLOYEE_CHAT,
  },
  {
    label: 'Dokumenty',
    link: EMPLOYEE_DOCUMENTS,
  },
  {
    label: 'Kalendarz',
    link: EMPLOYEE_CALENDAR,
  },
]

const UserMenu = () => <SideMenu items={items} />

export default UserMenu
