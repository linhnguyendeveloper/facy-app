import { React, useState } from 'react'
import getColumns from './columns'
import { Table } from 'antd'
import Add from './components/Add'
import ModalAddEdit from './components/ModalAddEdit'
import ModalUsers from './components/ModalUsers'

const TableManagement = ({ attendances }) => {
  const [visibleModal, setVisibleModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [visibleModalUsers, setVisibleModalUsers] = useState(false)
  const [idClicked,setIdClicked] = useState('')  
  const columns = getColumns( setVisibleModal,setIsEdit,setVisibleModalUsers,setIdClicked)
    
  return (
    <>
      <Add
        setVisibleModal={setVisibleModal}
        setIsEdit={setIsEdit}
      />
      <ModalAddEdit
        visibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
        isEdit={isEdit}
      />
      <ModalUsers
      visibleModalUsers={visibleModalUsers}
      setVisibleModalUsers={setVisibleModalUsers}
      idClicked={idClicked}
      attendances={attendances}
      />
      <Table columns={columns} dataSource={attendances} />
    </>
  )
}

export default TableManagement
