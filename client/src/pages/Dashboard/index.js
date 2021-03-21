import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./style.scss";
import io from "socket.io-client";
import Cards from "./components/Cards";
import Chart from "./components/Chart";
import { notification } from "antd";
import { FormProvider } from "antd/lib/form/context";
import { getCurrentCourse,getCountCurrent,getCountStudent } from "../../redux/teachers/actions";
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 0,
      currentCourse:{
      },
      countStudent:0
    };
  }
 
  componentWillMount() {
    this.socket = io("localhost:3001");
    this.socket.on("id", (res) => {
    }); // lắng nghe event có tên 'id'
    this.socket.on("newMessage", (response) => {}); //lắng nghe event 'newMessage' và gọi hàm newMessage khi có event
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
        <div className="dashboard-header">
          <h2>Good morning, .</h2>
          <p className="gray-text"> Monday April 24 2021 | Da Nang</p>
        </div>

        <Cards
          message={this.state.message}
          countStudent={this.state.countStudent}
          currentCourse={this.props.currentCourse}
        />
        <Chart />
      </div>
    );
  }
}
const mapState = (state) => ({
  currentCourse: state.teachers.currentCourse,
  countCurrent:state.teachers.countCurrent,
  countStudent:state.teachers.countStudent,
});

const mapDispatch = (dispatch) => ({
  getCurrentCourse: () => dispatch(getCurrentCourse()),
  getCountCurrent: () => dispatch(getCountCurrent()),
  getCountStudent: () => dispatch(getCountStudent()),

  
});
export default connect(mapState, mapDispatch)(Dashboard);
