import { Table, Select } from 'antd'
import { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import CustomModal from '../components/CustomModal'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getProducts, resetState } from '../features/product/productSlice'
import { removeProductFromBrand } from '../features/brand/brandSlice'
import { removeProductToCategory } from '../features/procat/procatSlice'

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key'
  },
  {
    title: 'Tên sản phẩm',
    dataIndex: 'name'
  },
  {
    title: 'Giá sản phẩm',
    dataIndex: 'price'
  },
  {
    title: 'Danh mục sản phẩm',
    dataIndex: 'proCat'
  },
  {
    title: 'Hãng sản xuất',
    dataIndex: 'brand'
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantity'
  },
  {
    title: 'Số lượng đã bán',
    dataIndex: 'quantitySold'
  },
  {
    title: 'Số lượng còn lại',
    dataIndex: 'availableQuantity'
  },
  {
    title: 'Trạng thái thái',
    dataIndex: 'status'
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
]

const OPTIONS = ['Bàn phím cơ', 'Bàn phím gaming', 'Chuột']
const OPTIONS1 = ['Bàn phím cơ', 'Bàn phím gaming', 'Chuột']

const Products = () => {
  const dispatch = useDispatch()

  const [selectedItems, setSelectedItems] = useState([])
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o))
  const filteredOptions1 = OPTIONS1.filter((o) => !selectedItems.includes(o))

  const [open, setOpen] = useState(false)
  const [productId, setProductId] = useState('')
  const [brandData, setBrandData] = useState({})
  const [proCatData, setProCatData] = useState({})

  const deletePro = (productId, categoryId, brandId) => {
    const brandData = {
      brandId: brandId,
      productId: productId
    }
    const proCatData = {
      catId: categoryId,
      productId: productId
    }
    setBrandData(brandData)
    setProCatData(proCatData)
    setOpen(true)
    setProductId(productId)
  }

  const hideModal = () => {
    setOpen(false)
  }

  const deleteProductById = () => {
    dispatch(removeProductFromBrand(brandData))
    dispatch(removeProductToCategory(proCatData))
    dispatch(deleteProduct(productId))
    setOpen(false)
    setTimeout(() => {
      dispatch(getProducts())
    }, 1000)
  }

  useEffect(() => {
    dispatch(resetState())
    dispatch(getProducts())
  }, [])

  const productState = useSelector((state) => state.product?.products)

  let data1 = []

  for (let i = 0; i < productState?.length; i++) {
    data1.push({
      key: i + 1,
      name: productState[i].name,
      price: productState[i].price,
      proCat: productState[i].category.name,
      brand: productState[i].brand.name,
      quantity: productState[i].quantity,
      quantitySold: productState[i].quantitySold,
      availableQuantity: productState[i].quantityAvailable,
      status: 'Còn hàng',
      action: (
        <div className="d-flex">
          <Link to={`/admin/product-edit/${productState[i]._id}`} className=" fs-3 text-warning">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => deletePro(productState[i]._id, productState[i].category?._id, productState[i].brand?._id)}
          >
            <AiFillDelete />
          </button>
        </div>
      )
    })
  }

  return (
    <div>
      <h3 className="text-center fs-3">Quản lý sản phẩm</h3>

      <div className="d-flex gap-4">
        <Select
          mode="single"
          placeholder="Chọn danh mục sản phẩm"
          value={selectedItems}
          onChange={setSelectedItems}
          style={{
            width: '20%',
            fontSize: '18px',
            height: '46px',
            margin: '20px 0'
          }}
          options={filteredOptions.map((item) => ({
            value: item,
            label: item
          }))}
        />

        <Select
          mode="single"
          placeholder="Chọn hãng sản xuất"
          value={selectedItems}
          onChange={setSelectedItems}
          style={{
            width: '20%',
            fontSize: '18px',
            height: '46px',
            margin: '20px 0'
          }}
          options={filteredOptions1.map((item) => ({
            value: item,
            label: item
          }))}
        />
      </div>

      <Table columns={columns} dataSource={data1} />
      <CustomModal
        open={open}
        hideModal={hideModal}
        performAction={() => {
          deleteProductById(productId)
        }}
        content="Bạn có chắc chắn muốn xóa sản phẩm này ?"
      />
    </div>
  )
}

export default Products
