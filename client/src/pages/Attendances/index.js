import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getAttendances } from '../../redux/attendances/actions'
import TableManagement from './Table'
import './style.scss'

const Attendances = ({ attendances, getAttendances }) => {
  useEffect(() => {
    getAttendances('token')
  }, [getAttendances])
  return (
    <div>
      <p className="table-title ">ATTENDANCES</p>
      <TableManagement attendances={attendances} />
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
