import axios from '../../utils/axiosconfig'
import { base_url } from '../../utils/base_url'

const getFeedbacks = async (status) => {
  if (status) {
    const reponse = await axios.get(`${base_url}feedback?status=${status}`)
    if (reponse.status === 200) {
      return reponse.data
    }
  } else {
    const response = await axios.get(`${base_url}feedback`)
    if (response.status === 200) {
      return response.data
    }
  }
}

const getFeedbackById = async (id) => {
  const response = await axios.get(`${base_url}feedback/${id}`)

  if (response.status === 200) {
    return response.data
  }
}

const updateFeedbackStatus = async (id, status) => {
  const response = await axios.put(`${base_url}feedback/${id}`, status)

  if (response.status === 200) {
    return response.data
  }
}

export const feedbackService = {
  getFeedbacks,
  getFeedbackById,
  updateFeedbackStatus
}
