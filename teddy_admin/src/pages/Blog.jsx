import { Table } from 'antd'
import { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import CustomModal from '../components/CustomModal'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs, resetState, deleteBlog as removeBlog } from '../features/blog/blogSlice'

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key'
  },
  {
    title: 'Tên bài viết',
    dataIndex: 'name',
    className: 'text-capitalize'
  },
  {
    title: 'Danh mục',
    dataIndex: 'category'
  },
  {
    title: 'Tag',
    dataIndex: 'tag'
  },
  {
    title: 'Người viết',
    dataIndex: 'author'
  },
  {
    title: 'Lượt xem',
    dataIndex: 'view'
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
]

const Blogs = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [blogId, setBlogId] = useState('')

  const showModal = (blogId) => {
    setOpen(true)
    setBlogId(blogId)
  }

  const hideModal = () => {
    setOpen(false)
  }

  const deleteBlog = (id) => {
    dispatch(removeBlog(id))
    setOpen(false)
    setTimeout(() => {
      dispatch(getBlogs())
    }, 1000)
  }

  useEffect(() => {
    dispatch(resetState())
    dispatch(getBlogs())
  }, [])

  const blogState = useSelector((state) => state.blog?.blogs)

  let data1 = []

  for (let i = 0; i < blogState?.length; i++) {
    data1.push({
      key: i + 1,
      name: blogState[i].name,
      category: blogState[i].blogCategory.name,
      tag: blogState[i].tag,
      author: blogState[i]?.createdBy?.fullName || 'Chưa cập nhật',
      view: blogState[i].views,
      action: (
        <div className="d-flex">
          <Link to={`/admin/blog-edit/${blogState[i]._id}`} className=" fs-3 text-warning">
            <BiEdit />
          </Link>
          <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={() => showModal(blogState[i]._id)}>
            <AiFillDelete />
          </button>
        </div>
      )
    })
  }

  return (
    <div>
      <h3 className="text-center fs-3">Danh sách bài viết</h3>
      <Table columns={columns} dataSource={data1} />
      <CustomModal
        open={open}
        hideModal={hideModal}
        performAction={() => {
          deleteBlog(blogId)
        }}
        content="Bạn có muốn xóa bài viết không ?"
      />
    </div>
  )
}

export default Blogs
