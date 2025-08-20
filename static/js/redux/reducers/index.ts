import { combineReducers } from "redux";
import user from "../slices/userSlice";
import compute from "../slices/computeSlice";
import { api } from "../../services/api";

const reducers = combineReducers({
  user,
  [api.reducerPath]: api.reducer,
  compute,
});

export default reducers;
