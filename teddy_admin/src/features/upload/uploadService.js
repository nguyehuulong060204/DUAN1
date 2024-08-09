import axios from '../../utils/axiosconfig'
import { base_url } from '../../utils/base_url'

const uploadImage = async (data) => {
  const response = await axios.post(`${base_url}upload`, data)
  return response.data
}

const deleteImage = async (id) => {
  const response = await axios.delete(`${base_url}upload/${id}`)
  return response.data
}

const uploadService = {
  uploadImage,
  deleteImage
}

export default uploadService
