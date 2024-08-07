import { Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getOrderById, resetState, updateOrderWhenUserBySuccess, updateStatus } from '../features/Order/orderSlice'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { Table } from 'antd'

const filteredOptions = [
  { label: 'Chờ xác nhận', value: 'Chờ xác nhận' },
  { label: 'Đã xác nhận', value: 'Đã xác nhận' },
  { label: 'Đang giao hàng', value: 'Đang giao hàng' },
  { label: 'Đã giao hàng', value: 'Đã giao hàng' }
]

const columns = [
  {
    title: 'Tên sản phẩm',
    dataIndex: 'name'
  },
  {
    title: 'Màu sắc',
    dataIndex: 'color'
  },
  {
    title: 'Kiểu switch',
    dataIndex: 'switch'
  },
  {
    title: 'Loại',
    dataIndex: 'option'
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantity'
  },
  {
    title: 'Giá',
    dataIndex: 'price'
  }
]

const UpdateOrderStatus = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const [statusOrder, setStatusOrder] = useState('')

  const getOrderId = location.pathname.split('/')[3]

  useEffect(() => {
    if (getOrderId !== undefined) {
      dispatch(getOrderById(getOrderId))
    } else {
      dispatch(resetState())
    }
  }, [getOrderId])

  const orderState = useSelector((state) => state.order)
  const { updatedOrder } = orderState
  const {
    shippingInfo,
    orderItems,
    orderDate,
    totalPrice,
    totalPriceAfterDiscount,
    orderStatus,
    paymentMethod,
    month,
    createdAt,
    updatedAt
  } = orderState.order

  const data = []

  for (let i = 0; i < orderItems?.length; i++) {
    data.push({
      key: i + 1,
      name: orderItems[i]?.product?.name,
      color: orderItems[i]?.color.name || 'No color',
      switch: orderItems[i]?.switch.name || 'No switch',
      option: orderItems[i]?.option.name || 'No option',
      quantity: orderItems[i].quantity,
      price: orderItems[i].price
    })
  }

  const newOrderData = []
  for (let i = 0; i < orderItems?.length; i++) {
    newOrderData.push({
      productId: orderItems[i]?.product?._id,
      quantity: orderItems[i].quantity,
      color: {
        code: orderItems[i]?.color?.code
      },
      switch: {
        code: orderItems[i]?.switch?.code
      },
      option: {
        code: orderItems[i]?.option?.code
      },
      attributeId: orderItems[i]?.attributeId
    })
  }

  const handleUpdateOrderStatus = () => {
    if (statusOrder !== '' && getOrderId) {
      dispatch(updateStatus({ id: getOrderId, status: statusOrder }))
      if (statusOrder === 'Đã giao hàng') {
        dispatch(updateOrderWhenUserBySuccess(newOrderData))
      }
    }
  }

  useEffect(() => {
    if (Object.keys(updatedOrder).length > 0) {
      toast.success('Cập nhật trạng thái đơn hàng thành công')
      navigate('/admin/order-list')
    }
  }, [updatedOrder])

  return (
    <div>
      <h3 className="text-center">Cập nhật trạng thái đơn hàng</h3>
      <form className="d-flex flex-column gap-3">
        <div>
          <Select
            mode="single"
            name="status"
            placeholder="Cập nhật trạng thái đơn hàng"
            style={{
              width: '25%',
              fontSize: '18px',
              height: '50px'
            }}
            options={filteredOptions}
            optionLabelProp="label"
            // value={orderStatus ? orderStatus : orderState}
            onChange={setStatusOrder}
          />
        </div>
        <div className="">
          <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px', borderRadius: '4px' }}>
            <h5 style={{ marginBottom: '10px' }}>Thông tin giao hàng</h5>
            <p style={{ marginBottom: '5px' }}>
              Họ và tên: <strong>{shippingInfo?.fullName}</strong>
            </p>
            <p style={{ marginBottom: '5px' }}>
              Địa chỉ: <strong>{shippingInfo?.location}</strong>
            </p>
            <p style={{ marginBottom: '5px' }}>
              Thành phố: <strong>{shippingInfo?.city}</strong>
            </p>
            <p style={{ marginBottom: '5px' }}>
              Số điện thoại: <strong>{shippingInfo?.phoneNumber}</strong>
            </p>
          </div>

          <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px', borderRadius: '4px' }}>
            <h5 style={{ marginBottom: '10px' }}>Sản phẩm đặt hàng</h5>
            <Table columns={columns} dataSource={data} pagination={false} />
            <p className="fs-4 mb-0 mt-2 text-primary">Tổng đơn hàng: {totalPrice}</p>
          </div>

          <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px', borderRadius: '4px' }}>
            <h5 style={{ marginBottom: '10px' }}>Tổng kết đơn hàng</h5>
            <p style={{ marginBottom: '5px' }}>Ngày đặt hàng: {dayjs(orderDate).format('DD/MM/YYYY HH:mm:ss')}</p>
            <p style={{ marginBottom: '5px' }}>Tổng giá: {totalPrice}</p>
            <p style={{ marginBottom: '5px' }}>Tổng giá sau giảm giá: {totalPriceAfterDiscount}</p>
            <p style={{ marginBottom: '5px' }}>Trạng thái đơn hàng: {orderStatus}</p>
            <p style={{ marginBottom: '5px' }}>Tháng: {month}</p>
            <p style={{ marginBottom: '5px' }}>Phương thức thanh toán: {paymentMethod}</p>
            <p style={{ marginBottom: '5px' }}>Ngày tạo: {dayjs(createdAt).format('DD/MM/YYYY HH:mm:ss')}</p>
            <p style={{ marginBottom: '5px' }}>Ngày cập nhật: {dayjs(updatedAt).format('DD/MM/YYYY HH:mm:ss')}</p>
          </div>
        </div>
        <button type="button" className="btn btn-primary w-25" onClick={handleUpdateOrderStatus}>
          Lưu đơn hàng
        </button>
      </form>
    </div>
  )
}

export default UpdateOrderStatus
