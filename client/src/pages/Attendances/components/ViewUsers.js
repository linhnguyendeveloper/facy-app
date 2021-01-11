import React from 'react'
import { EyeOutlined } from '@ant-design/icons'

const ViewUsers = ({ setVisibleModalUsers, setIdClicked, id }) => {
  const handleViewUsers = () => {
    setVisibleModalUsers(true)
    setIdClicked(id)
  }
  return (
    <span>
      <EyeOutlined onClick={handleViewUsers} />
    </span>
  )
}

export default ViewUsers
