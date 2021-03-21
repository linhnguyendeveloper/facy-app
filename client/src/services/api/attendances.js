import baseUrl from './index'
import makeRequest from '../config/makeRequest'
const courseUrl = `${baseUrl}/pv/attendances/getUserAttendances`
export const getUserAttendancesApi = (email, token) =>
  makeRequest('get',courseUrl+"?email="+email, {}, token)
  export const getSchedulesApi = (data, token) =>
  makeRequest('get',baseUrl + '/pv/schedules/view', data, token)
  export const getAttendanceClassApi = (className,token) =>
  makeRequest('get',baseUrl + '/pv/attendances/getByClass?class='+className, {}, token)
export default {
    getUserAttendancesApi,
    getSchedulesApi,
    getAttendanceClassApi
}
