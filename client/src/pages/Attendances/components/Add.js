import React, { useEffect, useState } from 'react'
import { Modal, Select, Form, Input, Button } from 'antd'
import { PlusSquareOutlined } from '@ant-design/icons'
const { Option } = Select

const Add = ({ setVisibleModal, setIsEdit }) => {
  //   const [form] = Form.useForm()
  //   useEffect(() => {
  //     form.setFieldsValue({ ...inputValue })
  //   }, [form, inputValue])
  const handleAdd = () => {
    setVisibleModal(true)
    //   setEditId('')
    setIsEdit(false)
    //   setInputValue({
    //     amount: 1,
    //   })
  }

  return (
    <>
      <Button onClick={handleAdd} className="add-data">
        Add
        <PlusSquareOutlined className="plus-square-outlined" />
      </Button>
    </>
  )
}

export default Add
