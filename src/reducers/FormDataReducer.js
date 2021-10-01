import { SET_FORMDATA } from "../actions/actions-types";

const initialFormData = {
    id: '',
    firstname: '',
    lastname: '',
    address: '',
    isActive: '1'
}

const initialState = {
    formData: initialFormData
}

export default function FormDataReducer(state = initialState, action) {
    switch(action.type) {
        case SET_FORMDATA:
            return {
                ...state,
                formData: {...state.formData, [action.payload[0]]: action.payload[1]}
            }
        default:
            return state;
    }
}