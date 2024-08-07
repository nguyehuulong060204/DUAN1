import CustomInput from '../components/CustomInput'

const ResetPassword = () => {
  return (
    <div className="py-5" style={{ background: '#ffd333', minHeight: '100vh' }}>
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center">Đặt lại mật khẩu</h3>
        <p className="text-center">Vui lòng nhập mật khẩu mới của bạn để đặt lại mật khẩu.</p>
        <form>
          <CustomInput type="passworrd" label="Mật khẩu mới" id="pass" />
          <CustomInput type="passworrd" label="Nhập lại mật khẩu" id="confirmpass" />
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 my-3 rounded-2"
            type="submit"
            style={{ background: '#ffd333' }}
          >
            Đặt lại mật khẩu
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
