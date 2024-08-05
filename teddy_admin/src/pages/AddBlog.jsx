import ReactQuill from 'react-quill'
import Dropzone from 'react-dropzone'
import { Select } from 'antd'
import 'react-quill/dist/quill.snow.css'
import CustomInput from '../components/CustomInput'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogCats } from '../features/blogcat/blogcatSlice'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { deleteImage, uploadImage } from '../features/upload/uploadSlice'
import { IoMdClose } from 'react-icons/io'
import { createBlog, getBlogById, resetState, updateBlog } from '../features/blog/blogSlice'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'

const schema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập tên bài viết'),
  content: Yup.string().required('Vui lòng nhập nội dung bài viết'),
  tag: Yup.string(),
  blogCategory: Yup.string().required('Vui lòng chọn danh mục bài viết'),
  thumbnail: Yup.object()
})

const AddBlog = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const getBlogId = location.pathname.split('/')[3]

  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getBlogById(getBlogId))
    } else {
      dispatch(resetState())
    }
  }, [getBlogId])

  // get user Id
  const user = useSelector((state) => state.auth?.user)
  const { id: userId } = user

  useEffect(() => {
    dispatch(getBlogCats())
  }, [])

  // get blog categories
  const blogcatState = useSelector((state) => state.blogCat?.blogCats)
  // eslint-disable-next-line no-unused-vars
  const [selectedBlogCat, setSelectedBlogCat] = useState('')
  const blogCatOptions = []
  for (let i = 0; i < blogcatState?.length; i++) {
    blogCatOptions.push({
      value: blogcatState[i]._id,
      label: blogcatState[i].name
    })
  }
  const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
  const handleSelectChange = (value) => {
    setSelectedBlogCat(value)
    formik.setFieldValue('blogCategory', value)
  }

  // upload image
  const imageState = useSelector((state) => state.upload?.images)
  const thumbnail = {}
  imageState.forEach((image) => {
    thumbnail.public_id = image.public_id
    thumbnail.url = image.url
  })

  useEffect(() => {
    formik.setFieldValue('thumbnail', thumbnail)
  }, [imageState])

  // toast message
  const blogState = useSelector((state) => state.blog)
  const { isSuccess, isError, isLoading, createdBlog, blog, updatedBlog } = blogState
  useEffect(() => {
    if (Object.keys(createdBlog).length > 0) {
      toast.success('Thêm mới bài viết thành công')
    }
    if (Object.keys(updatedBlog).length > 0) {
      toast.success('Lưu bài viết thành công')
      setTimeout(() => {
        navigate('/admin/blog-list')
      }, 1000)
    }
    if (isError) {
      toast.error('Có lỗi, vui lòng thử lại!')
    }
  }, [isSuccess, isLoading, isError, createdBlog])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: blog.name || '',
      content: blog.content || '',
      tag: blog.tag || '',
      blogCategory: blog.blogCategory || '',
      thumbnail: blog.thumbnail || {}
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBlogId) {
        const newValues = { id: getBlogId, ...values, createdBy: userId }
        dispatch(updateBlog(newValues))
        dispatch(resetState())
      } else {
        const newValues = { ...values, createdBy: userId }
        dispatch(createBlog(newValues))
        dispatch(resetState())
        dispatch(getBlogCats())
        formik.resetForm()
      }
    }
  })

  return (
    <div>
      <h3 className="text-center">Trình soạn thảo bài viết</h3>
      <form className="d-flex flex-column gap-3" onSubmit={formik.handleSubmit}>
        <div>
          <CustomInput
            label="Tên bài viết"
            name="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
          />
          {formik.touched.name && formik.errors.name ? <div className="text-error">{formik.errors.name}</div> : null}
        </div>

        <div>
          <span className="mb-1 d-block">Chọn danh mục bài viết</span>
          <Select
            showSearch
            optionFilterProp="children"
            placeholder="Chọn danh mục bài viết"
            value={formik.values.blogCategory}
            onChange={handleSelectChange}
            filterOption={filterOption}
            style={{
              width: '25%',
              fontSize: '16px',
              height: '50px'
            }}
            options={blogCatOptions}
          />
          {formik.touched.blogCategory && formik.errors.blogCategory ? (
            <div className="text-error">{formik.errors.blogCategory}</div>
          ) : null}
        </div>

        <div>
          <ReactQuill
            placeholder="Nội dung"
            theme="snow"
            name="description"
            value={formik.values.content}
            onChange={(value) => formik.setFieldValue('content', value)}
          />
          {formik.touched.content && formik.errors.content ? (
            <div className="text-error">{formik.errors.content}</div>
          ) : null}
        </div>

        <div className="d-flex gap-4">
          <div className="bg-white border-1 p-5 text-center w-25 rounded" style={{ cursor: 'pointer' }}>
            <Dropzone onDrop={(acceptedFiles) => dispatch(uploadImage(acceptedFiles))}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Tải lên ảnh bìa cho bài viết</p>
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
                  height: '160px',
                  objectFit: 'contain',
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

        <div className="w-25">
          <CustomInput
            label="Tag"
            name="tag"
            type="text"
            value={formik.values.tag}
            onChange={formik.handleChange('tag')}
          />
        </div>

        <button type="submit" className="btn btn-primary w-25">
          {getBlogById ? 'Lưu bài viết' : 'Tạo'} bài viết
        </button>
      </form>
    </div>
  )
}

export default AddBlog
