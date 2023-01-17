import React, { FunctionComponent } from 'react'
import baseClasses from './layout.module.scss'

import minimum from '../components/Themes/minimum.module.scss'

import { NavLink } from 'react-router-dom'

import Typography from '@mui/material/Typography'

import Alert from '@mui/material/Alert'

import TextField from '@mui/material/TextField'

import Checkbox from '@mui/material/Checkbox'

import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'

import Button from '@mui/material/Button'

import Container from '@mui/material/Container'

import IconButton from '@mui/material/IconButton'

import SettingsIcon from '@mui/icons-material/Settings'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import ListItem from '@mui/material/ListItem'

import ListItemText from '@mui/material/ListItemText'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import blue from '@mui/material/colors/blue'

import { createTheme, ThemeProvider } from '@mui/material/styles'

const aptugotheme = createTheme({
  palette: {
    primary: blue,
  },
})

import AuthService from '../services/auth.service'

const LoginPage: FunctionComponent = (props: any) => {
  const classes = baseClasses

  const theme = minimum

  const [currentUser, setcurrentUser] = React.useState<any>(AuthService.getCurrentUser())

  const [profileMenuAnchor, setprofileMenuAnchor] = React.useState<any>(null)

  const [loginError, setloginError] = React.useState<any>(null)

  const [loginData, setloginData] = React.useState<any>({
    Email: '',
    Password: '',
    RememberMe: false,
  })

  // Theme selection

  const handleLogin = () => {
    AuthService.login(loginData.Email, loginData.Password).then(
      (res) => {
        console.log(res)
        props.history.push('/')
      },
      (error) => {
        setloginError(error.response.data.message)
      }
    )
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={aptugotheme}>
        <div className={theme.loginBody}>
          {currentUser && (
            <React.Fragment>
              <AppBar elevation={3} color="transparent" position="static" title="">
                <Toolbar>
                  <IconButton
                    color="default"
                    onClick={(event) => {
                      setprofileMenuAnchor(event.currentTarget)
                    }}
                  >
                    <SettingsIcon
                      sx={{
                        fontSize: '24px',
                      }}
                    />
                  </IconButton>

                  <Menu
                    anchorEl={profileMenuAnchor}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                    open={Boolean(profileMenuAnchor)}
                    onClose={(params) => {
                      setprofileMenuAnchor(null)
                    }}
                  >
                    <div title="div" className={theme.menuProfileDetails}>
                      {currentUser.FirstName} {currentUser.LastName}
                    </div>

                    <MenuItem>Profile</MenuItem>
                    <MenuItem
                      onClick={(params) => {
                        AuthService.logout()
                        location.reload()
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>

                  <NavLink exact to="/" key="Fd5zLOHh">
                    <ListItem button className={classes.itemLink}>
                      <ListItemText>Home</ListItemText>
                    </ListItem>
                  </NavLink>

                  <NavLink exact to="/Admin" key="WL8RaV1F">
                    <ListItem button className={classes.itemLink}>
                      <ListItemText>Admin</ListItemText>
                    </ListItem>
                  </NavLink>

                  <NavLink exact to="/login" key="M8Us9mKT">
                    <ListItem button className={classes.itemLink}>
                      <ListItemText>Login Page</ListItemText>
                    </ListItem>
                  </NavLink>

                  <NavLink exact to="/register" key="D9LdeEft">
                    <ListItem button className={classes.itemLink}>
                      <ListItemText>Register</ListItemText>
                    </ListItem>
                  </NavLink>

                  <NavLink exact to="/listaTickets" key="lHKw9m3I">
                    <ListItem button className={classes.itemLink}>
                      <ListItemText>Listado Tickets</ListItemText>
                    </ListItem>
                  </NavLink>
                </Toolbar>
              </AppBar>
            </React.Fragment>
          )}

          {!currentUser && (
            <React.Fragment>
              <AppBar elevation={3} color="transparent" position="static" title="">
                <Toolbar>
                  <NavLink exact to="/" key="pn7MpFDo">
                    <ListItem button className={classes.itemLink}>
                      <ListItemText>Home</ListItemText>
                    </ListItem>
                  </NavLink>

                  <NavLink exact to="/login" key="M8Us9mKT">
                    <ListItem button className={classes.itemLink}>
                      <ListItemText>Login Page</ListItemText>
                    </ListItem>
                  </NavLink>

                  <NavLink exact to="/register" key="D9LdeEft">
                    <ListItem button className={classes.itemLink}>
                      <ListItemText>Register</ListItemText>
                    </ListItem>
                  </NavLink>

                  <NavLink exact to="/listaTickets" key="lHKw9m3I">
                    <ListItem button className={classes.itemLink}>
                      <ListItemText>Listado Tickets</ListItemText>
                    </ListItem>
                  </NavLink>
                </Toolbar>
              </AppBar>
            </React.Fragment>
          )}

          <Container className={theme.loginPage} maxWidth="md">
            <div title="Register Area" className={theme.right}>
              Don't have an account?
              <a href="/Register">Register!</a>
            </div>

            <div title="Login Box" className={theme.loginBox}>
              <div title="Heading" className={theme.headingLogin}>
                <Typography variant="h3">Sign In</Typography>

                <Typography variant="body1">Enter your details below.</Typography>
              </div>

              {loginError && (
                <React.Fragment>
                  <Alert variant="standard" severity="error">
                    {loginError}
                  </Alert>
                </React.Fragment>
              )}

              <TextField
                variant="outlined"
                placeholder="Email Address"
                margin="normal"
                label="Email"
                type="text"
                value={loginData.Email}
                onChange={(e) => {
                  setloginData({ ...loginData, Email: e.target.value })
                }}
              />

              <TextField
                variant="outlined"
                margin="normal"
                label="Password"
                type="password"
                value={loginData.Password}
                onChange={(e) => {
                  setloginData({ ...loginData, Password: e.target.value })
                }}
              />

              <div title="div" className={theme.flexLine}>
                <FormControl margin="dense">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={loginData.RememberMe}
                        onClick={() => {
                          setloginData({ ...loginData, RememberMe: !loginData.RememberMe })
                        }}
                      />
                    }
                    label="Remember me"
                  />
                </FormControl>

                <NavLink to="/forgot">Forgot password?</NavLink>
              </div>

              <Button variant="contained" color="primary" onClickCapture={handleLogin}>
                Login
              </Button>
            </div>
          </Container>
        </div>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default LoginPage
