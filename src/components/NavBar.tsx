import { AppBar, Box, Button, Toolbar } from "@mui/material"

const NavBar = () => {
    return (
        <Box >
            <AppBar position="static">
                <Toolbar>
                    <Button href="/manager" variant="text" color="inherit">manager</Button>
                    <Button href="/list" variant="text" color="inherit">list</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavBar;