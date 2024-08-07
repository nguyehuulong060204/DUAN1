import { Table } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FcViewDetails } from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrder, resetState } from '../features/Order/orderSlice'
import dayjs from 'dayjs'
import { Select } from 'antd'

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key'
  },
  {
    title: 'Tên người đặt hàng',
    dataIndex: 'name'
  },
  {
    title: 'Tên sản phẩm',
    dataIndex: 'product'
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantity'
  },
  {
    title: 'Tổng tiền',
    dataIndex: 'total'
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status'
  },
  {
    title: 'Ngày đặt',
    dataIndex: 'date'
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
]

const statusOptions = [
  { label: 'Chờ xác nhận', value: 'Chờ xác nhận' },
  { label: 'Đã xác nhận', value: 'Đã xác nhận' },
  { label: 'Đang giao hàng', value: 'Đang giao hàng' },
  { label: 'Đã giao hàng', value: 'Đã giao hàng' },
  { label: 'Đã hủy', value: 'Đã hủy' }
]

const Orders = () => {
  const dispatch = useDispatch()
  const [orderStatus, setOrderStatus] = useState('')

  const handleChangeStatus = (value) => {
    setOrderStatus(value)
  }

  const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  useEffect(() => {
    dispatch(resetState())
    dispatch(getAllOrder())
  }, [])

  const handleGetOrder = () => {
    dispatch(getAllOrder({ status: orderStatus }))
  }

  const orderState = useSelector((state) => state.order?.orders)

  let data1 = []

  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i]?.shippingInfo?.fullName,
      product: orderState[i]?.orderItems?.map((item, index) => <li key={index}>{item?.product?.name}</li>),
      quantity: orderState[i]?.orderItems?.map((item, index) => <li key={index}>Số lượng: {item?.quantity}</li>),
      total: orderState[i]?.totalPrice,
      status: orderState[i]?.orderStatus,
      date: dayjs(orderState[i].orderDate).format('DD/MM/YYYY HH:mm:ss'),
      action: (
        <div className="d-flex">
          <Link to={`/admin/order-update/${orderState[i]._id}`} className=" fs-3 text-warning">
            <FcViewDetails />
          </Link>
        </div>
      )
    })
  }

  return (
    <div>
      <h3 className="text-center fs-3">Danh sách đơn hàng</h3>
      <form>
        <Select
          showSearch
          placeholder="Chọn trạng thái đơn hàng"
          optionFilterProp="children"
          onChange={handleChangeStatus}
          filterOption={filterOption}
          options={statusOptions}
          style={{ width: 200, height: 40, marginBottom: 20 }}
        />
        <button type="button" className="btn btn-primary mx-2" onClick={handleGetOrder}>
          Lọc đơn hàng
        </button>
      </form>
      <Table columns={columns} dataSource={data1} />
    </div>
  )
}

export default Orders
