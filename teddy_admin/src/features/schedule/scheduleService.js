import axios from '../../utils/axiosconfig'
import { base_url } from '../../utils/base_url'

const getAllSchedule = async (eventId) => {
  let response
  if (eventId) {
    response = await axios.get(`${base_url}schedule?event=${eventId}`)
  } else {
    response = await axios.get(`${base_url}schedule`)
  }

  if (response.status === 200) {
    return response.data
  }
}

const getSchedule = async (id) => {
  const response = await axios.get(`${base_url}schedule/${id}`)

  if (response.status === 200) {
    return response.data
  }
}

const createSchedule = async (scheduleData) => {
  const response = await axios.post(`${base_url}schedule/`, scheduleData)

  if (response.status === 200) {
    return response.data
  }
}

const updateSchedule = async (id, scheduleData) => {
  const response = await axios.put(`${base_url}schedule/${id}`, scheduleData)

  if (response.status === 200) {
    return response.data
  }
}

const deleteSchedule = async (id) => {
  const response = await axios.delete(`${base_url}schedule/${id}`)

  if (response.status === 200) {
    return response.data
  }
}

export const scheduleService = {
  getAllSchedule,
  getSchedule,
  createSchedule,
  updateSchedule,
  deleteSchedule
}
