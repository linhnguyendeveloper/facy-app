import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getTeachers } from '../../redux/teachers/actions'
import { getAttendances } from '../../redux/attendances/actions'
import './style.scss'
import TeacherSchedule from './components/TeacherSchedule'
import ModalScheduleDetail from './components/ModalScheduleDetail'


const Teachers = ({ teachers, getTeachers, attendances, getAttendances }) => {
  useEffect(() => {
    getTeachers('token')
    getAttendances('token')
  }, [getTeachers, getAttendances])
  const [modalScheduleDetailOpen, setModalScheduleDetailOpen] = useState(false)
  const [selectedScheduleId, setSelectedScheduleId] = useState('')
  const handleSelectSchedule = id => {
    setSelectedScheduleId(id)
    setModalScheduleDetailOpen(true)
  }
  const handleCancelOpenDetail = () => {
    setModalScheduleDetailOpen(false)
  }

  const modalScheduleDetailData = attendances.find(
    item => item._id === selectedScheduleId
  )
  return (
    <div>

      <TeacherSchedule
        attendances={attendances}
        handleSelectSchedule={handleSelectSchedule}
      />
      <ModalScheduleDetail
        modalScheduleDetailOpen={modalScheduleDetailOpen}
        handleCancelOpenDetail={handleCancelOpenDetail}
        modalScheduleDetailData={modalScheduleDetailData}
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
