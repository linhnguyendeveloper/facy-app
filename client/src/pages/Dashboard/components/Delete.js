import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

const Delete = ({}) => {
  const handleDelete = () => {
    message.info('Deleted')
  }

  return (
    <span className="btn-delete">
      <DeleteOutlined onClick={handleDelete} className="edit-data" />
    </span>
  )
}

export default Delete
