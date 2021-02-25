import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getTeachers } from '../../redux/teachers/actions'
import { getAttendances } from '../../redux/attendances/actions'
import {Layout, Breadcrumb } from 'antd'

import './style.scss'
import TeacherSchedule from './components/TeacherSchedule'
import ModalScheduleDetail from './components/ModalScheduleDetail'
import CustomMenu from '../../components/CustomeMenu'
import CustomHeader from '../../components/CustomHeader'
import CustomFooter from '../../components/CustomFooter'
const { Content } = Layout
const Teachers = ({ teachers, getTeachers, attendances, getAttendances }) => {
  useEffect(() => {
    getTeachers('token')
    getAttendances('token')
  }, [getTeachers, getAttendances])
  const [modalScheduleDetailOpen, setModalScheduleDetailOpen] = useState(false)
  const [selectedScheduleDay, setSelectedScheduleDay] = useState([])
  const handleSelectSchedule = id => {
    setSelectedScheduleDay(id)
    setModalScheduleDetailOpen(true)
  }
  const handleCancelOpenDetail = () => {
    setSelectedScheduleDay([])
    setModalScheduleDetailOpen(false)
  }

  return (
    <div>
   
   <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0', textAlign:"left" }}>
          <Breadcrumb.Item>Course</Breadcrumb.Item>
          <Breadcrumb.Item>Lecture Schedule</Breadcrumb.Item>
        </Breadcrumb>
      </Content>
      <TeacherSchedule
        attendances={attendances}
        handleSelectSchedule={handleSelectSchedule}
      />
      <ModalScheduleDetail
        modalScheduleDetailOpen={modalScheduleDetailOpen}
        handleCancelOpenDetail={handleCancelOpenDetail}
        modalScheduleDetailData={selectedScheduleDay}
      />
    </div>
  )
}
const mapState = state => ({
  teachers: state.teachers.teachers,
  attendances: state.attendances.attendances
})

const mapDispatch = dispatch => ({
  getTeachers: token => dispatch(getTeachers(token)),
  getAttendances: token => dispatch(getAttendances(token))
})
export default connect(mapState, mapDispatch)(Teachers)
