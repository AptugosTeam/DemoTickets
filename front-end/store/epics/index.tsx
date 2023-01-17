import { combineEpics, createEpicMiddleware } from 'redux-observable'

import usersEpics from './usersEpics'

import ticketsEpics from './ticketsEpics'

import { Action } from 'redux'
import { IState } from '../reducers'

export const rootEpic = combineEpics(
  usersEpics,

  ticketsEpics
)

export default createEpicMiddleware<Action, Action, IState>()
