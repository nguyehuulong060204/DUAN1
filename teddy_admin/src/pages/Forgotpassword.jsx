import CustomInput from '../components/CustomInput'

const ForgotPassword = () => {
  return (
    <div className="py-5" style={{ background: '#ffd333', minHeight: '100vh' }}>
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center">Quên mật khẩu</h3>
        <p className="text-center">Vui lòng nhập email của bạn để nhận được liên kết đặt lại mật khẩu.</p>
        <form>
          <CustomInput type="email" label="Địa chỉ email" id="email" />
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 my-4"
            type="submit"
            style={{ background: '#ffd333' }}
          >
            Gửi
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
