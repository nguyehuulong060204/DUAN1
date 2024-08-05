import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import Dropzone from 'react-dropzone'
import { Select } from 'antd'
import 'react-quill/dist/quill.snow.css'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { IoMdClose } from 'react-icons/io'

import CustomInput from '../components/CustomInput'
import { getProcats } from '../features/procat/procatSlice'
import { uploadImage, deleteImage } from '../features/upload/uploadSlice'
import { createBrand, getBrandById, resetState, updateBrand } from '../features/brand/brandSlice'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'

const schema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập tên hãng'),
  description: Yup.string(),
  productCategory: Yup.array().required('Vui lòng chọn danh mục sản phẩm')
})

const AddBrand = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const brandId = location.pathname.split('/')[3]

  // get product categories
  useEffect(() => {
    dispatch(getProcats())
  }, [])

  const productcats = useSelector((state) => state.procat?.procats)
  let productCatsOptions = []
  for (let i = 0; i < productcats.length; i++) {
    productCatsOptions.push({
      value: productcats[i]._id,
      label: productcats[i].name
    })
  }
  const [selectedItems, setSelectedItems] = useState([])
  const filteredOptions = productCatsOptions.filter((o) => !selectedItems.includes(o.label))
  const handleSelectChange = (value) => {
    setSelectedItems(value)
    formik.setFieldValue('productCategory', value)
  }

  // upload logo
  const imagesState = useSelector((state) => state.upload?.images)
  let imageLogo = {}
  let thumbnail = {}
  imagesState.forEach((image, index) => {
    if (index === 0) {
      imageLogo.public_id = image.public_id
      imageLogo.url = image.url
    } else {
      thumbnail.public_id = image.public_id
      thumbnail.url = image.url
    }
  })
  useEffect(() => {
    formik.setFieldValue('logo', imageLogo)
    formik.setFieldValue('thumbnail', thumbnail)
  }, [imagesState])

  // toast message
  const newBrand = useSelector((state) => state.brand)
  const { isSuccess, isError, isLoading, createdBrand, brand, updatedBrand } = newBrand
  useEffect(() => {
    if (Object.keys(createdBrand).length > 0) {
      toast.success('Thêm mới hãng thành công')
    }
    if (Object.keys(updatedBrand).length > 0) {
      toast.success('Cập nhật hãng thành công')
      setTimeout(() => {
        navigate('/admin/brand-list')
      }, 1000)
    }
    if (isError) {
      toast.error('Có lỗi, vui lòng thử lại sau!')
    }
  }, [isSuccess, isLoading, isError, createdBrand])

  // get brand by id
  useEffect(() => {
    if (brandId !== undefined) {
      dispatch(getBrandById(brandId))
    } else {
      dispatch(resetState())
    }
  }, [brandId])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: brand.name || '',
      description: brand.description || '',
      logo: brand.logo || {},
      thumbnail: brand.thumbnail || {},
      productCategory: brand.productCategory || []
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (brandId !== undefined) {
        dispatch(updateBrand({ id: brandId, ...values }))
        dispatch(resetState())
      } else {
        dispatch(createBrand(values))
        dispatch(resetState())
        formik.resetForm()
      }
    }
  })

  return (
    <div>
      <h3 className="text-center">{brandId ? 'Sửa thông tin' : 'Thêm mới'} hãng sản xuất</h3>
      <form className="d-flex flex-column gap-3" onSubmit={formik.handleSubmit}>
        <div>
          <CustomInput
            label="Tên hãng"
            name="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
          />
          {formik.touched.name && formik.errors.name ? <div className="text-error">{formik.errors.name}</div> : null}
        </div>

        <div>
          <ReactQuill
            theme="snow"
            placeholder="Mô tả"
            name="description"
            value={formik.values.description}
            onChange={(value) => formik.setFieldValue('description', value)}
          />
        </div>

        <div>
          <span>Chọn danh mục sản phẩm</span>
          <Select
            mode="multiple"
            name="productCategory"
            placeholder="Chọn danh mục sản phẩm"
            value={formik.values.productCategory}
            onChange={handleSelectChange}
            style={{
              width: '100%',
              fontSize: '18px',
              height: '50px'
            }}
            options={filteredOptions}
            optionLabelProp="label"
          />
        </div>

        <div className="d-flex gap-4">
          <div className="bg-white border-1 p-5 text-center w-50 rounded" style={{ cursor: 'pointer' }}>
            <Dropzone onDrop={(acceptedFiles) => dispatch(uploadImage(acceptedFiles))}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Chọn logo</p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          {Object.keys(formik.values.logo).length > 0 && (
            <div style={{ position: 'relative' }}>
              <img
                style={{
                  width: '140px',
                  height: '140px',
                  objectFit: 'contain',
                  borderRadius: '4px'
                }}
                src={formik.values.logo?.url}
                alt="avatar"
              />
              <div
                onClick={() => dispatch(deleteImage(formik.values.logo?.public_id))}
                style={{ position: 'absolute', right: '0', top: '-5px', fontSize: '20px', cursor: 'pointer' }}
              >
                <IoMdClose />
              </div>
            </div>
          )}
        </div>

        <div className="d-flex gap-4">
          <div className="bg-white border-1 p-5 text-center w-50 rounded" style={{ cursor: 'pointer' }}>
            <Dropzone onDrop={(acceptedFiles) => dispatch(uploadImage(acceptedFiles))}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Chọn ảnh nền cho thương hiệu</p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          {Object.keys(formik.values.thumbnail).length > 0 && (
            <div style={{ position: 'relative' }}>
              <img
                style={{
                  width: 'auto',
                  height: '140px',
                  objectFit: 'cover',
                  borderRadius: '4px'
                }}
                src={formik.values.thumbnail?.url}
                alt="avatar"
              />
              <div
                onClick={() => dispatch(deleteImage(formik.values.thumbnail?.public_id))}
                style={{ position: 'absolute', right: '0', top: '-5px', fontSize: '20px', cursor: 'pointer' }}
              >
                <IoMdClose />
              </div>
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-25">
          {brandId ? 'Lưu thông tin' : 'Thêm mới'} hãng
        </button>
      </form>
    </div>
  )
}

export default AddBrand
