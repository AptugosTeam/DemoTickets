import React, { FunctionComponent } from 'react'
import baseClasses from './layout.module.scss'

import { searchUsers } from '../store/actions/usersActions'

import { IState } from '../store/reducers/index'

import { useDispatch } from 'react-redux'

import { useSelector } from 'react-redux'

import { IUsersItem } from '../store/models'

import { loadTickets, searchTickets } from '../store/actions/ticketsActions'

import minimum from '../components/Themes/minimum.module.scss'

import Snackbar from '@mui/material/Snackbar'

import Typography from '@mui/material/Typography'

import TextField from '@mui/material/TextField'

import MenuItem from '@mui/material/MenuItem'

import Button from '@mui/material/Button'

import Container from '@mui/material/Container'

import IconButton from '@mui/material/IconButton'

import SettingsIcon from '@mui/icons-material/Settings'

import Menu from '@mui/material/Menu'

import { NavLink } from 'react-router-dom'

import ListItem from '@mui/material/ListItem'

import ListItemText from '@mui/material/ListItemText'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import authHeaders from '../services/auth-header'
import AuthService from '../services/auth.service'
import { addTickets, editTickets } from '../store/actions/ticketsActions'

const CrearTicket: FunctionComponent = (props: any) => {
  const classes = baseClasses

  const initialDataTickets = {
    ID: '',

    Nombre: '',

    Descripcion: '',

    Importancia: '',

    Usuario: '',
  }
  const [Ticketsdata, setTicketsData] = React.useState<any>(initialDataTickets)
  const handleTicketsChange = (name: string) => (event: any) => {
    const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
    setTicketsData({
      ...Ticketsdata,
      [name]: value,
    })
  }

  const theme = minimum

  const [currentUser, setcurrentUser] = React.useState<any>(AuthService.getCurrentUser())

  const [profileMenuAnchor, setprofileMenuAnchor] = React.useState<any>(null)

  const allTickets = useSelector((state: IState) => state.tickets).tickets

  const ticketsData = useSelector((state: IState) => state.tickets)

  const loadedUser = useSelector((state: IState): IUsersItem => state.users).foundusers[0] || {}

  const usersData = useSelector((state: IState) => state.users)

  const dispatch = useDispatch()

  const [LoadfromUserloadoptions, setLoadfromUserloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    searchField: '_id',
    totalItems: 0,
  })
  const performLoadfromUserload = (options) => {
    if (typeof options.searchString !== 'undefined') {
      dispatch(searchUsers(options))
    }
  }

  React.useEffect(() => {
    performLoadfromUserload({
      ...LoadfromUserloadoptions,

      searchField: '_id',
      searchString: currentUser?._id,
    })
  }, [LoadfromUserloadoptions, currentUser?._id])

  const [LoadfromTicketsloadoptions, setLoadfromTicketsloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },

    totalItems: 0,
  })
  const performLoadfromTicketsload = (options) => {
    dispatch(options.searchString ? searchTickets(options) : loadTickets(options))
  }

  React.useEffect(() => {
    performLoadfromTicketsload({
      ...LoadfromTicketsloadoptions,
    })
  }, [LoadfromTicketsloadoptions])

  const [snackBarOpen, setsnackBarOpen] = React.useState(false)

  if (!authHeaders()) {
    props.history.push('/Login')
  }

  // Theme selection

  const cargarTicket = () => {
    const dataTicket = { ...Ticketsdata, Usuario: loadedUser?.Email }
    setTicketsData({ ...initialDataTickets })
    if (dataTicket._id) {
      dispatch(editTickets(dataTicket as any))
    } else {
      dispatch(addTickets(dataTicket as any))
      setsnackBarOpen(true)
    }
  }

  React.useEffect(() => {
    if (!currentUser) {
      props.history.push('/')
    }
  }, [currentUser])

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

        <div title="Main Area" className={theme.mainarea}>
          <Snackbar
            open={snackBarOpen}
            message="Cargado Correctamente! "
            autoHideDuration={4000}
            onClose={() => {
              setsnackBarOpen(false)
            }}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          ></Snackbar>

          <Container maxWidth="sm">
            <div title="div - Hello Text" className={classes.bigHello}>
              <Typography variant="h2">Cargar Ticket</Typography>

              {loadedUser && (
                <React.Fragment>
                  <div title="div">
                    <div title="div">
                      <Typography variant="subtitle2">ID</Typography>

                      <TextField
                        margin="normal"
                        label="ID"
                        className={'field_ID'}
                        type="number"
                        fullWidth
                        variant="outlined"
                        value={Ticketsdata.ID || ''}
                        onChange={handleTicketsChange('ID')}
                      />
                    </div>

                    <div title="div">
                      <Typography variant="subtitle2">Nombre</Typography>

                      <TextField
                        margin="normal"
                        label="Nombre"
                        type="text"
                        fullWidth
                        className={'field_Nombre'}
                        variant="outlined"
                        value={Ticketsdata.Nombre || ''}
                        onChange={handleTicketsChange('Nombre')}
                        error={ticketsData?.errField === 'Nombre'}
                        helperText={ticketsData?.errField === 'Nombre' && ticketsData.errMessage}
                      />
                    </div>

                    <div title="div">
                      <Typography variant="subtitle2">Descripcion</Typography>

                      <TextField
                        margin="normal"
                        label="Descripcion"
                        type="text"
                        fullWidth
                        className={'field_Descripcion'}
                        variant="outlined"
                        value={Ticketsdata.Descripcion || ''}
                        onChange={handleTicketsChange('Descripcion')}
                        error={ticketsData?.errField === 'Descripcion'}
                        helperText={ticketsData?.errField === 'Descripcion' && ticketsData.errMessage}
                      />
                    </div>

                    <div title="div">
                      <Typography variant="subtitle2">Importancia</Typography>

                      <TextField
                        select
                        margin="normal"
                        label="Importancia"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={Ticketsdata.Importancia}
                        onChange={handleTicketsChange('Importancia')}
                      >
                        <MenuItem key="Alta" value="Alta">
                          Alta
                        </MenuItem>

                        <MenuItem key="Baja" value="Baja">
                          Baja
                        </MenuItem>
                      </TextField>
                    </div>

                    <div title="div">
                      <Typography variant="subtitle2">Email</Typography>

                      <TextField variant="outlined" margin="normal" type="text" value={loadedUser?.Email} />
                    </div>

                    <div title="div">
                      <Button
                        variant="contained"
                        color="primary"
                        onClickCapture={(e) => {
                          cargarTicket()
                        }}
                      >
                        Cargar Ticket
                      </Button>
                    </div>
                  </div>
                </React.Fragment>
              )}
            </div>
          </Container>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CrearTicket
