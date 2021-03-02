import baseUrl from './index'
import makeRequest from '../config/makeRequest'
const loginUrl = `${baseUrl}/auth/login`
export const loginApi = (data, token) =>
  makeRequest('post',loginUrl, data, token)
export default {
    loginApi
}