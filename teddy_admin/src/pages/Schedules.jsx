import { Table, Select } from 'antd'
import { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import CustomModal from '../components/CustomModal'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { getEvents } from '../features/Event/eventSlice'
import {
  getAllSchedule,
  resetState as resetStateSchedule,
  deleteSchedule as removeSchedule
} from '../features/schedule/scheduleSlice'

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key'
  },
  {
    title: 'Tên sự kiện',
    dataIndex: 'eventName',
    className: 'text-capitalize'
  },
  {
    title: 'Tên lịch trình',
    dataIndex: 'scheduleName',
    className: 'text-capitalize'
  },
  {
    title: 'Ngày',
    dataIndex: 'date'
  },
  {
    title: 'Thời gian',
    dataIndex: 'time'
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
]

const Schedules = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [eventId, setEventId] = useState('')
  const [scheduleId, setScheduleId] = useState()

  const handleChangeEvent = (event) => {
    setEventId(event)
  }

  const hideModal = () => {
    setOpen(false)
  }

  const showModal = (id) => {
    setScheduleId(id)
    setOpen(true)
  }

  const deleteSchedule = (scheduleId) => {
    dispatch(removeSchedule(scheduleId))
    setOpen(false)
    setTimeout(() => {
      dispatch(getAllSchedule(eventId))
    }, 1000)
  }

  useEffect(() => {
    dispatch(resetStateSchedule())
    dispatch(getEvents())
  }, [])

  useEffect(() => {
    if (eventId !== '') {
      dispatch(getAllSchedule(eventId))
    } else {
      dispatch(getAllSchedule())
    }
  }, [eventId])

  const scheduleState = useSelector((state) => state.schedule?.schedules)

  const eventState = useSelector((state) => state.event?.events)
  const eventOptions = eventState?.map((event) => ({ label: event.name, value: event._id }))

  let data1 = []
  for (let i = 0; i < scheduleState?.length; i++) {
    data1.push({
      key: i + 1,
      eventName: scheduleState[i].eventId?.name,
      scheduleName: scheduleState[i].name,
      date: dayjs(scheduleState[i].date).format('DD/MM/YYYY'),
      time: dayjs(scheduleState[i].time).format('HH:mm'),
      action: (
        <div className="d-flex">
          <Link to={`/admin/schedule-edit/${scheduleState[i]._id}`} className=" fs-3 text-warning">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(scheduleState[i]._id)}
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
      <Select
        name="type"
        placeholder="Chọn sự kiện"
        style={{
          width: '25%',
          fontSize: '16px',
          height: '40px',
          marginLeft: '20px'
        }}
        onChange={handleChangeEvent}
        value={eventId ? eventId : null}
        defaultValue={eventOptions[0]?.value}
        options={eventOptions}
        optionLabelProp="label"
      />
      <Table columns={columns} dataSource={data1} />
      <CustomModal
        open={open}
        hideModal={hideModal}
        performAction={() => {
          deleteSchedule(scheduleId)
        }}
        content="Bạn có muốn xóa lịch trình này không ?"
      />
    </div>
  )
}

export default Schedules
