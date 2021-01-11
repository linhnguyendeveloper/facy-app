import React from 'react'
import { Modal, message } from 'antd'

const ModalAddEdit = ({ visibleModal, setVisibleModal, isEdit }) => {
  const handleOkAdd = () => {
    setVisibleModal(false)
    message.info('Added')
  }
  const handleOkEdit = () => {
    setVisibleModal(false)
    message.info('Edited')
  }
  const handleCancel = () => {
    setVisibleModal(false)
  }
  return (
    <Modal
      title={isEdit ? 'Edit Attendance' : 'Add attendances'}
      visible={visibleModal}
      onOk={isEdit ? handleOkEdit : handleOkAdd}
      onCancel={handleCancel}
      className="modal-add-edit"
      forceRender
    >
      {isEdit ? 'Sua du lieu o day' : 'Them du lieu o day'}
    </Modal>
  )
}

export default ModalAddEdit
