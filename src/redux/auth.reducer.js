import {
  loginError,
  loginLoader,
  loginLogout,
  loginSuccess,
} from "./auth.type";
const getid = JSON.parse(localStorage.getItem("id")) || "";
const getuser = JSON.parse(localStorage.getItem("user")) || {};
const iState = {
  loader: false,
  error: false,
  isAuth: getid ? true : false,
  user: getuser,
  id: getid,
};

export const userReducer = (state = iState, { type, payload }) => {
  switch (type) {
    case loginLoader: {
      return {
        ...state,
        loader: true,
      };
    }

    case loginError: {
      return {
        ...state,
        loader: false,
        error: true,
      };
    }

    case loginSuccess: {
      return {
        ...state,
        loader: false,
        error: false,
        isAuth: true,
        user: payload,
        id: payload._id,
      };
    }

    case loginLogout: {
      return {
        ...state,
        loader: false,
        error: false,
        isAuth: false,
        user: {},
        id: "",
      };
    }
    default: {
      return state;
    }
  }
};
