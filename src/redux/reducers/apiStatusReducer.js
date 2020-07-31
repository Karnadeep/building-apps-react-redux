import * as types from "../actions/actionTypes"
import initialState from "./initialState"

function actionTypeEndsInSuccess(type) {
    return type.substring(type.length - 8) === "_SUCCESS"
}

export default function apiCallStatusReducer(
    state = initialState.apiCallInProgress
    , action
) {
    if (action.type == types.BEGIN_API_CALL) {
        return state + 1;
    } else if (types.API_CALL_ERROR == action.type || actionTypeEndsInSuccess(action.type)) {
        return state - 1;
    }

    return state
}