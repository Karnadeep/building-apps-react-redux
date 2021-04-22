import { combineReducers } from 'redux'
import courses from './courseReducer'
import authors from "./authorReducer"
import history from "./courseHistoryReducer"
import apiCallsInProgress from "./apiStatusReducer"

const rootReducer = combineReducers({
    courses,
    authors,
    apiCallsInProgress,
    history
})

export default rootReducer