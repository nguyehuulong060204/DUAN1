import { DatePicker, Select } from 'antd'
import { useEffect, useState } from 'react'
import Dropzone from 'react-dropzone'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import dayjs from 'dayjs'
import CustomInput from '../components/CustomInput'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { getMembers } from '../features/members/memberSlice'
import { deleteImage, uploadImage, resetState as resetUpdateFile } from '../features/upload/uploadSlice'
import { IoMdClose } from 'react-icons/io'
import { createEvent, getEventById, resetState, updateEvent } from '../features/Event/eventSlice'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'

const { RangePicker } = DatePicker

const typeOptions = [
  { value: 'Sự kiện', label: 'Sự kiện' },
  { value: 'Cuộc thi', label: 'Cuộc thi' },
  { value: 'Hội thảo', label: 'Hội thảo' },
  { value: 'Khác', label: 'Khác' }
]

const schema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập tên sự kiện'),
  members: Yup.array().required('Vui lòng chọn thành viên tham gia'),
  images: Yup.array(),
  time: Yup.date().required('Vui lòng chọn ngày tổ chức sự kiện'),
  location: Yup.string().required(' Vui vòng chọn địa điểm tổ chức'),
  startDate: Yup.date(),
  endDate: Yup.date(),
  tag: Yup.string().required('Vui lòng nhập tag'),
  description: Yup.string().required('Vui lòng nhập mô tả sự kiện'),
  type: Yup.string().required('Vui lòng chọn loại sự kiện'),
  title: Yup.string().required('Vui lòng nhập tiêu đề cho sự kiện')
})

const AddEvent = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  // get event by id
  const eventId = location.pathname.split('/')[3]
  useEffect(() => {
    if (eventId !== undefined) {
      dispatch(getEventById(eventId))
    } else {
      dispatch(resetState())
    }
  }, [eventId])

  // getUserId
  const user = useSelector((state) => state.auth?.user)
  const { id: userId } = user

  // event time
  const handleDateChange = (date) => {
    formik.setFieldValue('time', date)
  }
  const handleChangeRangerDate = (date) => {
    formik.setFieldValue('startDate', date[0])
    formik.setFieldValue('endDate', date[1])
  }

  // upload images
  const imageState = useSelector((state) => state.upload?.images)
  let images = []
  imageState?.forEach((image) => {
    images.push({
      public_id: image.public_id,
      url: image.url
    })
  })
  useEffect(() => {
    formik.setFieldValue('images', images)
  }, [imageState])

  // type
  const handleChangeType = (value) => {
    formik.setFieldValue('type', value)
  }

  // add memeber
  useEffect(() => {
    dispatch(getMembers())
  }, [])
  const memberState = useSelector((state) => state.member.members?.members)
  let memberOptions = []
  memberState?.forEach((member) => {
    memberOptions.push({
      label: member.fullName,
      value: member._id
    })
  })
  const [selectedItems, setSelectedItems] = useState([])
  const filteredOptions = memberOptions.filter((o) => !selectedItems.includes(o.label))
  const handleChangeMember = (value) => {
    setSelectedItems(value)
    formik.setFieldValue('members', value)
  }

  const eventState = useSelector((state) => state.event)
  const { isSuccess, isLoading, isError, createdEvent, event, updatedEvent } = eventState

  // toast message
  useEffect(() => {
    if (Object.keys(createdEvent).length > 0) {
      toast.success('Tạo sự kiện thành công')
    }
    if (Object.keys(updatedEvent).length > 0) {
      toast.success('Cập nhật sự kiện thành công')
      setTimeout(() => {
        navigate('/admin/event-list')
      }, 1000)
    }
    if (isError) {
      toast.error('Có lỗi, vui lòng thử lại sau!')
    }
  }, [isSuccess, isLoading, isError, createdEvent])

  useEffect(() => {
    const newEventImage = event.images ? [...event.images, ...images] : [...images]
    formik.setFieldValue('images', newEventImage)
  }, [event])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: event.name || '',
      members: event.members || [],
      images: [],
      time: event.time || '',
      location: event.location || '',
      startDate: event.startDate || '',
      endDate: event.endDate || '',
      tag: event.tag || '',
      description: event.description || '',
      type: event.type || '',
      title: event.title || ''
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (eventId !== undefined) {
        const formattedTime = dayjs(values.time).format('MM/DD/YYYY')
        const formattedStartDate = dayjs(values.startDate).format('MM/DD/YYYY')
        const formattedEndDate = dayjs(values.endDate).format('MM/DD/YYYY')
        dispatch(
          updateEvent({
            id: eventId,
            ...values,
            time: formattedTime,
            startDate: formattedStartDate,
            endDate: formattedEndDate
          })
        )
        dispatch(resetState())
      } else {
        const formattedTime = dayjs(values.time).format('MM/DD/YYYY')
        const formattedStartDate = dayjs(values.startDate).format('MM/DD/YYYY')
        const formattedEndDate = dayjs(values.endDate).format('MM/DD/YYYY')
        const eventData = {
          name: values.name,
          description: values.description,
          time: formattedTime,
          location: values.location,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          images: values.images,
          tag: values.tag,
          members: values.members,
          createdBy: userId,
          type: values.type,
          title: values.title,
          id: eventId
        }
        dispatch(createEvent(eventData))
        console.log(eventData)
        formik.resetForm()
        setTimeout(() => {
          // dispatch(resetState())
          dispatch(getMembers())
          dispatch(resetUpdateFile())
        }, 2000)
      }
    }
  })

  return (
    <div>
      <h3 className="text-center">{eventId ? 'Sửa thông tin' : 'Tạo mới'} sự kiện</h3>
      <form className="d-flex flex-column gap-3" onSubmit={formik.handleSubmit}>
        <div>
          <CustomInput
            label="Tên sự kiện"
            name="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
          />
          {formik.touched.name && formik.errors.name ? <div className="text-error">{formik.errors.name}</div> : null}
        </div>

        <div>
          <CustomInput
            label="Tiêu đề của sự kiện"
            name="name"
            type="text"
            value={formik.values.title}
            onChange={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
          />
          {formik.touched.title && formik.errors.title ? <div className="text-error">{formik.errors.title}</div> : null}
        </div>

        <div>
          <Select
            mode="multiple"
            name="members"
            placeholder="Chọn thành viên tham gia sự kiện"
            value={formik.values.members}
            onChange={handleChangeMember}
            style={{
              width: '100%',
              fontSize: '15px',
              height: '50px'
            }}
            options={filteredOptions}
            optionLabelProp="label"
          />
          {formik.touched.members && formik.errors.members ? (
            <div className="text-error">{formik.errors.members}</div>
          ) : null}
        </div>

        <div>
          <CustomInput
            label="Địa điểm tổ chức"
            name="location"
            type="text"
            value={formik.values.location}
            onChange={formik.handleChange('location')}
            onBlur={formik.handleBlur('location')}
          />
          {formik.touched.location && formik.errors.location ? (
            <div className="text-error">{formik.errors.location}</div>
          ) : null}
        </div>

        <div>
          <ReactQuill
            theme="snow"
            name="description"
            placeholder="Mô tả của sự kiện"
            value={formik.values.description}
            onChange={(value) => formik.setFieldValue('description', value)}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-error">{formik.errors.description}</div>
          ) : null}
        </div>

        <div>
          <CustomInput
            label="Tag"
            name="Tag"
            type="text"
            value={formik.values.tag}
            onChange={formik.handleChange('tag')}
            onBlur={formik.handleBlur('tag')}
          />
          {formik.touched.tag && formik.errors.tag ? <div className="text-error">{formik.errors.tag}</div> : null}
        </div>

        <div className="">
          <Select
            placeholder="Loai sự kiện"
            value={formik.values.type ? formik.values.type : null}
            onChange={handleChangeType}
            style={{
              width: '25%',
              fontSize: '16px',
              height: '50px'
            }}
            options={typeOptions}
          />
          {formik.touched.type && formik.errors.tag ? <div className="text-error">{formik.errors.tag}</div> : null}
        </div>

        <div className="d-flex flex-column gap-2" style={{ width: '40%' }}>
          <DatePicker
            style={{ width: '100%', height: '50px' }}
            format="DD/MM/YYYY"
            name="time"
            placeholder="Ngày tổ chức sự kiện"
            onChange={handleDateChange}
            value={formik.values.time ? dayjs(formik.values.time) : formik.values.time}
          />
          {formik.touched.time && formik.errors.time ? <div className="text-error">{formik.errors.time}</div> : null}
        </div>

        <div className="">
          <RangePicker
            format="DD/MM/YYYY"
            placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
            style={{ height: '50px', width: '40%' }}
            onChange={handleChangeRangerDate}
            value={
              formik.values.startDate && formik.values.endDate
                ? [dayjs(formik.values.startDate), dayjs(formik.values.endDate)]
                : []
            }
          />
          {formik.touched.startDate && formik.errors.startDate ? (
            <div className="text-error">{formik.errors.startDate}</div>
          ) : null}
        </div>

        <div className="d-flex gap-4">
          <div className="bg-white border-1 p-5 text-center" style={{ cursor: 'pointer', width: '40%' }}>
            <Dropzone onDrop={(acceptedFiles) => dispatch(uploadImage(acceptedFiles))}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Chọn ảnh </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          {formik.values.images.length > 0 &&
            formik.values.images.map((image, index) => {
              return (
                <div style={{ position: 'relative' }} key={index}>
                  <img
                    style={{
                      width: '200px',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '4px'
                    }}
                    src={image.url}
                    alt="productimage"
                  />
                  <div
                    onClick={() => dispatch(deleteImage(image.public_id))}
                    style={{ position: 'absolute', right: '0', top: '-5px', fontSize: '20px', cursor: 'pointer' }}
                  >
                    <IoMdClose />
                  </div>
                </div>
              )
            })}
        </div>

        <button type="submit" className="btn btn-primary w-25">
          {eventId ? 'Lưu' : 'Thêm sự'} sự kiện
        </button>
      </form>
    </div>
  )
}

export default AddEvent
