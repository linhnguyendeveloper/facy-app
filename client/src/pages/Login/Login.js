import "../../App.css";
import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Input, Checkbox, Button, message } from "antd";
import { Link } from "react-router-dom";
import { login } from "../../redux/auth";
import { connect } from "react-redux";
import GoogleLogin from "react-google-login";

function Login({ login, isAuthen, history, userAuth }) {
  const responseGoogle = (response) => {
   const email = response.profileObj.email
   login({email:email,password:'123456'})
  };
  const { Header, Footer, Content } = Layout;
  const [input, setInput] = useState({
    password: "",
    email: "",
  });
  const onChangeInput = (type, value) => {
    type === "password"
      ? setInput({ ...input, password: value })
      : setInput({ ...input, email: value });
  };
  const onSubmit = () => {
    login(input);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSubmit();
    }
  };
  useEffect(() => {
    if (isAuthen) {
      message.loading("Signing in ... ", 1, () => {
        message.success("Sign in success !", 1, () => {
          if (userAuth.user.role_name === "STUDENT")
            history.push("/attendances");
          else history.push("/classes");
        });
      });
    }
  }, [isAuthen]);
  return (
    <div className="Login">
      <Layout style={{ minHeight: "100vh" }}>
        <Layout className="background-images">
          <Header style={{ height: 50 }}>
            <img
              src="https://cuocduaso.fpt.com.vn/sites/default/files/fpt_university.png"
              alt="logo"
              style={{
                width: 172,
                height: 38,
                paddingTop: 7,
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
              }}
            ></img>
          </Header>
          <Content>
            <div className="login-component">
              <Row>
                <Col span={8}></Col>
                <Col span={8}>
                  <p style={{ height: 60 }}></p>

                  <div className="login-pannel">
                    <h1 style={{ color: "white" }}>
                      Login to Facy Attendance !!
                    </h1>
                    <p>Username</p>
                    <Input
                      style={{ width: 300 }}
                      onChange={(e) => {
                        onChangeInput("email", e.target.value);
                      }}
                      value={input.email}
                    />
                    <p></p>
                    <p>Password</p>
                    <Input
                      style={{ width: 300 }}
                      type="password"
                      onChange={(e) => {
                        onChangeInput("password", e.target.value);
                      }}
                      onKeyDown={handleKeyDown}
                      value={input.password}
                    />
                    <p></p>
                    <p>
                      {" "}
                      <Checkbox /> Remember me?
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <GoogleLogin
                        clientId="27898887738-phn1q1jod6v6lc3dphbcggrf44a59p2r.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        // onFailure={responseGoogle}
                        // cookiePolicy={"single_host_origin"}
                      />
                      <Button
                        type="primary"
                        onClick={onSubmit}
                        style={{ height: 47, borderRadius: 3, marginLeft: 10 }}
                      >
                        Sign In
                      </Button>
                    </div>
                  </div>
                </Col>
                <Col span={8}></Col>
              </Row>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

const mapState = (state) => ({
  isAuthen: state.auth.isAuthen,
  userAuth: state.auth.userAuth,
});

const mapDispatch = (dispatch) => ({
  login: (token) => dispatch(login(token)),
});
export default connect(mapState, mapDispatch)(Login);
