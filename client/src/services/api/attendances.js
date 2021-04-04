import baseUrl from './index'
import makeRequest from '../config/makeRequest'
import schedule from './schedulesImport'
const courseUrl = `${baseUrl}/pv/attendances/getUserAttendances`
export const getUserAttendancesApi = (email, token) =>
  makeRequest('get',courseUrl+"?email="+email, {}, token)
  export const getSchedulesApi = (data, token) =>
  makeRequest('get',baseUrl + '/pv/schedules/view', data, token)
  export const getAttendanceClassApi = (className,token) =>
  makeRequest('get',baseUrl + '/pv/attendances/getByClass?class='+className, {}, token)
  export const importScheduleApi = (className,token) =>
  makeRequest('post',baseUrl + '/pv/schedules/create', schedule, token)
export default {
    getUserAttendancesApi,
    getSchedulesApi,
    getAttendanceClassApi,
    importScheduleApi
}
