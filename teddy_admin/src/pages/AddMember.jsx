import { DatePicker } from 'antd'
import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import dayjs from 'dayjs'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux'
import Dropzone from 'react-dropzone'
import { deleteImage, resetState, uploadImage } from '../features/upload/uploadSlice'
import { IoMdClose } from 'react-icons/io'
import { createMember, getMemberById, updateMember } from '../features/members/memberSlice'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'

const OPTIONS = [
  'CEO',
  'Nhân viên',
  'Quản lý',
  'Nhân viên kĩ thuật',
  'Nhân viên bán hàng',
  'Nhân viên marketing',
  'Nhân viên kế toán'
]

const schema = Yup.object().shape({
  fullName: Yup.string().required('Vui lòng nhập tên nhân viên'),
  position: Yup.string().required('Vui lòng chọn vị trí'),
  email: Yup.string().email('Vui lòng nhập email hợp lệ').required('Vui lòng nhập email'),
  phoneNumber: Yup.string().required('Vui lòng nhập số điện thoại'),
  startWorkingDate: Yup.date().required('Vui lòng chọn ngày bắt đầu làm việc'),
  endWorkingDate: Yup.date(),
  description: Yup.string().required('Vui lòng nhập mô tả'),
  images: Yup.object(),
  socialMedia: Yup.object().shape({
    facebook: Yup.string(),
    twitter: Yup.string(),
    instagram: Yup.string(),
    zalo: Yup.string()
  })
})

const AddMember = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const memberId = location.pathname.split('/')[3]

  // state
  const [startWorkingDate, setStartWorkingDate] = useState(null)
  const [endWorkingDate, setEndWorkingDate] = useState(null)

  // handle date change
  const handleDateChange = (date) => {
    setStartWorkingDate(date)
    formik.setFieldValue('startWorkingDate', date)
  }
  const handleDateChangeEnd = (date) => {
    setEndWorkingDate(date)
    formik.setFieldValue('endWorkingDate', date)
  }

  // upload image
  const imageState = useSelector((state) => state.upload?.images)
  let imageAvatar = {}
  imageState.forEach((image) => {
    imageAvatar.public_id = image.public_id
    imageAvatar.url = image.url
  })
  useEffect(() => {
    formik.setFieldValue('images', imageAvatar)
  }, [imageState])

  // toast message
  const newMember = useSelector((state) => state.member)
  const { isSuccess, isError, isLoading, createdMember, member, updatedMember } = newMember

  useEffect(() => {
    if (Object.keys(createdMember).length > 0) {
      toast.success('Thêm mới thành viên thành công')
    }
    if (Object.keys(updatedMember).length > 0) {
      toast.success('Cập nhật thông tin thành viên thành công')
      setTimeout(() => {
        navigate('/admin/manager-staff')
      }, 1000)
    }
    if (isError) {
      toast.error('Có lỗi, vui lòng thử lại sau!')
    }
  }, [isError, isSuccess, isLoading])

  // get member by id
  useEffect(() => {
    if (memberId !== undefined) {
      dispatch(getMemberById(memberId))
    } else {
      dispatch(resetState())
    }
  }, [memberId])

  const {
    fullName,
    position,
    description,
    images,
    email,
    phoneNumber,
    socialMedia,
    startWorkingDate: startWorkingDateState,
    endWorkingDate: endWorkingDateState
  } = member

  useEffect(() => {
    setStartWorkingDate(startWorkingDateState)
    setEndWorkingDate(endWorkingDateState)
  }, [startWorkingDateState, endWorkingDateState])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: fullName || '',
      position: position || '',
      description: description || '',
      images: images || imageAvatar,
      email: email || '',
      phoneNumber: phoneNumber || '',
      socialMedia: socialMedia || {
        facebook: '',
        twitter: '',
        instagram: '',
        zalo: ''
      },
      startWorkingDate: startWorkingDate,
      endWorkingDate: endWorkingDate
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (memberId !== undefined) {
        let formattedDate = dayjs(values.startWorkingDate).format('MM/DD/YYYY')
        let formattedEndDate = dayjs(values.endWorkingDate).format('MM/DD/YYYY')
        const memberData = {
          id: memberId,
          ...values,
          startWorkingDate: formattedDate,
          endWorkingDate: formattedEndDate
        }
        dispatch(updateMember(memberData))
        dispatch(resetState())
      } else {
        let formattedDate = dayjs(values.startWorkingDate).format('MM/DD/YYYY')
        dispatch(createMember({ ...values, startWorkingDate: formattedDate }))
        formik.resetForm()
        setTimeout(() => {
          dispatch(resetState())
        }, 3000)
      }
    }
  })

  return (
    <div>
      <h3 className="text-center">{memberId ? 'Sửa thông tin' : 'Thêm mới thành viên'}</h3>
      <form className="d-flex flex-column gap-3" onSubmit={formik.handleSubmit}>
        <div>
          <CustomInput
            label="Tên nhân viên"
            name="fullName"
            type="text"
            value={formik.values.fullName}
            onChange={formik.handleChange('fullName')}
            onBlur={formik.handleBlur('fullName')}
          />
          {formik.touched.fullName && formik.errors.fullName ? (
            <div className="text-error">{formik.errors.fullName}</div>
          ) : null}
        </div>
        <div>
          <CustomInput
            label="Địa chỉ email"
            name="email"
            type="email"
            value={formik.values.email}
            onBlur={formik.handleChange('email')}
            onChange={formik.handleChange('email')}
          />
          {formik.touched.email && formik.errors.email ? <div className="text-error">{formik.errors.email}</div> : null}
        </div>
        <div>
          <CustomInput
            label="Số điện thoại"
            name="phoneNumber"
            type="text"
            value={formik.values.phoneNumber}
            onBlur={formik.handleChange('phoneNumber')}
            onChange={formik.handleChange('phoneNumber')}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <div className="text-error">{formik.errors.phoneNumber}</div>
          ) : null}
        </div>

        <div>
          <ReactQuill
            theme="snow"
            name="description"
            placeholder="Mô tả"
            value={formik.values.description}
            onChange={(value) => formik.setFieldValue('description', value)}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-error">{formik.errors.description}</div>
          ) : null}
        </div>
        <div>
          <span>Mạng xã hội</span>
          <div className="d-flex gap-4">
            <CustomInput
              label="Facebook"
              name="facebook"
              type="text"
              value={formik.values.socialMedia['facebook']}
              onBlur={formik.handleChange('socialMedia.facebook')}
              onChange={formik.handleChange('socialMedia.facebook')}
            />
            <CustomInput
              label="Zalo"
              name="zalo"
              type="text"
              value={formik.values.socialMedia['zalo']}
              onBlur={formik.handleChange('socialMedia.zalo')}
              onChange={formik.handleChange('socialMedia.zalo')}
            />
            <CustomInput
              label="Instagram"
              name="instagram"
              type="text"
              value={formik.values.socialMedia['instagram']}
              onBlur={formik.handleChange('socialMedia.instagram')}
              onChange={formik.handleChange('socialMedia.instagram')}
            />
            <CustomInput
              label="Twitter"
              name="twitter"
              type="text"
              value={formik.values.socialMedia['twitter']}
              onBlur={formik.handleChange('socialMedia.twitter')}
              onChange={formik.handleChange('socialMedia.twitter')}
            />
          </div>
        </div>
        <div className="d-flex gap-2 align-items-center">
          <DatePicker
            style={{ width: '25%', height: '50px' }}
            format="DD/MM/YYYY"
            placeholder="Chọn ngày bắt đầu làm việc"
            onChange={handleDateChange}
            value={
              formik.values.startWorkingDate ? dayjs(formik.values.startWorkingDate) : formik.values.startWorkingDate
            }
            name="startWorkingDate"
          />

          {formik.touched.startWorkingDate && formik.errors.startWorkingDate ? (
            <div className="text-error">{formik.errors.startWorkingDate}</div>
          ) : null}

          {memberId && (
            <DatePicker
              style={{ width: '25%', height: '50px' }}
              format="DD/MM/YYYY"
              placeholder="Chọn ngày kết thúc làm việc"
              onChange={handleDateChangeEnd}
              value={formik.values.endWorkingDate ? dayjs(formik.values.endWorkingDate) : formik.values.endWorkingDate}
              name="endWorkingDate"
            />
          )}
        </div>
        <div className="d-flex gap-4">
          <div className="bg-white border-1 p-5 text-center w-50" style={{ cursor: 'pointer' }}>
            <Dropzone onDrop={(acceptedFiles) => dispatch(uploadImage(acceptedFiles))}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Tải lên ảnh đại diện</p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          {imageState?.length > 0 || memberId
            ? formik.values.images && (
                <div style={{ position: 'relative' }}>
                  <img
                    style={{
                      width: '140px',
                      height: '140px',
                      objectFit: 'cover',
                      borderRadius: '4px'
                    }}
                    src={formik.values.images?.url}
                    alt="avatar"
                  />
                  <div
                    onClick={() => dispatch(deleteImage(formik.values.images?.public_id))}
                    style={{ position: 'absolute', right: '0', top: '-5px', fontSize: '20px', cursor: 'pointer' }}
                  >
                    <IoMdClose />
                  </div>
                </div>
              )
            : null}
        </div>
        <div>
          <select
            name="position"
            onChange={formik.handleChange('position')}
            value={formik.values.position}
            onBlur={formik.handleBlur('position')}
            className="form-control py-3 mb-3 w-50"
          >
            <option value="">Chọn vị trí của thành viên</option>
            {OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          {formik.touched.position && formik.errors.position ? (
            <div className="text-error">{formik.errors.position}</div>
          ) : null}
        </div>
        <button type="submit" className="btn btn-primary w-25">
          {memberId ? 'Lưu thông tin' : 'Thêm mới nhân viên'}
        </button>
      </form>
    </div>
  )
}

export default AddMember
