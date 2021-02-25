import { React, useState } from 'react'
import { Modal, message, Checkbox } from 'antd'
import { Table } from 'antd'

const ModalUsers = ({
  visibleModalUsers,
  setVisibleModalUsers,
  idClicked,
  schedule
}) => {
  const handleOkCheckAttendances = () => {
    setVisibleModalUsers(false)
    message.info('Update attendance success !')
  }
  const handleCancel = () => {
    setVisibleModalUsers(false)
  }
  const listUserAttendances = schedule && schedule.find(item => item.lessonCount === idClicked)
    ?.student
  const columns = [
    {
      title: 'Name',
      dataIndex: 'studentName',
      key: 'studentName'
    },
    {
      title: 'Student code  ',
      dataIndex: 'studentID',
      key: 'studentID'
    },
    {
      title: 'Attendances',
      dataIndex: 'attendance',
      key: 'attendance',
      render: (text, record) => <Checkbox defaultChecked={record.attendance} />
    }
  ]
  // console.log(listUserAttendances)
  return (
    <Modal
      title={'Users attendances'}
      visible={visibleModalUsers}
      onOk={handleOkCheckAttendances}
      onCancel={handleCancel}
      className="modal-add-edit"
      forceRender
    >
      <Table dataSource={listUserAttendances || []} columns={columns} />
    </Modal>
  )
}

export default ModalUsers
