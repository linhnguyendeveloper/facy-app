import React from "react";
import { Layout, Breadcrumb, Button, Badge } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
const { Header, Content } = Layout;

const CustomHeader = ({ history }) => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

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
            <Badge  count={1} size='small'>
              <BellOutlined />
            </Badge>
            <span style={{marginLeft:12}}>Hello {user.full_name}</span>
            <Button
              type="danger"
              style={{ margin: 9 }}
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
