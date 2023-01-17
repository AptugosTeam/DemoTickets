import React, { FunctionComponent } from 'react'
import baseClasses from './layout.module.scss'

import { loadTickets, searchTickets } from '../store/actions/ticketsActions'

import { IState } from '../store/reducers/index'

import { useDispatch } from 'react-redux'

import { useSelector } from 'react-redux'

import minimum from '../components/Themes/minimum.module.scss'

import IconButton from '@mui/material/IconButton'
import Table from '../components/Table/Table'

import Field from '../components/Table/Field'

import Pagination from '../components/Pagination'

import Container from '@mui/material/Container'

import SettingsIcon from '@mui/icons-material/Settings'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { NavLink } from 'react-router-dom'

import ListItem from '@mui/material/ListItem'

import ListItemText from '@mui/material/ListItemText'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import AuthService from '../services/auth.service'

const ListadoTickets: FunctionComponent = (props: any) => {
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

  const dispatch = useDispatch()

  const [LoadfromDatabaseloadoptions, setLoadfromDatabaseloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 5000,
    sort: { field: null, method: 'DESC' },

    totalItems: 0,
  })
  const performLoadfromDatabaseload = (options) => {
    dispatch(options.searchString ? searchTickets(options) : loadTickets(options))
  }

  React.useEffect(() => {
    performLoadfromDatabaseload({
      ...LoadfromDatabaseloadoptions,
    })
  }, [LoadfromDatabaseloadoptions])

  const [tableloadoptions, settableloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 10,
    sort: { field: null, method: 'DESC' },

    totalItems: 0,
  })
  const performtableload = (options) => {
    dispatch(options.searchString ? searchTickets(options) : loadTickets(options))
  }

  React.useEffect(() => {
    performtableload({
      ...tableloadoptions,
    })
  }, [tableloadoptions])

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

        <div title="div" className={theme.mainarea}>
          <div title="div" className={classes.bigHello}>
            <Container maxWidth="lg">
              <Container maxWidth="xl">
                <Container maxWidth="md">
                  <Table
                    tableHead={['ID', 'Nombre', 'Descripcion', 'Importancia', 'Usuario']}
                    tableData={ticketsData.foundtickets.length ? ticketsData.foundtickets : (ticketsData.tickets as any)}
                    orderBy={tableloadoptions.sort.field}
                    order={tableloadoptions.sort.method}
                    onRequestSort={(event, property) => {
                      settableloadoptions({
                        ...tableloadoptions,
                        sort: {
                          field: property,
                          method: tableloadoptions.sort.field === property ? (tableloadoptions.sort.method === 'asc' ? 'desc' : 'asc') : 'ASC',
                        },
                      })
                    }}
                  >
                    <Field value={(fieldData: any) => fieldData.ID} />

                    <Field value={(fieldData: any) => fieldData.Nombre} />

                    <Field value={(fieldData: any) => fieldData.Descripcion} />

                    <Field value={(fieldData: any) => fieldData.Importancia} />

                    <Field value={(fieldData: any) => fieldData.Usuario} />
                  </Table>

                  <Pagination
                    itemsPerPage={tableloadoptions.limit}
                    currentPage={tableloadoptions.page}
                    setPage={(page) => {
                      settableloadoptions({ ...tableloadoptions, page: page })
                    }}
                    totalItems={ticketsData.totalDocs}
                  />
                </Container>
              </Container>
            </Container>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ListadoTickets
