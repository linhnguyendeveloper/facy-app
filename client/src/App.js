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

// const firebaseApp = firebase.initializeApp(firebaseConfig)
// const firebaseAppAuth = firebaseApp.auth()
// const providers = {
//   googleProvider: new firebase.auth.GoogleAuthProvider()
// }
// require('firebase/database')
// require('firebase')
class App extends React.Component {
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
              <Route path="/admin/schedule-management" component={ScheduleManagement} exact />
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
