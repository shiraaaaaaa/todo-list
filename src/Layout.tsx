import { Box } from '@mui/material'
import NavBar from './components/NavBar'
import { Outlet } from 'react-router'

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
