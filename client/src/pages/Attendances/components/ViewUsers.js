import React from 'react'
import { UsergroupDeleteOutlined } from '@ant-design/icons'

const ViewUsers = ({ setVisibleModalUsers, setIdClicked, id, studentCount }) => {
  const handleViewUsers = () => {
    setVisibleModalUsers(true)
    setIdClicked(id)
  }
  return (
    <div onClick={handleViewUsers} style={{ cursor: 'pointer' }}>
      <UsergroupDeleteOutlined /> {studentCount}
    </div>
  )
}

export default ViewUsers
