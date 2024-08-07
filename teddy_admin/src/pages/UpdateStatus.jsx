import { Select } from 'antd'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getFeedbackById, resetState, updateFeedbackStatus } from '../features/feedback/feedbackService'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'

const filteredOptions = [
  { label: 'Đang chờ xử lý', value: 'Đang chờ xử lý' },
  { label: 'Đang xử lý', value: 'Đang xử lý' },
  { label: 'Đã hoàn thành', value: 'Đã hoàn thành' },
  { label: 'Đã hủy', value: 'Đã hủy' },
  { label: 'Đã gửi mail', value: 'Đã gửi mail' },
  { label: 'Đã xác nhận', value: 'Đã xác nhận' }
]

const UpdateStatus = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const getFeedbackId = location.pathname.split('/')[3]

  useEffect(() => {
    if (getFeedbackId !== undefined) {
      dispatch(getFeedbackById(getFeedbackId))
    } else {
      dispatch(resetState())
    }
  }, [getFeedbackId])

  const handeleChangeStatus = (value) => {
    dispatch(updateFeedbackStatus({ id: getFeedbackId, status: value }))
  }

  const feedbackState = useSelector((state) => state.feedback)
  const { feedback, isSuccess, isLoading, isError, updatedFeedback } = feedbackState

  useEffect(() => {
    if (Object.keys(updatedFeedback).length > 0) {
      toast.success('Cập nhật trạng thái thành công')
      dispatch(resetState())
      navigate('/admin/feedbacks')
    }
    if (isError) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau!')
    }
  }, [feedback, updatedFeedback, isSuccess, isLoading, isError])

  return (
    <div>
      <h3 className="text-center">Phản hồi từ người dùng</h3>
      <form className="d-flex flex-column gap-3">
        <div>
          <CustomInput label="Tên người dùng" name="name" type="text" value={feedback?.fullName} disabled />
        </div>

        <div>
          <CustomInput label="Email người dùng" name="email" type="email" value={feedback?.email} disabled />
        </div>

        <div>
          <CustomInput label="Nội dung" name="content" type="text" value={feedback?.content} disabled defaultValue="" />
        </div>

        <div>
          <CustomInput
            label="Thời gian gửi"
            name="submitDate"
            type="text"
            value={dayjs(feedback?.submitDate).format('DD/MM/YYYY')}
            disabled
          />
        </div>

        <div>
          <Select
            mode="single"
            name="productCategory"
            placeholder="Chọn trạng thái"
            style={{
              width: '25%',
              fontSize: '18px',
              height: '50px'
            }}
            options={filteredOptions}
            optionLabelProp="label"
            onChange={handeleChangeStatus}
            value={feedback?.status ? feedback?.status : ''}
          />
        </div>
      </form>
    </div>
  )
}

export default UpdateStatus
