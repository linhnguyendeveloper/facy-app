import '../../App.css';
import { Layout, Menu, Breadcrumb,Calendar, Badge } from 'antd';
import {
  BookOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';

function LectureSchedule() {

  function getListData(value) {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
        ];
        break;
      case 10:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
          { type: 'error', content: 'This is error event.' },
        ];
        break;
      case 15:
        listData = [
          { type: 'warning', content: 'This is warning event' },
          { type: 'success', content: 'This is very long usual event。。....' },
          { type: 'error', content: 'This is error event 1.' },
          { type: 'error', content: 'This is error event 2.' },
          { type: 'error', content: 'This is error event 3.' },
          { type: 'error', content: 'This is error event 4.' },
        ];
        break;
      default:
    }
    return listData || [];
  }
  
  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }
  
  function getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }
  
  function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }


  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;
  return (
    <div className="Lecture">
      <Layout style={{ minHeight: '100vh' }} >
        <Sider>
          <div className="logo" >
            <img src="https://cuocduaso.fpt.com.vn/sites/default/files/fpt_university.png" alt="logo" style={{ width: 172, height: 38, paddingTop: 7, paddingLeft: 18 }}></img>
          </div>
          <div className="lecture-avatar">
            <img src="https://i.pinimg.com/originals/d7/9d/ee/d79dee61fb9549b02870a58a58844657.jpg" alt="lecture-images" style={{ width: 170, height: 170 }} />
            Welcome, lecture!
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

            <SubMenu key="sub1" icon={<BookOutlined />} title="Course">
              <Menu.Item key="1">Teaching Schedule</Menu.Item>
              <Menu.Item key="2">Classes Attendance</Menu.Item>

            </SubMenu>

          </Menu>
        </Sider>
        <Layout>
          <Header className="site-layout-background" style={{ padding: 0, backgroundColor: 'white', height: 50 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0',width:200 }}>
              <Breadcrumb.Item>Course</Breadcrumb.Item>
              <Breadcrumb.Item>Teaching Schedule</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 10, minHeight: 360, backgroundColor: 'white' }}>


            <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
            </div>
          </Content>


          <Footer style={{ textAlign: 'center', height: 1 }}><p style={{ marginTop: -10 }}>Copyright©2021 Facy Team - FPT University Da Nang</p></Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default LectureSchedule;
