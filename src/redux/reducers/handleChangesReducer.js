import * as types from "../actions/actionTypes"
import initialState from "../reducers/initialState"

export default function handleChangereducer(state = initialState.btnSaveClicked, action) {

    if (types.SAVE_BUTTON_CLICKED == action.type) {
        return true
    }
    if (types.COURSE_FORM_ENTERED == action.type) {
        return false
    }
    return state
}