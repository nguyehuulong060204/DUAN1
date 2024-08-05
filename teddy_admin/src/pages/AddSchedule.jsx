import { DatePicker, Select, TimePicker } from 'antd'
import { useFormik } from 'formik'
import 'react-quill/dist/quill.snow.css'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import CustomInput from '../components/CustomInput'
import { useEffect } from 'react'
import { getEvents } from '../features/Event/eventSlice'
import dayjs from 'dayjs'
import { createSchedule, resetState, getScheduleById, updateSchedule } from '../features/schedule/scheduleSlice'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'

const typeOptions = [
  { value: 'Offline', label: 'Offline' },
  { value: 'Online', label: 'Online' }
]

const schema = Yup.object().shape({
  name: Yup.string().required('Tên lịch trình không được để trống'),
  date: Yup.string().required('Thời gian không được để trống'),
  time: Yup.string().required('Thời gian không được để trống'),
  type: Yup.array().required('Hình thức tổ chức không được để trống'),
  eventId: Yup.string().required('Sự kiện không được để trống')
})

const AddSchedule = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const getScheduleId = location.pathname.split('/')[3]

  useEffect(() => {
    if (getScheduleId !== undefined) {
      dispatch(getScheduleById(getScheduleId))
    } else {
      dispatch(resetState())
    }
  }, [getScheduleId])

  useEffect(() => {
    dispatch(getEvents())
  }, [])

  const eventState = useSelector((state) => state.event?.events)
  const eventOptions = []
  for (let i = 0; i < eventState.length; i++) {
    eventOptions.push({
      value: eventState[i]._id,
      label: eventState[i].name
    })
  }
  const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  const handleChangeEvent = (eventId) => {
    formik.setFieldValue('eventId', eventId)
  }

  const handleDateChange = (date) => {
    formik.setFieldValue('date', date)
  }

  const handleTimeChange = (time) => {
    formik.setFieldValue('time', time)
  }

  const handleChangeType = (type) => {
    formik.setFieldValue('type', type)
  }

  const scheduleState = useSelector((state) => state.schedule)
  const { isSuccess, isError, isLoading, createdSchedule, schedule, updatedSchedule } = scheduleState

  useEffect(() => {
    if (Object.keys(createdSchedule).length > 0) {
      toast.success('Tạo lịch trình thành công')
    }
    if (Object.keys(updatedSchedule).length > 0) {
      toast.success('Cập nhật lịch trình thành công')
      setTimeout(() => {
        navigate('/admin/schedules')
      }, 1000)
    }
    if (isError) {
      toast.error('Có lỗi, vui lòng thử lại!')
    }
  }, [isSuccess, isError, isLoading, createdSchedule])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: schedule.name || '',
      date: schedule.date || '',
      time: schedule.time || '',
      type: schedule.type || '',
      eventId: schedule.eventId || ''
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getScheduleId !== undefined) {
        const scheduleValue = {
          name: values.name,
          time: values.time,
          date: values.date,
          eventId: values.eventId,
          type: values.type,
          id: getScheduleId
        }
        dispatch(updateSchedule(scheduleValue))
        dispatch(resetState())
      } else {
        const formattedDate = dayjs(values.date, 'MM/DD/YYYY').toDate()
        const formattedTime = dayjs(values.time, 'HH:mm').toDate()
        const scheduleValue = {
          name: values.name,
          time: formattedTime,
          date: formattedDate,
          eventId: values.eventId,
          type: values.type,
          id: getScheduleId
        }
        dispatch(createSchedule(scheduleValue))
        dispatch(resetState())
        formik.resetForm()
        dispatch(getEvents())
      }
    }
  })

  return (
    <div>
      <h3 className="text-center">Thêm lịch trình cho sự kiện</h3>
      <form className="d-flex flex-column gap-3" onSubmit={formik.handleSubmit}>
        <div>
          <CustomInput
            label="Tên lịch trình"
            name="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
          />
          {formik.touched.name && formik.errors.name ? <div className="text-error">{formik.errors.name}</div> : null}
        </div>

        <div className="">
          <Select
            showSearch
            optionFilterProp="children"
            placeholder="Chọn sự kiện"
            value={formik.values.eventId ? formik.values.eventId : null}
            onChange={handleChangeEvent}
            filterOption={filterOption}
            style={{
              width: '25%',
              fontSize: '16px',
              height: '50px'
            }}
            options={eventOptions}
          />
          {formik.touched.eventId && formik.errors.eventId ? (
            <div className="text-error">{formik.errors.eventId}</div>
          ) : null}
        </div>

        <div className="">
          <Select
            mode="multiple"
            name="type"
            placeholder="Hình thức tổ chức"
            style={{
              width: '25%',
              fontSize: '16px',
              height: '50px'
            }}
            value={formik.values.type ? formik.values.type : null}
            onChange={handleChangeType}
            options={typeOptions}
          />
          {formik.touched.type && formik.errors.type ? <div className="text-error">{formik.errors.type}</div> : null}
        </div>

        <div className="d-flex flex-column gap-2" style={{ width: '40%' }}>
          <DatePicker
            style={{ width: '100%', height: '50px' }}
            format="DD/MM/YYYY"
            name="date"
            value={formik.values.date ? dayjs(formik.values.date) : null}
            placeholder="Chọn ngày diễn ra lịch trình"
            onChange={handleDateChange}
          />
          {formik.touched.date && formik.errors.date ? <div className="text-error">{formik.errors.date}</div> : null}
        </div>

        <div className="d-flex flex-column gap-2" style={{ width: '40%' }}>
          <TimePicker
            style={{ width: '100%', height: '50px' }}
            format="HH:mm"
            name="time"
            placeholder="Chọn thời gian"
            value={formik.values.time ? dayjs(formik.values.time) : null}
            onChange={handleTimeChange}
          />
          {formik.touched.time && formik.errors.time ? <div className="text-error">{formik.errors.time}</div> : null}
        </div>

        <button className="btn btn-primary w-25">Thêm lịch trình</button>
      </form>
    </div>
  )
}

export default AddSchedule
