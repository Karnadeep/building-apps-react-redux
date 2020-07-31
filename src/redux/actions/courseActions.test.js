import * as types from "./actionTypes"
import * as courseActions from "./courseActions"
import { courses } from "../../../tools/mockData"
import thunk from "redux-thunk"
import fetchMock from "fetch-mock"
import configureMockStore from "redux-mock-store"

//async actions
const middleware = [thunk]
const mockStore = configureMockStore(middleware)

describe("Async Actions", () => {
    afterEach(() => {
        fetchMock.restore()
    })

    describe("Load Courses Thunk", () => {
        it("should create BEGIN_API_CALL and LOAD_COURSES_SUCCESS when loading courses", () => {
            fetchMock.mock("*", {
                body: courses,
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const expectedActions = [
                {
                    type: types.BEGIN_API_CALL
                },
                {
                    type: types.LOAD_COURSES_SUCCESS,
                    courses
                }
            ]

            const store = mockStore({ coures: [] })
            return store.dispatch(courseActions.loadCourses()).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        })
    })
})


describe("createCourseSuccess", () => {
    it("should create CREATE_COURSE_SUCCESS action", () => {
        // assign
        const course = courses[0]
        const expectedAction = {
            type: types.CREATE_COURSE_SUCCESS,
            course
        }
        //act
        const action = courseActions.createCourseSuccess(course)
        //asert
        expect(action).toEqual(expectedAction)
    })
})