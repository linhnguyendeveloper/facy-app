import React from "react";
import { Layout, Card, Avatar, Row, Col } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
const Cards = (props) => {
  return (
    <Row>
      <Col span={6}>
        <Card
          style={{ margin: 15, padding: 25,height:220 }}
          actions={[
            <div>
              {" "}
              <span style={{ marginRight: 10 }}>Show more </span>{" "}
              <SettingOutlined key="setting" />
            </div>,
          ]}
        >
          <div>
            <p>Students</p>
            <span style={{ color: "#417d8d", fontSize: 35 }}>{props.countStudent}</span>
          </div>
        </Card>
      </Col>
      <Col span={6}>
        <Card
          style={{ margin: 15, padding: 25,height:220 }}
          actions={[
            <div>
              {" "}
              <span style={{ marginRight: 10 }}>Show more </span>{" "}
              <SettingOutlined key="setting" />
            </div>,
          ]}
        >
          <div>
            <p>Absent</p>
            <span style={{ color: "red", fontSize: 35 }}>{props.countStudent - props.message}</span>
          </div>
        </Card>
      </Col>

      <Col span={6}>
        <Card
          style={{ margin: 15, padding: 25,height:220 }}
          actions={[
            <div>
              {" "}
              <span style={{ marginRight: 10 }}>Show more </span>{" "}
              <SettingOutlined k  ey="setting" />
            </div>,
          ]}
        >
          <div>
            <p>Present</p>
            <span style={{ color: "#0092ff", fontSize: 35 }}>{props.message}    </span>
          </div>
        </Card>
      </Col>
      <Col span={6}>
        <Card
          style={{ margin: 15, padding: 25,height:220 }}
          actions={[
            <div>
              {" "}
              <span style={{ marginRight: 10 }}>Show more </span>{" "}
              <SettingOutlined key="setting" />
            </div>,
          ]}
        >
          <div>
            <p>Current Course</p>
            <span style={{ color: "gray", fontSize: 35 }}>{props.currentCourse}</span>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default Cards;
