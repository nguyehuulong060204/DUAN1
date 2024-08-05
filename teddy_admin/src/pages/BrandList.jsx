import { Table } from 'antd'
import { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import CustomModal from '../components/CustomModal'
import { useDispatch, useSelector } from 'react-redux'
import { getBrands, resetState, deleteBrand } from '../features/brand/brandSlice'

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key'
  },
  {
    title: 'Tên hãng',
    dataIndex: 'name'
  },
  {
    title: 'Logo',
    dataIndex: 'logo',
    className: 'brand-logo'
  },
  {
    title: 'Danh mục sản phẩm',
    dataIndex: 'proCat'
  },
  {
    title: 'Số lượng sản phẩm',
    dataIndex: 'totalPro'
  },
  {
    title: 'Trạng thái',
    dataIndex: 'active'
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
]

const BrandList = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [brandId, setBrandId] = useState('')

  const showModal = (brandId) => {
    setOpen(true)
    setBrandId(brandId)
  }

  const hideModal = () => {
    setOpen(false)
  }

  const deleteProBrand = () => {
    dispatch(deleteBrand(brandId))
    setOpen(false)
    setTimeout(() => {
      dispatch(getBrands())
    }, 1000)
  }

  useEffect(() => {
    dispatch(resetState())
    dispatch(getBrands())
  }, [])

  const brandsState = useSelector((state) => state.brand?.brands)
  let data1 = []

  for (let i = 0; i < brandsState?.length; i++) {
    data1.push({
      key: i + 1,
      name: brandsState[i].name,
      logo: brandsState[i].logo ? (
        <img
          src={brandsState[i].logo?.url}
          alt="logo"
          style={{ borderRadius: '50%', objectFit: 'cover', width: '50px', height: '50px' }}
        />
      ) : (
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHJflBYqkDr--1vpqgN4fmrVcCmm6uXaeRRAmn_xowrA&s"
          alt="logo"
        />
      ),
      proCat: brandsState[i].productCategory.map((item) => <li key={item._id}>{item.name}</li>),
      active: brandsState[i].isActive === true ? 'Đang hoạt động' : 'Dừng hoạt động',
      totalPro: brandsState[i].totalProduct,
      action: (
        <div className="d-flex">
          <Link to={`/admin/brand-edit/${brandsState[i]._id}`} className=" fs-3 text-warning">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(brandsState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </div>
      )
    })
  }

  return (
    <div>
      <h3 className="text-center fs-3">Danh sách các hãng sản suất</h3>
      <Table columns={columns} dataSource={data1} />
      <CustomModal
        open={open}
        hideModal={hideModal}
        performAction={() => {
          deleteProBrand(brandId)
        }}
        content="Bạn có muốn xóa hãng này khỏi danh sách không ?"
      />
    </div>
  )
}

export default BrandList
