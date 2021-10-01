import { combineReducers } from "redux";
import PersonListReducer from "./PersonListReducer";

const rootReducer = combineReducers({
    personList: PersonListReducer
});

export default rootReducer;