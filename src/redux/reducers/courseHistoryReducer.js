import * as types from "../actions/actionTypes"
import initialState from "./initialState"

export default function courseHistoryReducer(state = initialState.coursesHistory, action) {
    let historyState = []
    switch (action.type) {
        case types.CREATE_COURSEHISTORY_SUCCESS:

            historyState = [...state,
            { ...action.savedCourseHist }]
            console.log('historyState :>> ', historyState);
            return historyState
        case types.UPDATE_COURSEHISTORY_SUCCESS:
            return state.map(courseHistory =>
                courseHistory.id === action.savedCourseHist.id ? action.savedCourseHist : courseHistory)

        case types.LOAD_COURSESHISTORY_SUCCESS:
            return action.coursesHistory

        case types.DELETE_COURSEHISTORY_OPTIMISTIC:
            return state.filter(courseHistory =>
                courseHistory.id !== action.courseHistoryId)
        default:
            return state
    }
}