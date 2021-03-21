import {
  GET_ATTENDANCES_SUCCESS,
  // POST_ATTENDANCES_SUCCESS,
  // POST_MANY_ATTENDANCES_SUCCESS,
  // UPDATE_ATTENDANCES_SUCCESS,
  // UPDATE_MANY_ATTENDANCES_SUCCESS,
  // DELETE_MANY_ATTENDANCES_SUCCESS,
  // DELETE_ONE_ATTENDANCES_SUCCESS,,
  GET_USER_ATTENDANCES_SUCCESS,
  GET_ATTENDANCES_CLASS
} from './actionTypes'
// import 
// getAttendancesApi,
// postAttendancesApi,
// postManyAttendancesApi,
// updateAttendancesApi,
// updateManyAttendancesApi,
// deleteOneAttendancesApi,
// deleteManyAttendancesApi
// '../../services/api/attendances'
import data from '../../mockData'
import dataJson from '../../SSC102.json'
import dataJson2 from '../../ITE302b.json'
import {getUserAttendancesApi,getAttendanceClassApi}from '../../services/api/attendances'

function get_all_attendances(attendances) {
  return {
    type: GET_ATTENDANCES_SUCCESS,
    attendances: attendances
  }
}
export const getAttendances = token => {
  return dispatch => {
    dispatch(get_all_attendances([dataJson.data,dataJson2.data]))
    //   getAttendancesApi(token)
    //     .then(res => {
    //       dispatch(get_all_attendances(res?.data))
    //     })
    //     .catch(err => {})
    // }
  }
}
function get_user_attendances(attendances) {
  return {
    type: GET_USER_ATTENDANCES_SUCCESS,
    user_attendances: attendances
  }
}
export const getUserAttendances = email => {
  return dispatch => {
    getUserAttendancesApi(email)
        .then(res => {
          dispatch(get_user_attendances(res?.data))
        })
        .catch(err => {})
    }
  
}

function get_attendance_class(attendances) {
  return {
    type: GET_ATTENDANCES_CLASS,
    class_attendances: attendances
  }
}
export const getAttendanceClass = email => {
  return dispatch => {
    getAttendanceClassApi(email)
        .then(res => {
          dispatch(get_attendance_class(res?.data))
        })
        .catch(err => {})
    }
  
}
