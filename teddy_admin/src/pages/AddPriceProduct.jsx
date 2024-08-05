import { Collapse, Select, InputNumber } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { deleteProductPrice, getProductById, getProducts, updateProductPrice } from '../features/product/productSlice'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CustomModal from '../components/CustomModal'
import CustomInput from '../components/CustomInput'

const schema = Yup.object().shape({
  price: Yup.number().required('Vui lòng nhập giá sản phẩm'),
  quantity: Yup.number().required('Vui lòng nhập số lượng sản phẩm'),
  color: Yup.string(),
  type: Yup.string(),
  option: Yup.string()
})

const AddPriceProduct = () => {
  const dispatch = useDispatch()
  const [productId, setProductId] = useState('')
  const [open, setOpen] = useState(false)
  const [price, setPrice] = useState('')

  const showModal = (priceId) => {
    setOpen(true)
    setPrice(priceId)
  }

  const hideModal = () => {
    setOpen(false)
  }

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  const productList = useSelector((state) => state.product.products)
  const productOptions = productList?.map((product) => ({
    value: product._id,
    label: product.name
  }))

  const handleChangeProduct = (value) => {
    setProductId(value)
  }

  useEffect(() => {
    dispatch(getProductById(productId))
  }, [productId])

  const productState = useSelector((state) => state.product.product)
  const colorsData = productState?.colors?.map((color) => ({
    value: color.code,
    label: color.name
  }))
  const switchData = productState?.types?.map((sw) => ({
    value: sw.code,
    label: sw.name
  }))
  const optionsData = productState?.options?.map((option) => ({
    value: option.code,
    label: option.name
  }))

  const deleteProPrice = () => {
    dispatch(deleteProductPrice({ productId, attributesId: price }))
    setOpen(false)
    setTimeout(() => {
      dispatch(getProductById(productId))
    }, 1000)
  }

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      price: '',
      quantity: '',
      color: '',
      type: '',
      option: ''
    },
    onSubmit: (values) => {
      const newProductData = {
        color: values.color && { code: values.color },
        type: values.type && { code: values.type },
        option: values.option && { code: values.option },
        price: values.price,
        quantity: values.quantity,
        id: productId
      }
      dispatch(updateProductPrice(newProductData))
      formik.resetForm()
      setTimeout(() => {
        dispatch(getProductById(productId))
      }, 1000)
    }
  })

  return (
    <div className="d-flex flex-column gap-4">
      <Select
        showSearch
        optionFilterProp="children"
        placeholder="Chọn sản phẩm"
        onChange={handleChangeProduct}
        style={{
          width: '25%',
          fontSize: '16px',
          height: '50px'
        }}
        options={productOptions}
      />
      <Collapse defaultActiveKey={['1']}>
        <Collapse.Panel header="Thêm giá cho sản phẩm của bạn">
          <form className="d-flex flex-column gap-3" onSubmit={formik.handleSubmit}>
            <div className="d-flex align-items-center gap-3">
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="Chọn màu sản phẩm"
                style={{ width: '300px', fontSize: '16px', height: '50px' }}
                options={colorsData}
                value={formik.values.color ? formik.values.color : null}
                onChange={formik.handleChange('color')}
              />
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="Chọn switch"
                style={{ width: '300px', fontSize: '16px', height: '50px' }}
                options={switchData}
                value={formik.values.type ? formik.values.type : null}
                onChange={formik.handleChange('type')}
              />

              <Select
                showSearch
                optionFilterProp="children"
                placeholder="Chọn option"
                style={{ width: '300px', fontSize: '16px', height: '50px' }}
                options={optionsData}
                value={formik.values.option ? formik.values.option : null}
                onChange={formik.handleChange('option')}
              />
              <InputNumber
                placeholder="Số lượng"
                min={0}
                style={{
                  width: '300px',
                  fontSize: '16px',
                  height: '100%',
                  minHeight: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start'
                }}
                value={formik.values.quantity}
                onChange={(value) => formik.setFieldValue('quantity', value)}
              />
              <InputNumber
                placeholder="Nhập giá"
                min={0}
                style={{
                  width: '300px',
                  fontSize: '16px',
                  height: '100%',
                  minHeight: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start'
                }}
                value={formik.values.price}
                onChange={(value) => formik.setFieldValue('price', value)}
              />
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-success" style={{ width: '150px' }}>
                Lưu giá
              </button>
            </div>
          </form>
        </Collapse.Panel>
      </Collapse>

      <Collapse>
        <Collapse.Panel header="Bảng giá của sản phẩm">
          <div className="d-flex flex-column gap-3">
            {productState?.attributes?.length > 0 &&
              productState?.attributes?.map((attr, index) => {
                return (
                  <div className="d-flex align-items-center gap-3" key={index}>
                    {attr?.color && (
                      <Select
                        showSearch
                        optionFilterProp="children"
                        placeholder="Màu sản phẩm"
                        style={{ width: '300px', fontSize: '16px', height: '55px' }}
                        options={colorsData}
                        value={attr?.color?.code}
                      />
                    )}
                    {attr?.switch && (
                      <Select
                        showSearch
                        optionFilterProp="children"
                        placeholder="Switch sản phẩm"
                        style={{ width: '300px', fontSize: '16px', height: '55px' }}
                        options={switchData}
                        value={attr?.switch?.code}
                      />
                    )}

                    {attr?.option && (
                      <Select
                        showSearch
                        optionFilterProp="children"
                        placeholder="Các options sản phẩm"
                        style={{ width: '300px', fontSize: '16px', height: '55px' }}
                        options={optionsData}
                        value={attr?.option?.code}
                      />
                    )}
                    <CustomInput
                      label="Số lượng"
                      style={{
                        width: '300px',
                        fontSize: '16px',
                        height: '100%',
                        minHeight: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                      }}
                      disabled
                      value={attr?.quantity}
                    />
                    <CustomInput
                      label="Giá sản phẩm"
                      style={{
                        width: '300px',
                        fontSize: '16px',
                        height: '100%',
                        minHeight: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                      }}
                      disabled
                      value={attr?.price}
                    />
                    <button className="btn btn-danger" onClick={() => showModal(attr?._id)}>
                      Xóa
                    </button>
                  </div>
                )
              })}
          </div>
        </Collapse.Panel>
      </Collapse>
      <CustomModal
        open={open}
        hideModal={hideModal}
        performAction={() => {
          deleteProPrice(price)
        }}
        content="Bạn có muốn xóa giá này không ?"
      />
    </div>
  )
}

export default AddPriceProduct
