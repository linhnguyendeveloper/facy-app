import '../../App.css';
import React from 'react';
import { Layout, Row, Col, Input, Checkbox, Button } from 'antd';
function Login() {
    const { Header, Footer, Content } = Layout;
    return (
        <div className="Login">
            <Layout style={{ minHeight: '100vh' }} >


                <Layout className="background-images">

                    <Header style={{ height: 50 }}>
                        <img src="https://cuocduaso.fpt.com.vn/sites/default/files/fpt_university.png" alt="logo" style={{ width: 172, height: 38, paddingTop: 7, marginLeft: 'auto', marginRight: 'auto', display: 'block' }}></img>
                    </Header>
                    <Content>
                        <div className="login-component">
                            <Row>
                                <Col span={8}></Col>
                                <Col span={8}>
                                    <p style={{ height: 60 }}></p>

                                    <div className="login-pannel">
                                        <h1 style={{ color: 'white' }}>Login to Facy Attendance !!</h1>
                                        <p>Username</p>
                                        <Input />
                                        <p></p>
                                        <p>Password</p>
                                        <Input />
                                        <p></p>
                                        <p>  <Checkbox />  Remember me?</p>
                                        <Button type="primary">Submit</Button>

                                    </div>

                                </Col>
                                <Col span={8}></Col>
                            </Row>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center', height: 1 }}><p style={{ marginTop: -10 }}>Copyright©2021 Facy Team - FPT University Da Nang</p></Footer>
                </Layout>
            </Layout>
        </div>
    );
}

export default Login;

