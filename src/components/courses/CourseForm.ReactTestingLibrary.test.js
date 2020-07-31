import React from "react"
import { cleanup, render } from "react-testing-library"
import CourseForm from "./CourseForm"

afterEach(cleanup)

function renderCourseForm(args) {
    let defaultProps = {
        authors: [],
        course: {},
        saving: false,
        onSave: () => { },
        onChange: () => { },
        errors: {}
    }

    const props = { ...defaultProps, ...args }
    return render(<CourseForm {...props} />)
}

it("should render Add Course header", () => {
    const { getByText } = renderCourseForm();
    getByText("Add Course")
}
)

it("should render label 'Save' on saving", () => {
    const { getByText } = renderCourseForm();
    getByText("Save");
})

it("should render label 'Saving' on saving", () => {
    const { getByText } = renderCourseForm({ saving: true });
    //  debug();
    getByText("Saving...")
})