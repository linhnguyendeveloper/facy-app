import {
  GET_ATTENDANCES_SUCCESS,
  UPDATE_ATTENDANCES_SUCCESS,
  POST_ATTENDANCES_SUCCESS,
  DELETE_ONE_ATTENDANCES_SUCCESS,
  DELETE_MANY_ATTENDANCES_SUCCESS
} from './actionTypes'

const initState = {
  attendances: []
}

export default function (state = initState, action) {
  switch (action.type) {
    case GET_ATTENDANCES_SUCCESS:
      return {
        ...state,
        attendances: action.attendances
      }
    case POST_ATTENDANCES_SUCCESS:
      return {
        ...state
      }
    case UPDATE_ATTENDANCES_SUCCESS:
      return {
        ...state
      }
    case DELETE_ONE_ATTENDANCES_SUCCESS:
      return {
        ...state
      }
    case DELETE_MANY_ATTENDANCES_SUCCESS:
      return {
        ...state
      }
    default:
      return {
        ...state
      }
  }
}
