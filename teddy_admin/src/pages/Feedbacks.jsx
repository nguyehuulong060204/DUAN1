import { Table } from 'antd'
import { Link } from 'react-router-dom'
import { FcViewDetails } from 'react-icons/fc'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetState, getFeedbacks } from '../features/feedback/feedbackService'
import dayjs from 'dayjs'

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key'
  },
  {
    title: 'Tên người dùng',
    dataIndex: 'name'
  },
  {
    title: 'Email',
    dataIndex: 'email'
  },
  {
    title: 'Nội dung',
    dataIndex: 'content',
    className: 'text-capitalize'
  },
  {
    title: 'Thời gian',
    dataIndex: 'time'
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status'
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
]

const Feedbacks = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetState())
    dispatch(getFeedbacks())
  }, [])

  const feedbackState = useSelector((state) => state.feedback?.feedbacks)

  let data1 = []

  for (let i = 0; i < feedbackState?.length; i++) {
    data1.push({
      key: i + 1,
      name: feedbackState[i].fullName,
      email: feedbackState[i].email,
      content: feedbackState[i].content,
      time: dayjs(feedbackState[i].submitDate).format('DD/MM/YYYY'),
      status: feedbackState[i].status,
      action: (
        <div className="d-flex">
          <Link to={`/admin/update-status/${feedbackState[i]._id}`} className=" fs-3 text-warning">
            <FcViewDetails />
          </Link>
        </div>
      )
    })
  }

  return (
    <div>
      <h3 className="text-center fs-3">Danh sách phản hổi</h3>
      <Table columns={columns} dataSource={data1} />
    </div>
  )
}

export default Feedbacks
