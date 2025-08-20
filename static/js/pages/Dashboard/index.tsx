import { useState } from 'react'
import { Box } from '@mui/material'
import NetworkCapacity from './NetworkCapacity'
import NetworkSummary from './NetworkSummary'
import ResourcesLeased from './ResourcesLeased'
import MainTabs from './MainTabs'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0)

  const handleActiveTabChange = (newValue: number) => {
    setActiveTab(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <MainTabs handleTabChange={handleActiveTabChange} tab={activeTab} />
      <Box sx={{ p: 3 }}>
        {activeTab === 0 && <NetworkSummary />}
        {activeTab === 1 && <ResourcesLeased />}
        {activeTab === 2 && <NetworkCapacity />}
      </Box>
    </Box>
  )
}

export default Dashboard
