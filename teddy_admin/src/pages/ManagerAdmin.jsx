import { Table } from 'antd'
import { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import CustomModal from '../components/CustomModal'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux'
import { getAdmins, grantAdminPermissionByEmail, resetState } from '../features/members/memberSlice'
import moment from 'moment'
import { toast } from 'react-toastify'

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
    title: 'Action',
    dataIndex: 'action'
  }
]

const ManagerAdmin = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  const hideModal = () => {
    setOpen(false)
  }

  const deleteAdmin = () => {
    // do something
    setOpen(false)
  }

  useEffect(() => {
    dispatch(resetState())
    dispatch(getAdmins())
  }, [dispatch])

  const handleChangeAdmin = () => {
    if (!userEmail) {
      toast.warn('Vui lòng nhập email!')
      return
    }
    dispatch(grantAdminPermissionByEmail({ email: userEmail }))
    setTimeout(() => {
      dispatch(getAdmins())
      dispatch(resetState())
      setUserEmail('')
    }, 1000)
  }

  const adminState = useSelector((state) => state.member?.admins?.users)
  const showMessageData = useSelector((state) => state.member)
  const { message, isSuccess, isLoading, isError, updatedRole } = showMessageData
  useEffect(() => {
    if (Object.keys(updatedRole).length > 0) {
      toast.success(message)
    }
  }, [message, isSuccess, isLoading, isError, updatedRole])
  let data1 = []

  for (let i = 0; i < adminState?.length; i++) {
    data1.push({
      key: i + 1,
      name: adminState[i].fullName,
      email: adminState[i].email,
      phone: adminState[i].phoneNumber || 'Chưa cập nhật',
      created: moment(adminState[i].createdAt).format('DD/MM/YYYY'),
      action: (
        <div className="d-flex">
          <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={() => setOpen(true)}>
            <AiFillDelete />
          </button>
        </div>
      )
    })
  }

  return (
    <div>
      <h3 className="text-center fs-3">Danh sách admin</h3>
      <div className="d-flex align-items-center gap-3">
        <div className="w-25">
          <CustomInput
            type="text"
            name="search-user"
            label="Nhập vào email bạn muốn cấp quyền quản trị viên"
            i_class="mb-2"
            onChange={(event) => setUserEmail(event.target.value)}
            value={userEmail}
          />
        </div>
        <button className="btn btn-primary" onClick={handleChangeAdmin}>
          Cấp quyền Admin
        </button>
      </div>

      <Table columns={columns} dataSource={data1} />
      <CustomModal
        open={open}
        hideModal={hideModal}
        performAction={() => {
          deleteAdmin()
        }}
        content="Bạn có chắc chắn muốn xóa người dùng này ?"
      />
    </div>
  )
}

export default ManagerAdmin
