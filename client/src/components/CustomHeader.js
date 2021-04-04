import React, { useState } from "react";
import { Layout, Breadcrumb, Button, Badge, Modal, Menu, Dropdown } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
const { Header, Content } = Layout;

const CustomHeader = ({ history }) => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to='/attendances'>
          <p style={{marginBottom:0}}>Request change attendance status from Nguyen Viet Linh</p>
          <p style={{color:'gray',fontSize:12}}>04-04-2020</p>
        </Link>
      </Menu.Item>
      
      <Menu.Item>
        <Link to='/attendances'>
          <p style={{marginBottom:0}}>Request change attendance status from Nguyen Viet Linh</p>
          <p style={{color:'gray',fontSize:12}}>04-04-2020</p>
        </Link>
      </Menu.Item>
      
    </Menu>
  );
  return (
    <>
      <Header
        className="site-layout-background"
        style={{
          padding: 0,
          backgroundColor: "white",
          height: 50,
          textAlign: "right",
        }}
      >
        {!user ? null : (
          <div>
           

            <span style={{ marginRight: 12 }}>Hello {user.full_name}</span>
            <Dropdown overlay={menu} placement="bottomRight" arrow  >
              <Badge count={1} size="small" >
                <BellOutlined />
              </Badge>
            </Dropdown>
            <Button
              type="danger"
              style={{ margin: 9,marginLeft:20 }}
              onClick={() => {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                history.push("/login");
              }}
            >
              Log out
            </Button>
          </div>
        )}
      </Header>
    </>
  );
};

export default withRouter(CustomHeader);
