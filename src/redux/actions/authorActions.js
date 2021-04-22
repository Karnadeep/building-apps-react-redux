import * as types from "./actionTypes"
import * as authorApi from "../../api/authorApi"
import { beginApiCall, apiCallError } from "./apiStatusActions"

export function loadAuthorsSuccess(authors) {
    return {
        type: types.LOAD_AUTHORS_SUCCESS, authors
    }
}
export function createAuthorSuccess(createdAuthor) {
    return {
        type: types.CREATE_AUTHOR_SUCCESS, createdAuthor
    }
}
export function updateAuthorSuccess(updatedAuthor) {
    return {
        type: types.UPDATE_AUTHOR_SUCCESS, updatedAuthor
    }
}
export function optimisticDeleteAuthor(authorId) {
    return {
        type: types.DELETE_AUTHOR_OPTIMISTIC, authorId
    }
}



export function loadAuthors() {
    return function (dispatch) {
        dispatch(beginApiCall());
        return authorApi.getAuthors().then(authors => {
            dispatch(loadAuthorsSuccess(authors))
        }).catch(error => {
            dispatch(apiCallError())
            throw error
        })
    }
}

export function saveAuthor(author) {
    return async function (dispatch) {
        try {
            dispatch(beginApiCall());
            const createdAuthor = await authorApi.saveAuthor(author)
            author.id ? dispatch(updateAuthorSuccess(createdAuthor))
                : dispatch(createAuthorSuccess(createdAuthor))
        } catch (error) {
            dispatch(apiCallError())
            throw error
        }
    }
}

export function deleteAuthors(authorId) {
    return async function (dispatch) {

        try {
            console.log('authorId :>> ', authorId);
            dispatch({
                type: types.DELETE_AUTHOR_OPTIMISTIC, authorId
            })

            await authorApi.deleteAuthor(authorId)
            return
        } catch (error) {
            throw error
        }


    }

}