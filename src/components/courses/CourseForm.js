import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import TextInput from "../common/TextInput"
import SelectInput from "../common/SelectInput"

const CourseForm = ({ authors,
    course,
    errors = {},
    onSave,
    onChange,
    saving = false }) => {
    return (
        <Fragment>

            <form onSubmit={onSave}>
                <h2>
                    {course.id ? "Edit" : "Add"} Course
           </h2>
                {errors.onSave && (
                    <div className="alert alert-danger" role="alert">
                        {errors.onSave}
                    </div>
                )}
                <TextInput
                    name="title"
                    label="TITLE"
                    value={course.title}
                    onChange={onChange}
                    error={errors.title}
                />
                <SelectInput
                    name="authorId"
                    label="Author"
                    value={course.authorId || ""}
                    defaultOptions="Select Author"
                    options={authors.map(author => ({
                        value: author.id,
                        text: author.name
                    }))}
                    onChange={onChange}
                    error={errors.author}
                />

                <TextInput
                    name="category"
                    label="CATEGORY"
                    value={course.category}
                    onChange={onChange}
                    error={errors.category}
                />
                <button type="submit" disabled={saving} className="btn btn-primary" >
                    {saving ? "Saving..." : "Save"}
                </button>
            </form>
        </Fragment>
    )
}

CourseForm.propTypes = {
    authors: PropTypes.array.isRequired,
    course: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool
}

export default CourseForm
