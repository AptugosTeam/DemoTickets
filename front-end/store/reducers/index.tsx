import { combineReducers } from 'redux'

import usersReducer, { initialUsersState, IUsersState } from './usersReducer'

import ticketsReducer, { initialTicketsState, ITicketsState } from './ticketsReducer'

export interface IState {
  users: IUsersState

  tickets: ITicketsState
}

export const initialState: IState = {
  users: initialUsersState,

  tickets: initialTicketsState,
}

export default combineReducers({
  users: usersReducer,

  tickets: ticketsReducer,
})
