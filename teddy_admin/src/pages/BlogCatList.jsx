import { Table } from 'antd'
import { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import CustomModal from '../components/CustomModal'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogCats, resetState, deleteBlogCat as removeBlogCat } from '../features/blogcat/blogcatSlice'

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key'
  },
  {
    title: 'Tên danh mục',
    dataIndex: 'name'
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
]

const BlogCatList = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [blogCatId, setBlogCatId] = useState('')

  const showModal = (blogCatId) => {
    setOpen(true)
    setBlogCatId(blogCatId)
  }

  const hideModal = () => {
    setOpen(false)
  }

  const deleteBlogCat = (id) => {
    dispatch(removeBlogCat(id))
    setOpen(false)
    setTimeout(() => {
      dispatch(getBlogCats())
    }, 1000)
  }

  useEffect(() => {
    dispatch(resetState())
    dispatch(getBlogCats())
  }, [])

  const blogCatState = useSelector((state) => state.blogCat?.blogCats)

  let data1 = []

  for (let i = 0; i < blogCatState.length; i++) {
    data1.push({
      key: i + 1,
      name: blogCatState[i].name,
      action: (
        <div className="d-flex">
          <Link to={`/admin/blog-category-edit/${blogCatState[i]._id}`} className=" fs-3 text-warning">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(blogCatState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </div>
      )
    })
  }

  return (
    <div>
      <h3 className="text-center fs-3">Danh mục bài viết</h3>
      <Table columns={columns} dataSource={data1} />
      <CustomModal
        open={open}
        hideModal={hideModal}
        performAction={() => {
          deleteBlogCat(blogCatId)
        }}
        content="Bạn có muốn xóa danh mục bài viết này không ?"
      />
    </div>
  )
}

export default BlogCatList
