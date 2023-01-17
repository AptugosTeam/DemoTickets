import React, { FunctionComponent } from 'react'
import baseClasses from './layout.module.scss'

import minimum from '../components/Themes/minimum.module.scss'

import Typography from '@mui/material/Typography'

import { useDispatch } from 'react-redux'

import { loadUsers, searchUsers } from '../store/actions/usersActions'

import { IState } from '../store/reducers/index'

import { useSelector } from 'react-redux'

import TextField from '@mui/material/TextField'

import { IUsersItem } from '../store/models'

import { addUsers } from '../store/actions/usersActions'

import { editUsers } from '../store/actions/usersActions'

import { removeUsersrecord } from '../store/actions/usersActions'

import AddDialog from '../components/Dialog/Dialog'

import Field from '../components/Table/Field'

import FileUpload from '../components/FileUpload/FileUpload'

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

const Users: FunctionComponent = (props: any) => {
  const classes = baseClasses

  const initialDataUsers = {
    FirstName: '',

    LastName: '',

    Email: '',

    Password: '',

    ProfilePic: '',

    Role: '',
  }
  const [Usersdata, setUsersData] = React.useState<any>(initialDataUsers)
  const handleUsersChange = (name: string) => (event: any) => {
    const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
    setUsersData({
      ...Usersdata,
      [name]: value,
    })
  }

  const usersData = useSelector((state: IState) => state.users)

  const theme = minimum

  const [currentUser, setcurrentUser] = React.useState<any>(AuthService.getCurrentUser())

  const [profileMenuAnchor, setprofileMenuAnchor] = React.useState<any>(null)

  const dispatch = useDispatch()

  let searchTimeout = null
  const searchForUsers = (event, field = null) => {
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
    dispatch(options.searchString ? searchUsers(options) : loadUsers(options))
  }

  React.useEffect(() => {
    performsearchFieldload({
      ...searchFieldloadoptions,
    })
  }, [searchFieldloadoptions])

  const [dialogUsersAction, setdialogUsersAction] = React.useState<'add' | 'edit' | 'delete' | ''>('')

  const LocalAddDialog = AddDialog

  const [tableloadoptions, settableloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },

    totalItems: 0,
  })
  const performtableload = (options) => {
    dispatch(options.searchString ? searchUsers(options) : loadUsers(options))
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
                <Typography variant="h4">Tabla Backend Users</Typography>
              </div>

              <Paper>
                <div title="Table Area" className={classes.tableResponsive}>
                  <div title="Table Toolbar" className={theme.tabletoolbar}>
                    <TextField
                      variant="outlined"
                      placeholder="Search Usersrecord..."
                      margin="normal"
                      className={theme.extensibleInput}
                      type="text"
                      onChange={searchForUsers}
                    />

                    <LocalAddDialog
                      isOpen={dialogUsersAction !== ''}
                      onOpen={() => setdialogUsersAction('add')}
                      onSave={() => setdialogUsersAction('')}
                      onClose={() => setdialogUsersAction('')}
                      action={dialogUsersAction}
                      addOptions={{ title: 'Add Usersrecord', text: 'Enter Usersrecord data', button: 'Add' }}
                      editOptions={{ title: 'Edit Usersrecord', text: 'Update Usersrecord data', button: 'Edit' }}
                      removeOptions={{ title: '', text: '', button: '' }}
                      saveDataHandler={(data: IUsersItem) => {
                        if (dialogUsersAction === 'delete') {
                          dispatch(removeUsersrecord(data))
                        } else {
                          dialogUsersAction === 'add' ? dispatch(addUsers(data)) : dispatch(editUsers(data))
                        }
                      }}
                      color="primary"
                      data={Usersdata}
                      initialData={initialDataUsers}
                      setData={setUsersData}
                      allowMultipleSubmit={dialogUsersAction === 'add'}
                    >
                      <TextField
                        margin="dense"
                        label="First Name"
                        type="text"
                        fullWidth
                        className={'field_FirstName'}
                        variant="standard"
                        value={Usersdata.FirstName || ''}
                        onChange={handleUsersChange('FirstName')}
                        error={usersData?.errField === 'FirstName'}
                        helperText={usersData?.errField === 'FirstName' && usersData.errMessage}
                      />

                      <TextField
                        margin="dense"
                        label="Last Name"
                        type="text"
                        fullWidth
                        className={'field_LastName'}
                        variant="standard"
                        value={Usersdata.LastName || ''}
                        onChange={handleUsersChange('LastName')}
                        error={usersData?.errField === 'LastName'}
                        helperText={usersData?.errField === 'LastName' && usersData.errMessage}
                      />

                      <TextField
                        margin="dense"
                        label="Email"
                        type="text"
                        fullWidth
                        className={'field_Email'}
                        variant="standard"
                        value={Usersdata.Email || ''}
                        onChange={handleUsersChange('Email')}
                        error={usersData?.errField === 'Email'}
                        helperText={usersData?.errField === 'Email' && usersData.errMessage}
                      />

                      <TextField
                        margin="dense"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={Usersdata.Password}
                        onChange={handleUsersChange('Password')}
                      />

                      <FileUpload
                        label="Profile Picture"
                        value={Usersdata.ProfilePic}
                        onChange={handleUsersChange('ProfilePic')}
                        variant="standard"
                      />

                      <TextField
                        select
                        margin="dense"
                        label="Role"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={Usersdata.Role}
                        onChange={handleUsersChange('Role')}
                      >
                        <MenuItem key="User" value="User">
                          User
                        </MenuItem>

                        <MenuItem key="Admin" value="Admin">
                          Admin
                        </MenuItem>
                      </TextField>
                    </LocalAddDialog>
                  </div>

                  <div title="Body">
                    <Table
                      tableHead={['First Name', 'Last Name', 'Email', 'Password', 'Profile Picture', 'Role', 'Actions']}
                      tableData={usersData.foundusers.length ? usersData.foundusers : (usersData.users as any)}
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
                      <Field value={(fieldData: any) => fieldData.FirstName} />

                      <Field value={(fieldData: any) => fieldData.LastName} />

                      <Field value={(fieldData: any) => fieldData.Email} />

                      <Field value={'*****'} />

                      <Field value={(fieldData: any) => (fieldData.ProfilePic ? <img src={`/img/${fieldData.ProfilePic}`} /> : <div />)} />

                      <Field value={(fieldData: any) => fieldData.Role} />

                      <div className={classes.actionsArea}>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClickCapture={(e: any) => {
                            setUsersData(e.element)
                            setdialogUsersAction('edit')
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>

                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClickCapture={(e: any) => {
                            dispatch(removeUsersrecord(e.element))
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

export default Users
