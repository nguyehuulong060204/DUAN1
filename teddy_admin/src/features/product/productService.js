import axios from '../../utils/axiosconfig'
import { base_url } from '../../utils/base_url'

const getProducts = async () => {
  const response = await axios.get(`${base_url}product`)

  if (response.status === 200) {
    return response.data
  }
}

const getProductById = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`)

  if (response.status === 200) {
    return response.data
  }
}

const createProduct = async (productData) => {
  const response = await axios.post(`${base_url}product/`, productData)

  if (response.status === 200) {
    return response.data
  }
}

const updateProduct = async (id, productData) => {
  const response = await axios.put(`${base_url}product/${id}`, productData)

  if (response.status === 200) {
    return response.data
  }
}

const updateProductPrice = async (id, productData) => {
  const response = await axios.put(`${base_url}product/price/${id}`, productData)

  if (response.status === 200) {
    return response.data
  }
}

const deleteProduct = async (id) => {
  const response = await axios.delete(`${base_url}product/${id}`)

  if (response.status === 200) {
    return response.data
  }
}

const deleteProductPrice = async (productId, attributesId) => {
  const response = await axios.delete(`${base_url}product/price/${productId}/${attributesId}`)

  if (response.status === 200) {
    return response.data
  }
}

export const productService = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  updateProductPrice,
  deleteProduct,
  deleteProductPrice
}
