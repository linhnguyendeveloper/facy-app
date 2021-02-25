import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAttendances } from "../../redux/attendances/actions";
import TableManagement from "./Table";
import "./style.scss";

import { Layout, Card, Avatar } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Meta } = Card;
const Dashboard = ({ attendances, getAttendances }) => {
  useEffect(() => {
    getAttendances("token");
  }, [getAttendances]);
  return (
    <div>
      <div>
        <div>DASHBARD</div>
        <Card
          style={{ width: "20%" }}
          // cover={
          //   <img
          //     alt="example"
          //     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          //   />
          // }
          actions={[
            <div>
              {" "}
              <span style={{ marginRight: 10 }}>Today attendances </span>{" "}
              <SettingOutlined key="setting" />
            </div>,
            // <EditOutlined key="edit" />,
            // <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <div>
            {" "}
            <span style={{ color: "#417d8d", fontSize: "27px" }}>
              {" "}
              30{" "}
            </span> / <span style={{ marginLeft: 5, color: "gray" }}> 40 </span>
          </div>
          <div>
            {" "}
            <span> Presented </span>{" "}
          </div>
        </Card>
      </div>
    </div>
  );
};
const mapState = (state) => ({
  attendances: state.attendances.attendances,
});

const mapDispatch = (dispatch) => ({
  getAttendances: (token) => dispatch(getAttendances(token)),
});
export default connect(mapState, mapDispatch)(Dashboard);
