import React from 'react'
import { mount } from "enzyme"
import { courses, authors, newCourse } from "../../../tools/mockData";
import { ManageCoursePage } from "./ManageCoursePage";

function render(args) {
    let defaultProps = {
        courses,
        authors,

        history: {},
        loadAuthors: jest.fn(),
        loadCourses: jest.fn(),
        saveCourse: jest.fn(),
        course: newCourse,
        match: {}
    }
    const props = { ...defaultProps, ...args }
    return mount(<ManageCoursePage {...props} />)
}

it("sets error when attepting to save empty title field", () => {
    const wrapper = render()
    wrapper.find("form").simulate("submit")
    const error = wrapper.find(".alert").first()
    expect(error.text()).toBe("Title is required");
});

