import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./style.scss";
import io from "socket.io-client";
import Cards from "./components/Cards";
import Chart from "./components/Chart";
import { notification } from "antd";
class Dashboard extends React.Component {
  state = {
    message: 0,
  };
  componentWillMount() {
    this.socket = io("localhost:3001");
    this.socket.on("id", (res) => {
      console.log("====================================");
      console.log(res);
      console.log("====================================");
    }); // lắng nghe event có tên 'id'
    this.socket.on("newMessage", (response) => {
    }); //lắng nghe event 'newMessage' và gọi hàm newMessage khi có event
    this.socket.on("countCurrent", (response) => {
      this.newMessage(response);
    });
  }
  //Khi có tin nhắn mới, sẽ push tin nhắn vào state mesgages, và nó sẽ được render ra màn hình
  newMessage(m) {
    console.log(m);
    if(m!==this.state.message) this.getNotification(m);
    this.setState({
      message: m
    });
  }
  //Gửi event socket newMessage với dữ liệu là nội dung tin nhắn
  sendnewMessage(m) {
    if (m.value) {
      this.socket.emit("newMessage", m.value); //gửi event về server
      m.value = "";
    }
  }
  getNotification = (placement) => {
    notification.info({
      message: `PMG201`,
      description: "Linh just present",
      placement: "topRight",
    });
  };
  render() {
    return (
      <div>
        <div className="dashboard-header">
          <h2>Good morning, Linh.</h2>
          <p className="gray-text"> Monday April 24 2021 | Da Nang</p>
        </div>

        <Cards message={this.state.message} />
        <Chart />
        {/* <DonutWithText/> */}
      </div>
    );
  }
}
const mapState = (state) => ({
  // attendances: state.attendances.attendances,
});

const mapDispatch = (dispatch) => ({
  // getAttendances: (token) => dispatch(getAttendances(token)),
});
export default connect(mapState, mapDispatch)(Dashboard);
