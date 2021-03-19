import baseUrl from './index'
import makeRequest from '../config/makeRequest'
const courseUrl = `${baseUrl}/pv/attendances/getUserAttendances`
export const getUserAttendancesApi = (email, token) =>
  makeRequest('get',courseUrl+"?email="+email, {}, token)
  export const getSchedulesApi = (data, token) =>
  makeRequest('get',baseUrl + '/pv/schedules/view', data, token)
export default {
    getUserAttendancesApi,
    getSchedulesApi
}
