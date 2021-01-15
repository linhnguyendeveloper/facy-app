import {
  GET_TEACHERS_SUCCESS
  // POST_TEACHERS_SUCCESS,
  // POST_MANY_TEACHERS_SUCCESS,
  // UPDATE_TEACHERS_SUCCESS,
  // UPDATE_MANY_TEACHERS_SUCCESS,
  // DELETE_MANY_TEACHERS_SUCCESS,
  // DELETE_ONE_TEACHERS_SUCCESS
} from './actionTypes'
// import 
// getTeachersApi,
// postTeachersApi,
// postManyTeachersApi,
// updateTeachersApi,
// updateManyTeachersApi,
// deleteOneTeachersApi,
// deleteManyTeachersApi
// '../../services/api/teachers'
import data from '../../mockData'
function get_all_teachers(teachers) {
  return {
    type: GET_TEACHERS_SUCCESS,
    teachers: teachers
  }
}
export const getTeachers = token => {
  return dispatch => {
    dispatch(get_all_teachers(data.teachers))
    //   getTeachersApi(token)
    //     .then(res => {
    //       dispatch(get_all_teachers(res?.data))
    //     })
    //     .catch(err => {})
    // }
  }
}
