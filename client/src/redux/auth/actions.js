
// import api from "services/api/users";
import { LOGIN_SUCCESS, LOGIN_FAIL } from "./actionTypes";
import {
  loginApi
} from '../../services/api/auth'
function set_login(data) {
  return {
    type: LOGIN_SUCCESS,
    data,
  };
}

function set_login_fail() {
  return {
    type: LOGIN_FAIL,
  };
}

export const login = (data) => {
  return (dispatch) => {
    loginApi(data).then((res)=>{
      dispatch(set_login(res.data))
      localStorage.setItem('token',res?.data?.token)

    })
    .catch((data)=>{
      console.log(data);
    })
  };
};

// export const getUserById = (id) => {
//   api.getUserByID(id)
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((err) => console.log(err));
// };
