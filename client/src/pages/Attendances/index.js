import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getAttendances } from '../../redux/attendances/actions'
import TableManagement from './Table'
import './style.scss'

import {Layout, Breadcrumb } from 'antd'
const { Content } = Layout
const Attendances = ({ attendances, getAttendances }) => {
  useEffect(() => {
    getAttendances('token')
  }, [getAttendances])
  return (
    
     
     <div>

   
<div>
  <Content style={{ margin: '0 16px' }}>
    <Breadcrumb style={{ margin: '16px 0',textAlign:"left"}}>
      <Breadcrumb.Item>Course</Breadcrumb.Item>
      <Breadcrumb.Item>Classes Attendance</Breadcrumb.Item>
    </Breadcrumb>

  </Content>
  </div>
  <div>
  <TableManagement attendances={attendances} />
</div>



     
    </div>
  )
}
const mapState = state => ({
  attendances: state.attendances.attendances
})

const mapDispatch = dispatch => ({
  getAttendances: token => dispatch(getAttendances(token))
})
export default connect(mapState, mapDispatch)(Attendances)
