import {
  loginError,
  loginLoader,
  loginLogout,
  loginSuccess,
} from "./auth.type";
import axios from "axios";
export const loginAction = (data) => async (dispatch) => {
  dispatch({ type: loginLoader });
  let url = "http://localhost:9001/user/login";
  try {
    let res = await axios.post(url, data);

    if (res.data.status) {
      console.log(res.data.user);
      dispatch({ type: loginSuccess, payload: res.data.user });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("id", JSON.stringify(res.data.user._id));
      return res.data.status;
    } else {
      dispatch({ type: loginError });
      return res.data.status;
    }
  } catch (error) {
    dispatch({ type: loginError });
    return false;
  }
};

export const logoutAction = () => async (dispatch) => {
  dispatch({ type: loginLogout });
  localStorage.removeItem("user");
  localStorage.removeItem("id");
  return true;
};
