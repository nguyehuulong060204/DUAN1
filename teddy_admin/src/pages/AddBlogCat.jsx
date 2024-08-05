import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import * as Yup from 'yup'
import { useFormik } from 'formik'

import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux'
import { createBlogCat, getBlogcatById, resetState, updateBlogCat } from '../features/blogcat/blogcatSlice'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'

const schema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập tên danh mục'),
  description: Yup.string()
})

const AddBlogCat = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const blogCatId = location.pathname.split('/')[3]

  useEffect(() => {
    if (blogCatId !== undefined) {
      dispatch(getBlogcatById(blogCatId))
    } else {
      dispatch(resetState())
    }
  }, [blogCatId])

  const newBlogCat = useSelector((state) => state.blogCat)
  const { isSuccess, isError, isLoading, createdBlog, blog, updatedBlog } = newBlogCat

  useEffect(() => {
    if (Object.keys(createdBlog).length > 0) {
      toast.success('Tạo danh mục thành công')
    }
    if (Object.keys(updatedBlog).length > 0) {
      toast.success('Cập nhật danh mục thành công')
      setTimeout(() => {
        navigate('/admin/blog-category-list')
      }, 1000)
    }
    if (isError) {
      toast.error('Tạo danh mục thất bại, vui lòng thử lại sau!')
    }
  }, [isSuccess, isError, isLoading, createdBlog])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: blog.name || '',
      description: blog.description || ''
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (blogCatId !== undefined) {
        dispatch(updateBlogCat({ id: blogCatId, ...values }))
        dispatch(resetState())
      } else {
        dispatch(createBlogCat(values))
        dispatch(resetState())
        formik.resetForm()
      }
    }
  })

  return (
    <div>
      <h3 className="text-center">{blogCatId ? 'Sửa' : 'Thêm mới'} danh mục bài viết</h3>
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
            name="description"
            placeholder="Mô tả"
            value={formik.values.description}
            onChange={(value) => formik.setFieldValue('description', value)}
          />
        </div>

        <button type="submit" className="btn btn-primary w-25">
          {blogCatId ? 'Lưu' : 'Thêm'} danh mục
        </button>
      </form>
    </div>
  )
}

export default AddBlogCat
