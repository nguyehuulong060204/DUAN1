import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import * as Yup from 'yup'
import { useFormik } from 'formik'

import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux'
import { createProcat, getProcatById, resetState, updateProcat } from '../features/procat/procatSlice'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'

const schema = Yup.object().shape({
  name: Yup.string().required('Tên danh mục không được để trống'),
  description: Yup.string(),
  tags: Yup.string()
})

const AddProcat = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const procatId = location.pathname.split('/')[3]

  const procatState = useSelector((state) => state.procat)
  const { isSucccess, isError, isLoading, createdProcat, procat, updatedProcat } = procatState
  useEffect(() => {
    if (Object.keys(createdProcat).length > 0) {
      toast.success('Thêm mới danh mục thành công')
    }
    if (Object.keys(updatedProcat).length > 0) {
      toast.success('Cập nhật thông tin danh mục thành công')
      setTimeout(() => {
        navigate('/admin/procat-list')
      }, 3000)
    }
    if (isError) {
      toast.error('Có lỗi, vui lòng thử lại sau!')
    }
  }, [isError, isSucccess, isLoading, updatedProcat, createProcat])

  // get procat
  useEffect(() => {
    if (procatId !== undefined) {
      dispatch(getProcatById(procatId))
    } else {
      dispatch(resetState())
    }
  }, [procatId])

  const formik = useFormik({
    initialValues: {
      name: procat.name || '',
      description: procat.description || '',
      tags: procat.tags?.join(',') || ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (procatId !== undefined) {
        let tagsValue = values.tags?.split(',').map((tag) => tag.trim())
        dispatch(updateProcat({ id: procatId, ...values, tags: tagsValue }))
        dispatch(resetState())
      } else {
        let tagsValue = values.tags?.split(',').map((tag) => tag.trim())
        dispatch(createProcat({ ...values, tags: tagsValue }))
        formik.resetForm()
        setTimeout(() => {
          dispatch(resetState())
        }, 3000)
      }
    }
  })

  return (
    <div>
      <h3 className="text-center">{procatId ? 'Cập nhật' : 'Thêm mới'} danh mục sản phẩm</h3>
      <form className="d-flex flex-column gap-3" onSubmit={formik.handleSubmit}>
        <div>
          <CustomInput
            label="Tên danh mục"
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
          <CustomInput
            label="Tag"
            name="tags"
            type="text"
            value={formik.values.tags}
            onChange={formik.handleChange('tags')}
          />
        </div>

        <button type="submit" className="btn btn-primary w-25">
          {procatId ? 'Lưu' : ' Thêm'} danh mục sản phẩm
        </button>
      </form>
    </div>
  )
}

export default AddProcat
