import React from "react";
// import withFirebaseAuth from 'react-with-firebase-auth'
// import firebase from 'firebase/app'
// import 'firebase/auth'
// import firebaseConfig from './firebaseConfig'
import Attendances from "./pages/Attendances";
import Teachers from "./pages/Teachers";
import Login from "./pages/Login/Login";
import "antd/dist/antd.css";
import { Route, Switch, Redirect } from "react-router-dom";
import CustomMenu from "./components/CustomeMenu";
import CustomHeader from "./components/CustomHeader";
import CustomFooter from "./components/CustomFooter";
import { Layout } from "antd";
import ScheduleManagement from "./pages/ScheduleManagement";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin/AdminOverview"
import AdminDetailView from "./pages/Admin/AdminDetailView"
import io from "socket.io-client";
import Information from "./pages/Information/Information";

class App extends React.Component {
  state = {
    message: ''
  }
  componentWillMount() {
    this.socket = io("localhost:3001");
    this.socket.on("id", (res) => {

    }); // lắng nghe event có tên 'id'
    this.socket.on("newMessage", (response) => {
      this.newMessage(response);
    }); //lắng nghe event 'newMessage' và gọi hàm newMessage khi có event
  }
  //Khi có tin nhắn mới, sẽ push tin nhắn vào state mesgages, và nó sẽ được render ra màn hình
  newMessage(m) {
    console.log(m);
    this.setState({
      message: this.state.message + m
    })
  }
  //Gửi event socket newMessage với dữ liệu là nội dung tin nhắn
  sendnewMessage(m) {
    if (m.value) {
      this.socket.emit("newMessage", m.value); //gửi event về server
      m.value = "";
    }
  }
  render() {
    return (
      <div className="App">
        <Switch>
          <Layout style={{ minHeight: "100vh" }}>
            <CustomMenu />
            <Layout>
              <CustomHeader />
              <Switch>
                <Route exact path="/">
                  <Redirect to="/login" />
                </Route>
                <Route path="/login" component={Login} exact />

                <Route path="/attendances" component={Attendances} exact />
                <Route path="/dashboard" component={Dashboard} exact />
                <Route path="/teachers" component={Teachers} exact />
                <Route path="/adminOverview/" component={Admin} exact />
                <Route path="/adminDetail/" component={AdminDetailView} exact />
                <Route path="/information/" component={Information} exact />
                <Route
                  path="/admin/schedule-management"
                  component={ScheduleManagement}
                  exact
                />
              </Switch>
              <CustomFooter />
            </Layout>
          </Layout>
        </Switch>
      </div>
    );
  }
}
export default App;
// export default withFirebaseAuth({
//   providers,
//   firebaseAppAuth
// })(App)
