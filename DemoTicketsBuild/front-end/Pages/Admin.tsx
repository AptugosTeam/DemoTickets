import React, { FunctionComponent } from 'react'
import baseClasses from './layout.module.scss'

import minimum from '../components/Themes/minimum.module.scss'

import Typography from '@mui/material/Typography'

import Grid from '@mui/material/Grid'

import Container from '@mui/material/Container'

import IconButton from '@mui/material/IconButton'

import SettingsIcon from '@mui/icons-material/Settings'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { NavLink } from 'react-router-dom'

import ListItem from '@mui/material/ListItem'

import ListItemText from '@mui/material/ListItemText'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import authHeaders from '../services/auth-header'
import AuthService from '../services/auth.service'

const Admin: FunctionComponent = (props: any) => {
  const classes = baseClasses

  const theme = minimum

  const [currentUser, setcurrentUser] = React.useState<any>(AuthService.getCurrentUser())

  const [profileMenuAnchor, setprofileMenuAnchor] = React.useState<any>(null)

  if (!authHeaders()) {
    props.history.push('/Login')
  }

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
                      props.history.push('/')
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>

                <NavLink exact to="/" key="xqddSUS2">
                  <ListItem button className={classes.itemLink}>
                    <ListItemText>Home</ListItemText>
                  </ListItem>
                </NavLink>

                <NavLink exact to="/Admin" key="E8wmWe4q">
                  <ListItem button className={classes.itemLink}>
                    <ListItemText>Admin</ListItemText>
                  </ListItem>
                </NavLink>

                <NavLink exact to="/CrearTicket" key="7lQCE9Te">
                  <ListItem button className={classes.itemLink}>
                    <ListItemText>Crear Ticket</ListItemText>
                  </ListItem>
                </NavLink>

                <NavLink exact to="/Tickets" key="XbcpM3hC">
                  <ListItem button className={classes.itemLink}>
                    <ListItemText>Tickets</ListItemText>
                  </ListItem>
                </NavLink>

                <NavLink exact to="/Users" key="yyEFfndd">
                  <ListItem button className={classes.itemLink}>
                    <ListItemText>Users</ListItemText>
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
                <Typography variant="h2">Panel Administrador</Typography>
              </Grid>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Admin
