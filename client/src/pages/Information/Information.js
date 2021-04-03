import "../../App.css";
import React, { useEffect, useState } from "react";
import { Input, Card, Row, Col, Image, Button } from "antd";
import "./style.scss";

function Information() {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  return (
    <div className="Information">
      <div className="site-layout-content">
        <Row>
          <Col span={5}></Col>

          <Col span={7}>
            <Image
              width={300}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
            <Button>Chagne Avatar</Button>
          </Col>
          <Col span={7}>
            <Card
              title="User information"
              bordered={false}
              style={{ width: 300, height: 300 }}
            >
              <p>Full Name : {user.full_name}</p>
              <p>Email : {user.email}</p>
              <p>Role : {user.role}</p>
              <p>Student code : {user.id}</p>
              
            </Card>

            <Button>Chagne Information</Button>
          </Col>
          <Col span={5}></Col>
        </Row>
      </div>
    </div>
  );
}

export default Information;
