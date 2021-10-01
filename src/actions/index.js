import { SET_PERSONLIST, ADD_PERSONLIST, DELETE_PERSONLIST, UPDATE_PERSONLIST, SET_FORMDATA } from "./actions-types";

export const setPersonList = list => dispatch => {
    dispatch({type: SET_PERSONLIST, payload: list});
}

export const addPersonList = person => dispatch => {
    dispatch({type: ADD_PERSONLIST, payload: person}); 
}

export const deletePersonList = index => dispatch => {
    dispatch({type: DELETE_PERSONLIST, payload: index});
}

export const updatePersonList = (index, responseData) => dispatch => {
    dispatch({type: UPDATE_PERSONLIST, payload: [index, responseData]});
}

export const setFormData = (name, value) => dispatch => {
    dispatch({type: SET_FORMDATA, payload: [name, value]});
}



