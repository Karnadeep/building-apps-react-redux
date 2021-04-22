import * as types from "../actions/actionTypes"
import initialState from "./initialState"

export default function authorReducer(state = initialState.authors, action) {
    switch (action.type) {

        case types.LOAD_AUTHORS_SUCCESS:
            return action.authors

        case types.CREATE_AUTHOR_SUCCESS:
            return [
                ...state,
                action.createdAuthor
            ]
        case types.UPDATE_AUTHOR_SUCCESS:
            return state.map(author => (author.id == action.updatedAuthor.id ? action.updatedAuthor : author))

        case types.DELETE_AUTHOR_OPTIMISTIC:
            return state.filter(author => author.id !== action.authorId)

        default:
            return state
    }
}