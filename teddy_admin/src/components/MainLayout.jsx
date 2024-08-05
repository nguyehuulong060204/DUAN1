import { MenuFoldOutlined } from '@ant-design/icons'
import { Layout, Menu, theme } from 'antd'
import React, { useState } from 'react'
import { AiOutlineDashboard } from 'react-icons/ai'
import { BiAddToQueue, BiCategoryAlt } from 'react-icons/bi'
import { FaClipboardList, FaRegCalendarCheck, FaRegUserCircle, FaUserPlus } from 'react-icons/fa'
import { FaUserGear } from 'react-icons/fa6'
import { MdOutlineEventNote, MdPostAdd } from 'react-icons/md'
import { RiUserStarLine } from 'react-icons/ri'
import { SiRazer, SiShopee } from 'react-icons/si'
import { TbBrandProducthunt } from 'react-icons/tb'
import { VscFeedback } from 'react-icons/vsc'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const { Header, Sider, Content } = Layout

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-4 text-center py-3 mb-0 d-flex align-items-center justify-content-center">
            <span className="fs-2 sm-logo">
              <SiShopee />
            </span>
            <span className="lg-logo">Teddyshop</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({ key }) => {
            if (key === 'signout') {
              localStorage.removeItem('token')
              navigate('/')
            } else {
              navigate(key)
            }
          }}
          items={[
            {
              key: '',
              icon: <AiOutlineDashboard className="fs-5" />,
              label: 'Bảng điều khiển'
            },
            {
              key: 'users',
              icon: <FaRegUserCircle className="fs-5" />,
              label: 'Người dùng'
            },
            {
              key: 'members',
              icon: <RiUserStarLine className="fs-5" />,
              label: 'Thành viên',
              children: [
                {
                  key: 'manager-admin',
                  icon: <FaUserGear className="fs-5" />,
                  label: 'Quản trị viên'
                },
                {
                  key: 'manager-staff',
                  icon: <FaRegUserCircle className="fs-5" />,
                  label: 'Nhân viên'
                },
                {
                  key: 'add-member',
                  icon: <FaUserPlus className="fs-5" />,
                  label: 'Thêm mới thành viên'
                }
              ]
            },
            {
              key: 'brands',
              icon: <SiRazer className="fs-5" />,
              label: 'Hãng sản xuất',
              children: [
                {
                  key: 'brand-list',
                  icon: <FaClipboardList className="fs-5" />,
                  label: 'Danh sách'
                },
                {
                  key: 'brand-add',
                  icon: <BiAddToQueue className="fs-5" />,
                  label: 'Thêm mới'
                }
              ]
            },
            {
              key: 'procat',
              icon: <BiCategoryAlt className="fs-5" />,
              label: 'Danh mục sản phẩm',
              children: [
                {
                  key: 'procat-list',
                  icon: <FaClipboardList className="fs-5" />,
                  label: 'Danh sách'
                },
                {
                  key: 'procat-add',
                  icon: <BiAddToQueue className="fs-5" />,
                  label: 'Thêm mới'
                }
              ]
            },
            {
              key: 'products',
              icon: <TbBrandProducthunt className="fs-5" />,
              label: 'Sản phẩm',
              children: [
                {
                  key: 'product-list',
                  icon: <FaClipboardList className="fs-5" />,
                  label: 'Danh sách'
                },
                {
                  key: 'product-add',
                  icon: <BiAddToQueue className="fs-5" />,
                  label: 'Thêm mới'
                },
                {
                  key: 'product-add-price',
                  icon: <BiAddToQueue className="fs-5" />,
                  label: 'Thêm giá cho sản phẩm'
                }
              ]
            },
            {
              key: 'orders',
              icon: <FaRegCalendarCheck className="fs-5" />,
              label: 'Đơn hàng',
              children: [
                {
                  key: 'order-list',
                  icon: <FaClipboardList className="fs-5" />,
                  label: 'Danh sách'
                }
              ]
            },
            {
              key: 'blog-categories',
              icon: <BiCategoryAlt className="fs-5" />,
              label: 'Danh mục bài viết',
              children: [
                {
                  key: 'blog-category-list',
                  icon: <FaClipboardList className="fs-5" />,
                  label: 'Danh sách'
                },
                {
                  key: 'blog-category-add',
                  icon: <BiAddToQueue className="fs-5" />,
                  label: 'Thêm mới'
                }
              ]
            },
            {
              key: 'blogs',
              icon: <MdPostAdd className="fs-5" />,
              label: 'Bài viết',
              children: [
                {
                  key: 'blog-list',
                  icon: <FaClipboardList className="fs-5" />,
                  label: 'Danh sách'
                },
                {
                  key: 'blog-add',
                  icon: <BiAddToQueue className="fs-5" />,
                  label: 'Thêm mới'
                }
              ]
            },
            {
              key: 'events',
              icon: <MdOutlineEventNote className="fs-5" />,
              label: 'Sự kiện',
              children: [
                {
                  key: 'event-list',
                  icon: <FaClipboardList className="fs-5" />,
                  label: 'Danh sách'
                },
                {
                  key: 'schedules',
                  icon: <FaClipboardList className="fs-5" />,
                  label: 'Lịch trình'
                },
                {
                  key: 'event-add',
                  icon: <BiAddToQueue className="fs-5" />,
                  label: 'Thêm mới'
                }
              ]
            },
            {
              key: 'feedbacks',
              icon: <VscFeedback className="fs-5" />,
              label: 'Phản hổi'
            }
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between align-items-center ps-1 pe-5"
          style={{ padding: 0, background: colorBgContainer }}
        >
          {React.createElement(collapsed ? MenuFoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed)
          })}
          <div className="d-flex gap-3 align-items-center">
            <div className="d-flex gap-3 align-items-center">
              <div>
                <img
                  width={38}
                  height={38}
                  className="avt-img"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHcM04W6diLQBzw4Y4pXDhPgovRf7l1cBF0Q&usqp=CAU"
                  alt="avatar"
                />
              </div>
              <div>
                <h5 className="mb-0">{user?.userName}</h5>
                <p className="mb-0">{user?.userEmail}</p>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer
          }}
        >
          <main>
            <Outlet />
          </main>
        </Content>
      </Layout>
    </Layout>
  )
}
export default MainLayout
