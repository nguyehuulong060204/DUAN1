import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './components/MainLayout'
import AddBlog from './pages/AddBlog'
import AddBlogCat from './pages/AddBlogCat'
import AddBrand from './pages/AddBrand'
import AddEvent from './pages/AddEvent'
import AddMember from './pages/AddMember'
import AddPriceProduct from './pages/AddPriceProduct'
import AddProcat from './pages/AddProCat'
import AddProduct from './pages/AddProduct'
import AddSchedule from './pages/AddSchedule'
import BlogCatList from './pages/BlogCatList'
import Blogs from './pages/Blogs'
import BrandList from './pages/BrandList'
import Dashboard from './pages/Dashboard'
import Events from './pages/Events'
import Feedbacks from './pages/Feedbacks'
import Forgotpassword from './pages/Forgotpassword'
import Login from './pages/Login'
import ManagerAdmin from './pages/ManagerAdmin'
import ManagerStaff from './pages/ManagerStaff'
import Orders from './pages/Orders'
import ProcatList from './pages/ProcatList'
import Products from './pages/Products'
import Resetpassword from './pages/Resetpassword'
import Schedules from './pages/Schedules'
import UpdateOrderStatus from './pages/UpdateOrderStatus'
import UpdateStatus from './pages/UpdateStatus'
import Users from './pages/Users'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="manager-admin" element={<ManagerAdmin />} />
          <Route path="manager-staff" element={<ManagerStaff />} />
          <Route path="add-member" element={<AddMember />} />
          <Route path="edit-member/:id" element={<AddMember />} />
          <Route path="brand-list" element={<BrandList />} />
          <Route path="brand-add" element={<AddBrand />} />
          <Route path="brand-edit/:id" element={<AddBrand />} />
          <Route path="product-list" element={<Products />} />
          <Route path="product-add" element={<AddProduct />} />
          <Route path="product-add-price" element={<AddPriceProduct />} />
          <Route path="product-edit/:id" element={<AddProduct />} />
          <Route path="procat-list" element={<ProcatList />} />
          <Route path="procat-add" element={<AddProcat />} />
          <Route path="procat-edit/:id" element={<AddProcat />} />
          <Route path="order-list" element={<Orders />} />
          <Route path="order-update/:id" element={<UpdateOrderStatus />} />
          <Route path="blog-category-list" element={<BlogCatList />} />
          <Route path="blog-category-add" element={<AddBlogCat />} />
          <Route path="blog-category-edit/:id" element={<AddBlogCat />} />
          <Route path="blog-list" element={<Blogs />} />
          <Route path="blog-add" element={<AddBlog />} />
          <Route path="blog-edit/:id" element={<AddBlog />} />
          <Route path="event-list" element={<Events />} />
          <Route path="event-add" element={<AddEvent />} />
          <Route path="event-edit/:id" element={<AddEvent />} />
          <Route path="schedule-add" element={<AddSchedule />} />
          <Route path="schedule-edit/:id" element={<AddSchedule />} />
          <Route path="schedules" element={<Schedules />} />
          <Route path="feedbacks" element={<Feedbacks />} />
          <Route path="update-status/:id" element={<UpdateStatus />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
