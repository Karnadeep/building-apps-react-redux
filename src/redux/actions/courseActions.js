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
export function courseFormEntered() {
    return {
        type: types.COURSE_FORM_ENTERED
    }
}
export function saveBtnClicked() {
    return {
        type: types.SAVE_BUTTON_CLICKED
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
                    ? dispatch(updateCourseSuccess(savedCourse))
                    : dispatch(createCourseSuccess(savedCourse));
            })
            .catch(error => {
                dispatch(apiCallError())
                throw error
            });
    };
}

export function deleteCourse(course) {
    return function (dispatch) {
        dispatch(deleteCourseOptimistic(course))
        return courseApi.deleteCourse(course.id);
    }
}

export function fillForm() {
    return function (dispatch) {
        dispatch(courseFormEntered())
    }
}