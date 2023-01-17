import React, { FunctionComponent } from 'react'
import baseClasses from './layout.module.scss'

import minimum from '../components/Themes/minimum.module.scss'

import Typography from '@mui/material/Typography'

import { useDispatch } from 'react-redux'

import { loadTickets, searchTickets } from '../store/actions/ticketsActions'

import { IState } from '../store/reducers/index'

import { useSelector } from 'react-redux'

import TextField from '@mui/material/TextField'

import { ITicketsItem } from '../store/models'

import { addTickets } from '../store/actions/ticketsActions'

import { editTickets } from '../store/actions/ticketsActions'

import { removeTicket } from '../store/actions/ticketsActions'

import AddDialog from '../components/Dialog/Dialog'

import Field from '../components/Table/Field'

import MenuItem from '@mui/material/MenuItem'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import Table from '../components/Table/Table'

import Paper from '@mui/material/Paper'

import Container from '@mui/material/Container'

import SettingsIcon from '@mui/icons-material/Settings'

import Menu from '@mui/material/Menu'

import { NavLink } from 'react-router-dom'

import ListItem from '@mui/material/ListItem'

import ListItemText from '@mui/material/ListItemText'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import green from '@mui/material/colors/green'

import { createTheme, ThemeProvider } from '@mui/material/styles'

const aptugotheme = createTheme({
  palette: {
    primary: green,
  },
})

import authHeaders from '../services/auth-header'
import AuthService from '../services/auth.service'

const Tickets: FunctionComponent = (props: any) => {
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

  const ticketsData = useSelector((state: IState) => state.tickets)

  const theme = minimum

  const [currentUser, setcurrentUser] = React.useState<any>(AuthService.getCurrentUser())

  const [profileMenuAnchor, setprofileMenuAnchor] = React.useState<any>(null)

  const dispatch = useDispatch()

  let searchTimeout = null
  const searchForTickets = (event, field = null) => {
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      settableloadoptions({
        ...tableloadoptions,
        searchString: event.target.value,
        searchField: field,
      })
    }, 500)
  }

  const [searchFieldloadoptions, setsearchFieldloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },

    totalItems: 0,
  })
  const performsearchFieldload = (options) => {
    dispatch(options.searchString ? searchTickets(options) : loadTickets(options))
  }

  React.useEffect(() => {
    performsearchFieldload({
      ...searchFieldloadoptions,
    })
  }, [searchFieldloadoptions])

  const [dialogTicketsAction, setdialogTicketsAction] = React.useState<'add' | 'edit' | 'delete' | ''>('')

  const LocalAddDialog = AddDialog

  const [tableloadoptions, settableloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
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

  if (!authHeaders()) {
    props.history.push('/Login')
  }

  // Theme selection

  return (
    <React.Fragment>
      <ThemeProvider theme={aptugotheme}>
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

          <div title="div" className={theme.mainarea}>
            <Container maxWidth="lg">
              <div title="Head" className={theme.tableHeading}>
                <Typography variant="h4">Tabla Backend Tickets</Typography>
              </div>

              <Paper>
                <div title="Table Area" className={classes.tableResponsive}>
                  <div title="Table Toolbar" className={theme.tabletoolbar}>
                    <TextField
                      variant="outlined"
                      placeholder="Search Ticket..."
                      margin="normal"
                      className={theme.extensibleInput}
                      type="text"
                      onChange={searchForTickets}
                    />

                    <LocalAddDialog
                      isOpen={dialogTicketsAction !== ''}
                      onOpen={() => setdialogTicketsAction('add')}
                      onSave={() => setdialogTicketsAction('')}
                      onClose={() => setdialogTicketsAction('')}
                      action={dialogTicketsAction}
                      addOptions={{ title: 'Add Ticket', text: 'Enter Ticket data', button: 'Add' }}
                      editOptions={{ title: 'Edit Ticket', text: 'Update Ticket data', button: 'Edit' }}
                      removeOptions={{ title: 'Borrar', text: 'Seguro?', button: 'Confirmar' }}
                      saveDataHandler={(data: ITicketsItem) => {
                        if (dialogTicketsAction === 'delete') {
                          dispatch(removeTicket(data))
                        } else {
                          dialogTicketsAction === 'add' ? dispatch(addTickets(data)) : dispatch(editTickets(data))
                        }
                      }}
                      color="primary"
                      data={Ticketsdata}
                      initialData={initialDataTickets}
                      setData={setTicketsData}
                      allowMultipleSubmit={dialogTicketsAction === 'add'}
                    >
                      <TextField
                        margin="dense"
                        label="ID"
                        className={'field_ID'}
                        type="number"
                        fullWidth
                        variant="standard"
                        value={Ticketsdata.ID || ''}
                        onChange={handleTicketsChange('ID')}
                      />

                      <TextField
                        margin="dense"
                        label="Nombre"
                        type="text"
                        fullWidth
                        className={'field_Nombre'}
                        variant="standard"
                        value={Ticketsdata.Nombre || ''}
                        onChange={handleTicketsChange('Nombre')}
                        error={ticketsData?.errField === 'Nombre'}
                        helperText={ticketsData?.errField === 'Nombre' && ticketsData.errMessage}
                      />

                      <TextField
                        margin="dense"
                        label="Descripcion"
                        type="text"
                        fullWidth
                        className={'field_Descripcion'}
                        variant="standard"
                        value={Ticketsdata.Descripcion || ''}
                        onChange={handleTicketsChange('Descripcion')}
                        error={ticketsData?.errField === 'Descripcion'}
                        helperText={ticketsData?.errField === 'Descripcion' && ticketsData.errMessage}
                      />

                      <TextField
                        select
                        margin="dense"
                        label="Importancia"
                        type="text"
                        fullWidth
                        variant="standard"
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

                      <TextField
                        margin="dense"
                        label="Usuario"
                        type="text"
                        fullWidth
                        className={'field_Usuario'}
                        variant="standard"
                        value={Ticketsdata.Usuario || ''}
                        onChange={handleTicketsChange('Usuario')}
                        error={ticketsData?.errField === 'Usuario'}
                        helperText={ticketsData?.errField === 'Usuario' && ticketsData.errMessage}
                      />
                    </LocalAddDialog>
                  </div>

                  <div title="Body">
                    <Table
                      tableHead={['ID', 'Nombre', 'Descripcion', 'Importancia', 'Usuario', 'Actions']}
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

                      <div className={classes.actionsArea}>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClickCapture={(e: any) => {
                            setTicketsData(e.element)
                            setdialogTicketsAction('edit')
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>

                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClickCapture={(e: any) => {
                            setTicketsData(e.element)
                            setdialogTicketsAction('delete')
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </div>
                    </Table>
                  </div>
                </div>
              </Paper>
            </Container>
          </div>
        </div>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default Tickets
