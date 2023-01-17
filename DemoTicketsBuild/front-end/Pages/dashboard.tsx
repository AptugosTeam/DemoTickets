import React, { FunctionComponent } from 'react'
import baseClasses from './layout.module.scss'

import minimum from '../components/Themes/minimum.module.scss'

import IconButton from '@mui/material/IconButton'

import SettingsIcon from '@mui/icons-material/Settings'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { NavLink } from 'react-router-dom'

import ListItem from '@mui/material/ListItem'

import ListItemText from '@mui/material/ListItemText'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import Typography from '@mui/material/Typography'

import Button from '@mui/material/Button'

import Grid from '@mui/material/Grid'

import Container from '@mui/material/Container'

import AuthService from '../services/auth.service'

const Dashboard: FunctionComponent = (props: any) => {
  const classes = baseClasses

  const theme = minimum

  const [currentUser, setcurrentUser] = React.useState<any>(AuthService.getCurrentUser())

  const [profileMenuAnchor, setprofileMenuAnchor] = React.useState<any>(null)

  // Theme selection

  return (
    <React.Fragment>
      <div className={classes.mainPanel}>
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

        <Container maxWidth="md">
          <div title="Main Area" className={theme.mainarea}>
            <div title="div - Hello Text" className={classes.bigHello}>
              <Grid container alignItems="center" justifyContent="center" direction="column">
                <Typography variant="h3">Bienvenidos a tu generador de tickets!</Typography>

                <Typography variant="body1">Logueate para poder crear tickets!</Typography>

                {currentUser && (
                  <React.Fragment>
                    <div title="div">
                      <NavLink to="/crearTicket">
                        <Button variant="contained" color="primary">
                          Crear Ticket
                        </Button>
                      </NavLink>
                    </div>
                  </React.Fragment>
                )}
              </Grid>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
