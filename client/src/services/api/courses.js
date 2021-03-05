import baseUrl from './index'
import makeRequest from '../config/makeRequest'
const courseUrl = `${baseUrl}/pv/subjects/getCurrent`
export const getCurrentCourseApi = (data, token) =>
  makeRequest('get',courseUrl, data, token)
  export const getCountCurrentApi = (data, token) =>
  makeRequest('get',baseUrl+'/pv/attendances/getCountCurrent', data, token)
  export const getCountStudentApi = (data, token) =>
  makeRequest('get',baseUrl+'/pv/class/getCountStudent', data, token)
export default {
    getCurrentCourseApi,
    getCountCurrentApi,
    getCountStudentApi
}
