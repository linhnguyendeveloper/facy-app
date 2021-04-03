import React, { useEffect, useState } from 'react'
import { Modal, Select, Form, Input, Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
const { Option } = Select

const Edit = ({ setVisibleModal, setIsEdit }) => {
  //   const [form] = Form.useForm()
  //   useEffect(() => {
  //     form.setFieldsValue({ ...inputValue })
  //   }, [form, inputValue])
  const handleEdit = () => {
    setVisibleModal(true)
    //   setEditId('')
    setIsEdit(true)
    //   setInputValue({
    //     amount: 1,
    //   })
  }

  return (
    <span className="btn-edit">
      <Button onClick={handleEdit} className="edit-data">Request Change</Button>
    </span>
  )
}

export default Edit
