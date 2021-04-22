import * as types from "./actionTypes"
import * as courseApi from "../../api/courseApi"
import { beginApiCall, apiCallError } from "./apiStatusActions"

export function loadCoursesSuccess(courses) {
    return {
        type: types.LOAD_COURSES_SUCCESS, courses
    }
}

export function createCourseSuccess(course) {
    return {
        type: types.CREATE_COURSE_SUCCESS, course
    }
}
export function updateCourseSuccess(course) {
    return {
        type: types.UPDATE_COURSE_SUCCESS, course
    }
}

export function deleteCourseOptimistic(course) {
    return {
        type: types.DELETE_COURSE_OPTIMISTIC, course
    }
}

export function createCourseHistorySuccess(savedCourseHist) {
    return {
        type: types.CREATE_COURSEHISTORY_SUCCESS, savedCourseHist
    }
}

export function updateCourseHistorySuccess(savedCourseHist) {
    return {
        type: types.UPDATE_COURSEHISTORY_SUCCESS, savedCourseHist
    }
}

export function loadCoursesHistorySuccess(coursesHistory) {
    return {
        type: types.LOAD_COURSESHISTORY_SUCCESS, coursesHistory
    }
}

export function deleteCourseHistoryOptimistic(courseHistoryId) {
    return {
        type: types.DELETE_COURSEHISTORY_OPTIMISTIC, courseHistoryId
    }
}

export function loadCourses() {

    return function (dispatch) {
        dispatch(beginApiCall());
        return courseApi.getCourses().then(courses => {
            dispatch(loadCoursesSuccess(courses))
        })
            .catch(err => {
                dispatch(apiCallError())
                throw err
            })
    }
}

export function saveCourse(course) {
    return function (dispatch) {
        dispatch(beginApiCall());
        return courseApi
            .saveCourse(course)
            .then(savedCourse => {
                //             dispatch(saveBtnClicked())
                course.id
                    ?
                    dispatch(updateCourseSuccess(savedCourse))
                    : dispatch(createCourseSuccess(savedCourse));
            })
            .catch(error => {
                dispatch(apiCallError())
                throw error
            });
    };
}

export function saveCourseHistory(courseHistory) {
    return function (dispatch) {
        dispatch(beginApiCall());
        return courseApi.saveCourseHistory(courseHistory)
            .then(savedCourseHist => {
                console.log('savedCourseHist :>> ', savedCourseHist);
                console.log('courseHistory.id :>> ', courseHistory.id);
                courseHistory.id ?
                    dispatch(updateCourseHistorySuccess(savedCourseHist))
                    :
                    dispatch(createCourseHistorySuccess(savedCourseHist))

            })
            .catch(error => {
                dispatch(apiCallError())
                throw error
            })
    }
}

export function deleteCourse(course) {
    return function (dispatch) {
        dispatch(deleteCourseOptimistic(course))
        return courseApi.deleteCourse(course.id);
    }
}



export function loadCoursesHistory() {
    return function (dispatch) {
        dispatch(beginApiCall());
        return courseApi.getCoursesHistory().then(coursesHistory => {
            dispatch(loadCoursesHistorySuccess(coursesHistory))
        })
            .catch(error => {
                dispatch(apiCallError())
                throw error
            })
    }
}

export function deleteCourseHistory(courseHistoryId) {

    return function (dispatch) {
        dispatch(deleteCourseHistoryOptimistic(courseHistoryId))

        return courseApi.deleteCourseHistory(courseHistoryId)
    }

}