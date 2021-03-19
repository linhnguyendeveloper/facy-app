import {
  GET_TEACHERS_SUCCESS,
  GET_CURRENT_SUCCESS,
  GET_COUNT_CURRENT,
  GET_COUNT_STUDENT,
  GET_SCHEDULES
  // POST_TEACHERS_SUCCESS,
  // POST_MANY_TEACHERS_SUCCESS,
  // UPDATE_TEACHERS_SUCCESS,
  // UPDATE_MANY_TEACHERS_SUCCESS,
  // DELETE_MANY_TEACHERS_SUCCESS,
  // DELETE_ONE_TEACHERS_SUCCESS
} from "./actionTypes";
// import
// getTeachersApi,
// postTeachersApi,
// postManyTeachersApi,
// updateTeachersApi,
// updateManyTeachersApi,
// deleteOneTeachersApi,
// deleteManyTeachersApi
// '../../services/api/teachers'
import data from "../../mockData";
import {
  getCurrentCourseApi,
  getCountCurrentApi,
  getCountStudentApi,
} from "./../../services/api/courses";
import {
  getSchedulesApi
}from "./../../services/api/attendances";
function get_all_teachers(teachers) {
  return {
    type: GET_TEACHERS_SUCCESS,
    teachers: teachers,
  };
}
export const getTeachers = (token) => {
  return (dispatch) => {
    dispatch(get_all_teachers(data.teachers));
    //   getTeachersApi(token)
    //     .then(res => {
    //       dispatch(get_all_teachers(res?.data))
    //     })
    //     .catch(err => {})
    // }
  };
};
function get_current(current) {
  return {
    type: GET_CURRENT_SUCCESS,
    currentCourse: current,
  };
}
export const getCurrentCourse = (token) => {
  return (dispatch) => {
    getCurrentCourseApi()
      .then((res) => {
        dispatch(get_current(res?.data.id));
      })
      .catch((err) => {});
  };
};
function get_current_count(current) {
  return {
    type: GET_COUNT_CURRENT,
    countCurrent: current,
  };
}
export const getCountCurrent = (token) => {
  return (dispatch) => {
    getCountCurrentApi()
      .then((res) => {
        dispatch(get_current_count(res?.data.count));
      })
      .catch((err) => {});
  };
};
function get_student_count(current) {
  return {
    type: GET_COUNT_STUDENT,
    countStudent: current,
  };
}
export const getCountStudent = (token) => {
  return (dispatch) => {
    getCountStudentApi()
      .then((res) => {
        dispatch(get_student_count(res?.data.count));
      })
      .catch((err) => {});
  };
};
function get_schedules(current) {
  return {
    type: GET_SCHEDULES,
    schedules: current,
  };
}
export const getSchedules = (token) => {
  return (dispatch) => {
    getSchedulesApi()
      .then((res) => {
        dispatch(get_schedules(res?.data));
      })
      .catch((err) => {});
  };
};
