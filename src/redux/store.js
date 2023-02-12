import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import { userReducer } from "./auth.reducer";
import thunk from "redux-thunk";
const rootReducer = combineReducers({
  auth: userReducer,
});
export const store = createStore(rootReducer, applyMiddleware(thunk));
