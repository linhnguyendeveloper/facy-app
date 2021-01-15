import {
  GET_TEACHERS_SUCCESS,
  UPDATE_TEACHERS_SUCCESS,
  POST_TEACHERS_SUCCESS,
  DELETE_ONE_TEACHERS_SUCCESS,
  DELETE_MANY_TEACHERS_SUCCESS
} from './actionTypes'

const initState = {
  teachers: []
}

export default function (state = initState, action) {
  switch (action.type) {
    case GET_TEACHERS_SUCCESS:
      return {
        ...state,
        teachers: action.teachers
      }
    case POST_TEACHERS_SUCCESS:
      return {
        ...state
      }
    case UPDATE_TEACHERS_SUCCESS:
      return {
        ...state
      }
    case DELETE_ONE_TEACHERS_SUCCESS:
      return {
        ...state
      }
    case DELETE_MANY_TEACHERS_SUCCESS:
      return {
        ...state
      }
    default:
      return {
        ...state
      }
  }
}
