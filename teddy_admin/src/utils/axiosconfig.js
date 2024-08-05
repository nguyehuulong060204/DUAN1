import axios from 'axios'
import { toast } from 'react-toastify'

const axiosConfig = axios.create()

axiosConfig.interceptors.request.use((config) => {
  const token = localStorage.getItem('user_data') ? JSON.parse(localStorage.getItem('user_data')).token : ''

  if (token !== '') {
    const auth = `Bearer ${token}`
    config.headers.Authorization = auth
  }
  config.headers.Accept = 'application/json'

  return config
})

axiosConfig.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      console.log('Lỗi từ server', error.response.data)
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau')
      return Promise.reject(error.response.data)
    } else if (error.request) {
      console.log('Lỗi không nhận được phản hồi từ server', error.request)
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau')
      return Promise.reject('Không nhận được phản hồi từ server')
    } else {
      console.log('Lỗi không thể gửi request', error.message)
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau')
      return Promise.reject('Không thể gửi request')
    }
  }
)

export default axiosConfig
