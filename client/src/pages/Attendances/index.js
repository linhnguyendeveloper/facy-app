import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getAttendances } from '../../redux/attendances/actions'
import TableManagement from './Table'
import { Layout } from 'antd'
import './style.scss'
import CustomMenu from '../../components/CustomeMenu'
import CustomHeader from '../../components/CustomHeader'
import CustomFooter from '../../components/CustomFooter'
const Attendances = ({ attendances, getAttendances }) => {
  useEffect(() => {
    getAttendances('token')
  }, [getAttendances])
  return (
    <Layout style={{ minHeight: '100vh' }}>
       <CustomMenu />
      <Layout>
        <CustomHeader />
        <div>
          <p className="table-title ">ATTENDANCES</p>
          <TableManagement attendances={attendances} />
        </div>
        <CustomFooter />
      </Layout>
    </Layout>
  )
}
const mapState = state => ({
  attendances: state.attendances.attendances
})

const mapDispatch = dispatch => ({
  getAttendances: token => dispatch(getAttendances(token))
})
export default connect(mapState, mapDispatch)(Attendances)
