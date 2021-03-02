import { combineReducers } from 'redux'
import attendances from './attendances/reducer'
import teachers from './teachers/reducer'
import auth from './auth/reducer'

export default combineReducers({
  attendances,
  teachers,
  auth
})
