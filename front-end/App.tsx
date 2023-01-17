import React from 'react'
import { Route, Switch } from 'react-router-dom'

const RetrievePassword = React.lazy(() => import('./Pages/forgot'))

const Users = React.lazy(() => import('./Pages/Users'))

const Tickets = React.lazy(() => import('./Pages/Tickets'))

const CrearTicket = React.lazy(() => import('./Pages/cargaTickets'))

const Admin = React.lazy(() => import('./Pages/Admin'))

const ListadoTickets = React.lazy(() => import('./Pages/listarTickets'))

const Register = React.lazy(() => import('./Pages/register'))

const LoginPage = React.lazy(() => import('./Pages/login'))

const Dashboard = React.lazy(() => import('./Pages/dashboard'))

const App: React.FunctionComponent = (props: any) => {
  const routes = [
    {
      path: '/forgot/:nonce?/:email?',
      name: 'Retrieve Password',
      component: RetrievePassword,
    },

    {
      path: '/Users',
      name: 'Users',
      component: Users,
    },

    {
      path: '/Tickets',
      name: 'Tickets',
      component: Tickets,
    },

    {
      path: '/CrearTicket',
      name: 'Crear Ticket',
      component: CrearTicket,
    },

    {
      path: '/Admin',
      name: 'Admin',
      component: Admin,
    },

    {
      path: '/listaTickets',
      name: 'Listado Tickets',
      component: ListadoTickets,
    },

    {
      path: '/register',
      name: 'Register',
      component: Register,
    },

    {
      path: '/login',
      name: 'Login Page',
      component: LoginPage,
    },

    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    },
  ]

  const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
        return <Route exact path={prop.path} component={prop.component} key={key} />
      })}
    </Switch>
  )

  return (
    <React.Fragment>
      <React.Suspense fallback={<span>Loading</span>}>
        <React.Fragment>{switchRoutes}</React.Fragment>
      </React.Suspense>
    </React.Fragment>
  )
}

export default App
