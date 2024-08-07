import { Table } from 'antd'
import { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import CustomModal from '../components/CustomModal'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProcat, getProcats, resetState } from '../features/procat/procatSlice'

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key'
  },
  {
    title: 'Tên danh mục',
    dataIndex: 'name'
  },
  // {
  //   title: 'Tổng số sản phẩm',
  //   dataIndex: 'totalPro'
  // },
  {
    title: 'Trạng thái',
    dataIndex: 'active'
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
]

const ProcatList = () => {
  const dispath = useDispatch()
  const [open, setOpen] = useState(false)
  const [procatId, setProcatId] = useState('')

  const showModal = (procatId) => {
    setOpen(true)
    setProcatId(procatId)
  }

  const hideModal = () => {
    setOpen(false)
  }

  const deleteProductCat = () => {
    dispath(deleteProcat(procatId))
    setOpen(false)
    setTimeout(() => {
      dispath(getProcats())
    }, 1000)
  }

  useEffect(() => {
    dispath(resetState())
    dispath(getProcats())
  }, [dispath])

  const procatState = useSelector((state) => state.procat?.procats)
  let data1 = []

  for (let i = 0; i < procatState?.length; i++) {
    data1.push({
      key: i + 1,
      name: procatState[i].name,
      // totalPro: 20,
      active: procatState[i].isActive === true ? 'Hoạt động' : 'Không hoạt động',
      action: (
        <div className="d-flex">
          <Link to={`/admin/procat-edit/${procatState[i]._id}`} className=" fs-3 text-warning">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(procatState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </div>
      )
    })
  }

  return (
    <div>
      <h3 className="text-center fs-3">Danh mục sản phẩm</h3>
      <Table columns={columns} dataSource={data1} />
      <CustomModal
        open={open}
        hideModal={hideModal}
        performAction={() => {
          deleteProductCat(procatId)
        }}
        content="Bạn danh mục sản phẩm này không ?"
      />
    </div>
  )
}

export default ProcatList
