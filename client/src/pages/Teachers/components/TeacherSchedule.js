import React from 'react';
import { Calendar, Layout, Breadcrumb, Tag } from 'antd'
import '../style.scss'
import { EyeOutlined } from '@ant-design/icons'

const { Content } = Layout
const TeacherSchedule = ({ attendances, handleSelectSchedule }) => {
  const getListData = value => {
    const dateData = attendances.filter(
      item =>
        item.date === value.format('DD-MM-YYYY') && item.teacher === 'phuc'
    )
    let listData

    listData = dateData
      ? dateData.map(item => {
        return {
          type: 'success',
          class: item.class,
          course: item.course,
          room: item.room,
          id: item._id,
          slot: item.slot
        }
      })
      : []

    return listData
  }
  const dateCellRender = value => {
    const listData = getListData(value)
    return listData.map(item => (
      <div className="date-cell">
        <Tag color="#108ee9" onClick={() => handleSelectSchedule(item.id)} icon={<EyeOutlined />}>{item.course}</Tag>
      </div>
    ))
  }
  const monthCellRender = value => {
    const num = getMonthData(value)
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null
  }
  const getMonthData = value => {
    if (value.month() === 8) {
      return 1394
    }
  }

  return (
    <div>

   
    <div>
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0',textAlign:"left"}}>
          <Breadcrumb.Item>Course</Breadcrumb.Item>
          <Breadcrumb.Item>Lecture Schedule</Breadcrumb.Item>
        </Breadcrumb>

      </Content>
      </div>
      <div>
      <Calendar
        style={{ padding: 20 }}
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
      />
    </div>
    </div>
  );
};

export default TeacherSchedule;