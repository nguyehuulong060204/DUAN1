import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { calculateTokenExpirationTime } from '../../utils/caculateTokenTime'

const login = async (userData) => {
  const response = await axios.post(`${base_url}auth/login-admin`, userData)
  if (response.data) {
    const tokenExpirationTime = calculateTokenExpirationTime() // Tính toán thời gian hết hạn của token
    const userDataWithExpiration = {
      ...response.data,
      expirationTime: tokenExpirationTime
    }
    localStorage.setItem('user_data', JSON.stringify(userDataWithExpiration))
  }
  return response.data
}

const logout = async () => {
  const response = await axios.get(`${base_url}auth/logout`)
  localStorage.removeItem('user_data')
  return response
}
export const authSerice = {
  login,
  logout
}
