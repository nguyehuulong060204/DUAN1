import PropTypes from 'prop-types'

import { Modal } from 'antd'

const CustomModal = (props) => {
  const { open, content, hideModal, performAction } = props

  return (
    <>
      <Modal title="Xác nhận xóa" open={open} onOk={performAction} onCancel={hideModal}>
        <p>{content}</p>
      </Modal>
    </>
  )
}

CustomModal.propTypes = {
  open: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired,
  performAction: PropTypes.func.isRequired
}

export default CustomModal
