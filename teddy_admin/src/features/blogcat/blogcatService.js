import axios from '../../utils/axiosconfig'
import { base_url } from '../../utils/base_url'

const getBlogCats = async () => {
  const response = await axios.get(`${base_url}blog/category`)

  if (response.status === 200) {
    return response.data
  }
}

const getBlogCatById = async (id) => {
  const response = await axios.get(`${base_url}blog/category/${id}`)

  if (response.status === 200) {
    return response.data
  }
}

const createBlogCat = async (procatData) => {
  const response = await axios.post(`${base_url}blog/category/`, procatData)

  if (response.status === 200) {
    return response.data
  }
}

const updateBlogCat = async (id, procatData) => {
  const response = await axios.put(`${base_url}blog/category/${id}`, procatData)

  if (response.status === 200) {
    return response.data
  }
}

const deleteBlogCat = async (id) => {
  const response = await axios.delete(`${base_url}blog/category/${id}`)

  if (response.status === 200) {
    return response.data
  }
}

export const blogCatService = {
  getBlogCats,
  getBlogCatById,
  createBlogCat,
  updateBlogCat,
  deleteBlogCat
}
