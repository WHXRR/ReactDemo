import { Map } from 'immutable'
import * as actionTypes from './constants'

const defaultState = Map({
  profile: {},
  token: '',
  cookie: '',
})

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_PROFILE_INFO:
      return state.set('profile', action.profile)
    case actionTypes.CHANGE_PROFILE_TOKEN:
      return state.set('token', action.token)
    case actionTypes.CHANGE_PROFILE_COOKIE:
      return state.set('cookie', action.cookie)
    default:
      return state
  }
}

export default reducer