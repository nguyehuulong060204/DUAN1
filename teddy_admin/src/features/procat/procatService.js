import axios from '../../utils/axiosconfig'
import { base_url } from '../../utils/base_url'

const getProcat = async () => {
  const response = await axios.get(`${base_url}product/category`)

  if (response.status === 200) {
    return response.data
  }
}

const getProcatById = async (id) => {
  const response = await axios.get(`${base_url}product/category/${id}`)

  if (response.status === 200) {
    return response.data
  }
}

const createProcat = async (procatData) => {
  const response = await axios.post(`${base_url}product/category/`, procatData)

  if (response.status === 200) {
    return response.data
  }
}

const updateProcat = async (id, procatData) => {
  const response = await axios.put(`${base_url}product/category/${id}`, procatData)

  if (response.status === 200) {
    return response.data
  }
}

const deleteProcat = async (id) => {
  const response = await axios.delete(`${base_url}product/category/${id}`)

  if (response.status === 200) {
    return response.data
  }
}

const addProductToCategory = async (procatData) => {
  const response = await axios.put(`${base_url}product/category/addProductToCategory`, procatData)

  if (response.status === 200) {
    return response.data
  }
}

const removeProductFromCategory = async (procatData) => {
  const response = await axios.put(`${base_url}product/category/removeProductFromCategory`, procatData)

  if (response.status === 200) {
    return response.data
  }
}

export const procatService = {
  getProcat,
  getProcatById,
  createProcat,
  updateProcat,
  deleteProcat,
  addProductToCategory,
  removeProductFromCategory
}
