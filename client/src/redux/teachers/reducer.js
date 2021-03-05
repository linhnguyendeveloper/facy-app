import {
  GET_TEACHERS_SUCCESS,
  UPDATE_TEACHERS_SUCCESS,
  GET_CURRENT_SUCCESS,
  DELETE_ONE_TEACHERS_SUCCESS,
  DELETE_MANY_TEACHERS_SUCCESS,
  GET_COUNT_CURRENT,
  GET_COUNT_STUDENT
} from './actionTypes'

const initState = {
  teachers: [],
  currentCourse:'',
  countCurrent:0,
  countStudent:0
}

export default function (state = initState, action) {
  switch (action.type) {
    case GET_TEACHERS_SUCCESS:
      return {
        ...state,
        teachers: action.teachers
      }
    case GET_CURRENT_SUCCESS:
      console.log(action.currentCourse);
      return {
        ...state,
        currentCourse: action.currentCourse
      }
    case GET_COUNT_CURRENT:
      return {
        ...state,
        countCurrent:action.countCurrent
      }
    case GET_COUNT_STUDENT:
      return {
        ...state,
        countStudent:action.countStudent

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
