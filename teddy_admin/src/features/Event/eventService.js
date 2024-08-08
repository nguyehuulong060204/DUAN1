import axios from '../../utils/axiosconfig'
import { base_url } from '../../utils/base_url'

const getEvents = async () => {
  const response = await axios.get(`${base_url}event`)

  if (response.status === 200) {
    return response.data
  }
}

const getEventById = async (id) => {
  const response = await axios.get(`${base_url}event/${id}`)

  if (response.status === 200) {
    return response.data
  }
}

const createEvent = async (eventData) => {
  const response = await axios.post(`${base_url}event/`, eventData)

  if (response.status === 200) {
    return response.data
  }
}

const updateEvent = async (id, eventData) => {
  const response = await axios.put(`${base_url}event/${id}`, eventData)

  if (response.status === 200) {
    return response.data
  }
}

const deleteEvent = async (id) => {
  const response = await axios.delete(`${base_url}event/${id}`)

  if (response.status === 200) {
    return response.data
  }
}

export const eventService = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
}
