import { AppBar, Box, Button, Toolbar } from '@mui/material'

const NavBar = () => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Button href="/home" variant="text" color="inherit">
            home
          </Button>
          <Button href="/list" variant="text" color="inherit">
            list
          </Button>
          <Button href="/manager" variant="text" color="inherit">
            manager
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
