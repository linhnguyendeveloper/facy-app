import React from 'react';
import { Layout, Menu } from 'antd'
import { BookOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { SubMenu } = Menu
const { Sider } = Layout

const CustomMenu = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  return (
    <Sider>
      <div className="logo">
        <img
          src="https://cuocduaso.fpt.com.vn/sites/default/files/fpt_university.png"
          alt="logo"
          style={{ width: 172, height: 38, paddingTop: 7, paddingLeft: 18 }}
        ></img>
      </div>
      <div className="lecture-avatar">
        <img
          src="https://i.pinimg.com/originals/d7/9d/ee/d79dee61fb9549b02870a58a58844657.jpg"
          alt="lecture-images"
          style={{ width: 170, height: 170,marginBottom:30 }}
        />
          <p>Welcome</p> <Link to='/information'> {user.full_name} </Link>
        </div>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1"><Link to='/teachers'> </Link> Teaching Schedule</Menu.Item>
          <Menu.Item key="2"><Link to='/attendances'> </Link>Attendances</Menu.Item>
      
      </Menu>
    </Sider>
  );
};

export default CustomMenu;