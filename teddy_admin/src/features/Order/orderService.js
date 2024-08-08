import axios from '../../utils/axiosconfig'
import { base_url } from '../../utils/base_url'

const getAllOrder = async (orderData) => {
  const { status: orderStatus, orderDate, orderMonth } = orderData

  let response = null
  if (!orderStatus && !orderDate && !orderMonth) {
    response = await axios.get(`${base_url}order`)
  }

  if (orderStatus) {
    response = await axios.get(`${base_url}order?status=${orderStatus}`)
  }

  if (orderDate) {
    response = await axios.get(`${base_url}order/date?orderDate=${orderDate}`)
  }

  if (orderMonth) {
    response = await axios.get(`${base_url}order/month?orderMonth=${orderMonth}`)
  }

  if (response.status === 200) {
    return response.data
  }
}

const getOrderById = async (orderId) => {
  const response = await axios.get(`${base_url}order/${orderId}`)

  if (response.status === 200) {
    return response.data
  }
}

const updateStatus = async (orderData) => {
  const response = await axios.put(`${base_url}order/${orderData.orderId}/status`, {
    orderStatus: orderData.orderStatus
  })

  if (response.status === 200) {
    return response.data
  }
}

const updateOrderWhenUserBySuccess = async (orderData) => {
  const response = await axios.put(`${base_url}product/buy`, { orderData: orderData })

  if (response.status === 200) {
    return response.data
  }
}

export const orderService = {
  getAllOrder,
  updateStatus,
  getOrderById,
  updateOrderWhenUserBySuccess
}
