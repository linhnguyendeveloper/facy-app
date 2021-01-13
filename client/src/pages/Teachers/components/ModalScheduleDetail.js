import React from 'react'
import { Modal } from 'antd'

const ModalScheduleDetail = ({
  modalScheduleDetailOpen,
  handleCancelOpenDetail,
  modalScheduleDetailData
}) => {
  return (
    <Modal
      visible={modalScheduleDetailOpen}
      title="Detail Schedule"
      onCancel={handleCancelOpenDetail}
      onOk={handleCancelOpenDetail}
    >
      <div>Room : {modalScheduleDetailData?.room}</div>
      <div>Course : {modalScheduleDetailData?.course}</div>
      <div>Class : {modalScheduleDetailData?.class}</div>
      <div>Slot : {modalScheduleDetailData?.slot}</div>
    </Modal>
  )
}

export default ModalScheduleDetail
