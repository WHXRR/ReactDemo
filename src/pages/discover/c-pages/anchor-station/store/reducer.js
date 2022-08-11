import { Map } from 'immutable'
import * as actionTypes from './constants'

const defaultState = Map({
  cateList: [],
  hotList: [],
  djList: []
})

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_DJ_CATE:
      return state.set('cateList', action.cateList)
    case actionTypes.CHANGE_DJ_RECOMMEND:
      return state.set('hotList', action.hotList)
    case actionTypes.CHANGE_DJ_TOP_LIST:
      return state.set('djList', action.djList)
    default:
      return state
  }
}

export default reducer