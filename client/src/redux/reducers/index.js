import {combineReducers} from "redux";
import soldiers from "./soldiers";
import details from "./details";
import soldiersdeletes from "./soldiersdeletes";
import soldierscreate from "./soldierscreate";

const reducers = combineReducers({
  soldiers,
  details,
  soldiersdeletes,
  soldierscreate,
});

export default reducers;
