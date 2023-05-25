import {Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text} from '@chakra-ui/react'

import Documents from './documents'
import Employees from './employees'
import Info from './info'
import Positions from './positions'
import Tasks from './tasks'

const CompanyPanel = () => {
  return (
    <Tabs position="relative" variant="unstyled" pt="2">
      <TabList>
        <Tab>Informacje</Tab>
        <Tab>Pracownicy</Tab>
        <Tab>Zadania</Tab>
        <Tab>Stanowiska</Tab>
        <Tab>Dokumenty</Tab>
        <Tab>Ankiety</Tab>
        <Tab>Kalendarz</Tab>
      </TabList>
      <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
      <TabPanels>
        <TabPanel>
          <Info />
        </TabPanel>
        <TabPanel>
          <Employees />
        </TabPanel>
        <TabPanel>
          <Tasks />
        </TabPanel>
        <TabPanel>
          <Positions />
        </TabPanel>
        <TabPanel>
          <Documents />
        </TabPanel>
        <TabPanel>
          <Text>Ankiety</Text>
        </TabPanel>
        <TabPanel>
          <Text>Kalendarz</Text>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default CompanyPanel
