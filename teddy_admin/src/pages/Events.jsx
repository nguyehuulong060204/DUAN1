import { Table } from 'antd'
import { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import CustomModal from '../components/CustomModal'
import { useDispatch, useSelector } from 'react-redux'
import { getEvents, resetState, deleteEvent as removeEvent } from '../features/Event/eventSlice'
import dayjs from 'dayjs'

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key'
  },
  {
    title: 'Tên sự kiện',
    dataIndex: 'name',
    className: 'text-capitalize'
  },
  {
    title: 'Thời gian',
    dataIndex: 'time'
  },
  {
    title: 'Địa điểm',
    dataIndex: 'location'
  },
  {
    title: 'Tag',
    dataIndex: 'tag'
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
]

const Events = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [eventId, setEventId] = useState('')

  const hideModal = () => {
    setOpen(false)
  }

  const showModal = (id) => {
    setEventId(id)
    setOpen(true)
  }

  const deleteEvent = (eventId) => {
    dispatch(removeEvent(eventId))
    setOpen(false)
    setTimeout(() => {
      dispatch(getEvents())
    }, 1000)
  }

  useEffect(() => {
    dispatch(resetState())
    dispatch(getEvents())
  }, [])
  const eventState = useSelector((state) => state.event?.events)

  let data1 = []

  for (let i = 0; i < eventState.length; i++) {
    data1.push({
      key: i + 1,
      name: eventState[i].name,
      time: dayjs(eventState[i].time).format('DD/MM/YYYY'),
      location: eventState[i].location,
      tag: eventState[i].tag,
      action: (
        <div className="d-flex">
          <Link to={`/admin/event-edit/${eventState[i]._id}`} className=" fs-3 text-warning">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(eventState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </div>
      )
    })
  }

  return (
    <div>
      <h3 className="text-center fs-3">Danh sách sự kiện</h3>
      <Link to="/admin/schedule-add" className="btn btn-info text-white">
        Thêm mới lịch trình
      </Link>
      <Table columns={columns} dataSource={data1} />
      <CustomModal
        open={open}
        hideModal={hideModal}
        performAction={() => {
          deleteEvent(eventId)
        }}
        content="Bạn có muốn xóa sự kiện này không ?"
      />
    </div>
  )
}

export default Events
