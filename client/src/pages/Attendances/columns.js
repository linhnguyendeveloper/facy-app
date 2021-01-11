import React from 'react'
import { UsergroupDeleteOutlined } from '@ant-design/icons'
import Add from './components/Add'
import Edit from './components/Edit'
import Delete from './components/Delete'
import ViewUsers from './components/ViewUsers'

const getColumns = (
  setVisibleModal,
  setIsEdit,
  setVisibleModalUsers,
  setIdClicked
) => {
  return [
    {
      title: 'Class',
      dataIndex: 'classId',
      key: 'classId',
      render: text => <span>SE1302</span>
    },
    {
      title: 'Course',
      dataIndex: 'courseId',
      key: 'courseId',
      render: text => <span>PMG201</span>
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: text => <span>{text}</span>
    },
    {
      title: 'Room',
      dataIndex: 'room',
      key: 'room',
      render: text => <span>{text}</span>
    },
    {
      title: 'Slot',
      dataIndex: 'time',
      key: 'time',
      render: text => <span>{text}</span>
    },
    ,
    {
      title: 'Teacher',
      dataIndex: 'time',
      key: 'time',
      render: text => <span>PhucTC</span>
    },
    {
      title: 'Students',
      dataIndex: 'time',
      key: 'time',
      render: text => <UsergroupDeleteOutlined />
    },
    {
      title: 'Actions',
      dataIndex: 'Actions',
      key: 'Actions',
      render: (text, record) => {
        return (
          <>
            <Edit setVisibleModal={setVisibleModal} setIsEdit={setIsEdit} />
            <Delete />
            <ViewUsers
              setVisibleModalUsers={setVisibleModalUsers}
              setIdClicked={setIdClicked}
              id={record._id}
            />
          </>
        )
      }
    }
  ]
}
export default getColumns
