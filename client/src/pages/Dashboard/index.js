import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./style.scss";
import io from "socket.io-client";
import Cards from "./components/Cards";
import Chart from "./components/Chart";
import { notification, Breadcrumb, Layout, Table, Row, Col } from "antd";
import { FormProvider } from "antd/lib/form/context";
import { getCurrentCourse, getCountCurrent, getCountStudent } from "../../redux/teachers/actions";


const { Content } = Layout;
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Time',
    dataIndex: 'time',
  },
  {
    title: 'Attendance',
    dataIndex: 'attendance',
  },
];
const data = [
  {
    key: '1',
    name: 'Viet Linh',
    time: 'getAttendanceTime()',
    attendance: 'getAttendanceStatus()',
  },
  {
    key: '2',
    name: 'Van Tri',
    time: 'getAttendanceTime()',
    attendance:  'getAttendanceStatus()',
  },
  {
    key: '3',
    name: 'Viet Thuan',
    time: 'getAttendanceTime()',
    attendance:  'getAttendanceStatus()',
  },
];

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: 0,
      currentCourse: {
      },
      countStudent: 0
    };
  }

  componentWillMount() {
    // this.socket = io("localhost:3001");
    this.socket = io("serverlinhchicken.ga");
    this.socket.on("id", (res) => {
    }); // lắng nghe event có tên 'id'
    this.socket.on("newMessage", (response) => { }); //lắng nghe event 'newMessage' và gọi hàm newMessage khi có event
    this.socket.on("countCurrent", (response) => {
      this.newMessage(response.count);
      this.getNotification(response.student)
    });

  }
  componentDidMount() {
    this.props.getCurrentCourse();
    this.props.getCountCurrent();
    this.props.getCountStudent()
  }
  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    // if (this.state.message ==0 || nextProps.countCurrent !== this.props.countCurrent) {
    this.setState({ message: nextProps.countCurrent })
    // }
    // if (this.state.countStudent ==0 || nextProps.countStudent !== this.props.countStudent) {
    this.setState({ countStudent: nextProps.countStudent });
    // }
  }
  newMessage(m) {
    this.setState({
      message: m,
    });
  }

  getNotification = (student) => {
    notification.info({
      message: `PMG201`,
      description:
        student.email + (student.status == true ? " just present" : " just absent"),
      placement: "topRight",
    });
  };
  render() {
    console.log(this.state);
    return (
      <div>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0", textAlign: "left" }}>
            <Breadcrumb.Item>Course</Breadcrumb.Item>
            <Breadcrumb.Item>Classes</Breadcrumb.Item>
          </Breadcrumb>
        </Content>
      

        <Cards
          message={this.state.message}
          countStudent={this.state.countStudent}
          currentCourse={this.props.currentCourse}
        />
       <div className="student-attendances">

       <Row>


<Col span={3}>

</Col>

<Col span={18}>
<div className="dashboard-header">

<b className="gray-text"> Student Attendance - Slot N : DD/MM/YYYY</b>
</div>
  <Table columns={columns} dataSource={data} size="small" />
</Col>
<Col span={3}>
</Col>
</Row>
       </div>
      </div>
    );
  }
}
const mapState = (state) => ({
  currentCourse: state.teachers.currentCourse,
  countCurrent: state.teachers.countCurrent,
  countStudent: state.teachers.countStudent,
});

const mapDispatch = (dispatch) => ({
  getCurrentCourse: () => dispatch(getCurrentCourse()),
  getCountCurrent: () => dispatch(getCountCurrent()),
  getCountStudent: () => dispatch(getCountStudent()),


});
export default connect(mapState, mapDispatch)(Dashboard);
