import { combineReducers } from 'redux'
import attendances from './attendances/reducer'
import teachers from './teachers/reducer'

export default combineReducers({
  attendances,
  teachers
})
