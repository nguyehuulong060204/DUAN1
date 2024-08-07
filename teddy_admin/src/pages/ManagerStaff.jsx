import { Table } from 'antd'
import { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import CustomModal from '../components/CustomModal'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMember, getMembers, resetState } from '../features/members/memberSlice'
import moment from 'moment'

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
    title: 'Số điện thoại',
    dataIndex: 'phone'
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'created'
  },
  {
    title: 'Chức vụ',
    dataIndex: 'position'
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
]

const ManagerStaff = () => {
  const dispatch = useDispatch()
  const [staffId, setStaffId] = useState('')
  const [open, setOpen] = useState(false)

  const showModal = (e) => {
    setOpen(true)
    setStaffId(e)
  }

  const hideModal = () => {
    setOpen(false)
  }

  const deleteStaff = () => {
    dispatch(deleteMember(staffId))
    setOpen(false)
    setTimeout(() => {
      dispatch(getMembers())
    }, 1000)
  }

  useEffect(() => {
    dispatch(getMembers())
    dispatch(resetState())
  }, [dispatch])

  const memberState = useSelector((state) => state.member?.members?.members)
  let data1 = []

  for (let i = 0; i < memberState?.length; i++) {
    data1.push({
      key: i + 1,
      name: memberState[i].fullName,
      email: memberState[i].email,
      phone: memberState[i].phoneNumber || 'Chưa cập nhật',
      position: memberState[i].position,
      created: moment(memberState[i].createdAt).format('DD/MM/YYYY'),
      action: (
        <div className="d-flex">
          <Link to={`/admin/edit-member/${memberState[i]._id}`} className=" fs-3 text-warning">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(memberState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </div>
      )
    })
  }

  return (
    <div>
      <h3 className="text-center fs-3">Danh sách nhân viên</h3>
      <CustomInput type="text" name="search-user" label="Tìm kiếm nhân viên" i_class="mb-2" />

      <Table columns={columns} dataSource={data1} />
      <CustomModal
        open={open}
        hideModal={hideModal}
        performAction={() => {
          deleteStaff(staffId)
        }}
        content="Bạn có chắc chắn muốn xóa người dùng này ?"
      />
    </div>
  )
}

export default ManagerStaff
