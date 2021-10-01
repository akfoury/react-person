import { SET_PERSONLIST, ADD_PERSONLIST, DELETE_PERSONLIST, UPDATE_PERSONLIST } from "../actions/actions-types";

const initialState = {
    personList: [],
    filteredPersonList: []
}

export default function PersonListReducer(state = initialState, action) {
    switch(action.type) {
        case SET_PERSONLIST: 
            return {
                ...state,
                personList: [...action.payload]
            }
        case ADD_PERSONLIST:
            return {
                ...state,
                personList: [action.payload, ...state.personList]
            }
        case DELETE_PERSONLIST:
            const deleteDeepClone = [...state.personList];
            return {
                ...state,
                personList: deleteDeepClone.filter((item, index) => index !== action.payload)
            }
        case UPDATE_PERSONLIST:
            const updateDeepClone = [...state.personList];
            return {
                ...state,
                personList: [...updateDeepClone.slice(0, action.payload[0]), action.payload[1], ...updateDeepClone.slice(action.payload[0] + 1)]
            }
        default:
            return state;
    }
}