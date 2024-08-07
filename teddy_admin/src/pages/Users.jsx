import { Table } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import CustomInput from '../components/CustomInput'
import CustomModal from '../components/CustomModal'
import { blockUser, deleteUser, getUsers, resetState } from '../features/members/memberSlice'
import { TbLockCog } from 'react-icons/tb'
import { toast } from 'react-toastify'
// import moment from 'moment'

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
    title: 'Ngày tạo',
    dataIndex: 'created'
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
]

const Users = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [newOpen, setNewOpen] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [userIdDelete, setUserIdDelete] = useState('')
  const [userIdBlock, setUserIdBlock] = useState('')

  const hideModal = () => {
    setOpen(false)
  }

  const hideNewModal = () => {
    setNewOpen(false)
  }

  const handleSearchUser = () => {
    dispatch(getUsers(userEmail))
    setUserEmail('')
  }

  const deleteUserById = (userId) => {
    if (!userId) dispatch(resetState())
    dispatch(deleteUser(userId))
    setOpen(false)
    setTimeout(() => {
      dispatch(getUsers())
    }, 1000)
  }

  const blockUserById = (userId) => {
    if (!userId) dispatch(resetState())
    dispatch(blockUser(userId))
    setNewOpen(false)
    setTimeout(() => {
      dispatch(getUsers())
    }, 1000)
  }

  useEffect(() => {
    dispatch(resetState())
    dispatch(getUsers())
  }, [dispatch])

  const authState = useSelector((state) => state.member)
  const { blockUser: blockedUser, deletedUser, isSuccess, isError, isLoading } = authState
  useEffect(() => {
    if (Object.keys(blockedUser).length > 0) {
      toast.success('Bạn đã chặn người dùng thành công')
      dispatch(resetState())
    }
    if (Object.keys(deletedUser).length > 0) {
      toast.success('Bạn đã xóa người dùng thành công')
      dispatch(resetState())
    }
    if (isError) {
      toast.warn('Có lỗi, vui lòng thử lại sau!')
    }
  }, [blockedUser, deletedUser, isError, isSuccess, isLoading])

  const usersState = useSelector((state) => state.member?.users?.users)
  const tableData = []

  for (let i = 0; i < usersState?.length; i++) {
    tableData.push({
      key: i + 1,
      name: usersState[i].fullName,
      email: usersState[i].email,
      created: moment(usersState[i].createdAt).format('DD/MM/YYYY'),
      action: (
        <>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => {
              setNewOpen(true)
              setUserIdBlock(usersState[i]._id)
            }}
          >
            <TbLockCog />
          </button>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => {
              setOpen(true)
              setUserIdDelete(usersState[i]._id)
            }}
          >
            <AiFillDelete />
          </button>
        </>
      )
    })
  }

  return (
    <div>
      <h3 className="text-center fs-3">Quản lý người dùng</h3>

      <div className="d-flex align-items-center gap-3">
        <div className="w-25">
          <CustomInput
            value={userEmail}
            onChange={(event) => setUserEmail(event.target.value)}
            type="email"
            name="search-user"
            label="Tìm kiếm người dùng theo email"
            i_class="mb-2"
          />
        </div>
        <button className="btn btn-primary" onClick={handleSearchUser}>
          Tìm kiếm
        </button>
      </div>

      <Table columns={columns} dataSource={tableData} />
      <CustomModal
        open={open}
        hideModal={hideModal}
        performAction={() => {
          deleteUserById(userIdDelete)
        }}
        content="Bạn có chắc chắn muốn xóa người dùng này ?"
      />
      <CustomModal
        open={newOpen}
        hideModal={hideNewModal}
        performAction={() => {
          blockUserById(userIdBlock)
        }}
        content="Bạn có chắc chắn muốn chặn người dùng này ?"
      />
    </div>
  )
}

export default Users
