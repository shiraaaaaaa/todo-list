import { Box } from '@mui/material'

import { Outlet } from 'react-router'

import NavBar from './components/NavBar'

const Layout = () => {
  return (
    <>
      <NavBar />
      <Box paddingTop={3} paddingX={4}>
        <Outlet />
      </Box>
    </>
  )
}

export default Layout
