import {
  GET_ATTENDANCES_SUCCESS
  // POST_ATTENDANCES_SUCCESS,
  // POST_MANY_ATTENDANCES_SUCCESS,
  // UPDATE_ATTENDANCES_SUCCESS,
  // UPDATE_MANY_ATTENDANCES_SUCCESS,
  // DELETE_MANY_ATTENDANCES_SUCCESS,
  // DELETE_ONE_ATTENDANCES_SUCCESS
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
function get_all_attendances(attendances) {
  return {
    type: GET_ATTENDANCES_SUCCESS,
    attendances: attendances
  }
}
export const getAttendances = token => {
  return dispatch => {
    dispatch(get_all_attendances(data.attendances))
    //   getAttendancesApi(token)
    //     .then(res => {
    //       dispatch(get_all_attendances(res?.data))
    //     })
    //     .catch(err => {})
    // }
  }
}
