import { combineReducers } from "redux";
import PersonListReducer from "./PersonListReducer";
import FormDataReducer from "./FormDataReducer";

const rootReducer = combineReducers({
    personList: PersonListReducer,
    formData: FormDataReducer
});

export default rootReducer;