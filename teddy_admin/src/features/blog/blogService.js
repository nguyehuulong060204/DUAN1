import axios from '../../utils/axiosconfig'
import { base_url } from '../../utils/base_url'

const getBlogs = async () => {
  const response = await axios.get(`${base_url}blog`)

  if (response.status === 200) {
    return response.data
  }
}

const getBlogById = async (id) => {
  const response = await axios.get(`${base_url}blog/${id}`)

  if (response.status === 200) {
    return response.data
  }
}

const createBlog = async (procatData) => {
  const response = await axios.post(`${base_url}blog/`, procatData)

  if (response.status === 200) {
    return response.data
  }
}

const updateBlog = async (id, procatData) => {
  const response = await axios.put(`${base_url}blog/${id}`, procatData)

  if (response.status === 200) {
    return response.data
  }
}

const deleteBlog = async (id) => {
  const response = await axios.delete(`${base_url}blog/${id}`)

  if (response.status === 200) {
    return response.data
  }
}

export const blogService = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
}
