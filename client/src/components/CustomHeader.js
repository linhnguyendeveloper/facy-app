import React from "react";
import { Layout, Breadcrumb, Button } from "antd";
import { withRouter } from "react-router-dom";
const { Header, Content } = Layout;

const CustomHeader = ({history}) => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  return (
    <>
      <Header
        className="site-layout-background"
        style={{ padding: 0, backgroundColor: "white", height: 50,textAlign:'right' }}
      >
        {!user ? null : (
          <div>
            Hello {user.full_name }
            <Button
              type="danger"
              style={{ margin:9}}
              onClick={()=>{
                localStorage.removeItem('user')
                localStorage.removeItem('token')
                history.push('/login')
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
