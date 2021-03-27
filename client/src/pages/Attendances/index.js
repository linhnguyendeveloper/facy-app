import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getAttendances,
  getUserAttendances,
  getAttendanceClass
} from "../../redux/attendances/actions";
import TableManagement from "./Table";
import "./style.scss";

import { Layout, Breadcrumb } from "antd";
const { Content } = Layout;
const Attendances = ({
  attendances,
  getAttendances,
  user_attendances,
  getUserAttendances,
  class_attendances,
  getAttendanceClass
}) => {
  useEffect(() => {
    getAttendances("token");
  }, [getAttendances]);
  return (
    <div style={{height:620}}>
      <div>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0", textAlign: "left" }}>
            <Breadcrumb.Item>Course</Breadcrumb.Item>
            <Breadcrumb.Item>Attendance</Breadcrumb.Item>
          </Breadcrumb>
        </Content>
      </div>
      <div>
        <TableManagement 
          attendances={attendances}
          user_attendances={user_attendances}
          getUserAttendances={getUserAttendances}
          class_attendances={class_attendances}
          getAttendanceClass={getAttendanceClass}
        />
      </div>
    </div>
  );
};
const mapState = (state) => ({
  attendances: state.attendances.attendances,
  user_attendances: state.attendances.user_attendances,
  class_attendances: state.attendances.class_attendances,

});

const mapDispatch = (dispatch) => ({
  getAttendances: (token) => dispatch(getAttendances(token)),
  getUserAttendances: (token) => dispatch(getUserAttendances(token)),
  getAttendanceClass: (className) => dispatch(getAttendanceClass(className)),
  
});
export default connect(mapState, mapDispatch)(Attendances);
