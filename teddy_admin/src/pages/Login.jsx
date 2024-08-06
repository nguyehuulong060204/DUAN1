import CustomInput from '../components/CustomInput'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/auth/authSlice'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const schema = Yup.object().shape({
  email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email của bạn'),
  password: Yup.string().min(8, 'Mật khẩu phải chứa ít nhẩt 8 ký tự').required('Vui lòng nhập password của bạn')
})

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values))
    }
  })

  const { user, isLoading, isError, isSuccess } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isSuccess) {
      navigate('/admin')
      toast.success('Đăng nhập thành công')
    } else {
      navigate('/')
      // toast.error('Đăng nhập thất bại, vui lòng thử lại!')
    }
  }, [user, isLoading, isError, isSuccess, navigate])

  return (
    <div className="py-5" style={{ background: '#ffd333', minHeight: '100vh' }}>
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center">Đăng nhập</h3>
        <p className="text-center">Đăng nhập bằng tài khoản để tiếp tục.</p>
        <form onSubmit={formik.handleSubmit}>
          <div className="">
            <CustomInput
              name="email"
              type="email"
              label="Email"
              id="email"
              onChange={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-error">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mt-3">
            <CustomInput
              name="password"
              type="password"
              label="Mật khẩu"
              id="pass"
              onChange={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-error">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="my-3 text-end">
            <Link to="/forgot-password">Quên mật khẩu.</Link>
          </div>
          <button
            type="submit"
            style={{ background: '#ffd333' }}
            className="rounded-2 border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
