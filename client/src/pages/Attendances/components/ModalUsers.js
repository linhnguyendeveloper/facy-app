import { React, useState } from 'react'
import { Modal, message, Checkbox } from 'antd'
import { Table } from 'antd'

const ModalUsers = ({
  visibleModalUsers,
  setVisibleModalUsers,
  idClicked,
  attendances
}) => {
  const handleOkCheckAttendances = () => {
    setVisibleModalUsers(false)
    message.info('Attendance')
  }
  const handleCancel = () => {
    setVisibleModalUsers(false)
  }
  const listUserAttendances = attendances.find(item => item._id === idClicked)
    ?.attendance
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Attendances',
      dataIndex: 'attendance',
      key: 'attendance',
      render: (text, record) => <Checkbox checked={record.attendance} />
    }
  ]
  console.log(listUserAttendances)
  return (
    <Modal
      title={'Users attendances'}
      visible={visibleModalUsers}
      onOk={handleOkCheckAttendances}
      onCancel={handleCancel}
      className="modal-add-edit"
      forceRender
    >
      <Table dataSource={listUserAttendances} columns={columns} />
    </Modal>
  )
}

export default ModalUsers
