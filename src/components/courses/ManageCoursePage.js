import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { loadCourses, saveCourse } from "../../redux/actions/courseActions"
import { loadAuthors } from "../../redux/actions/authorActions"
import { newCourse } from ".././../../tools/mockData";
import CourseForm from "./CourseForm"
import Spinner from "../common/Spinner"
import { toast } from "react-toastify"

export function ManageCoursePage({ courses, authors, loadAuthors, loadCourses, saveCourse, history, ...props }) {
    const [course, setCourse] = useState({ ...props.course });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {

        if (courses.length == 0) {
            loadCourses().catch(error => {
                alert("Courses Not Loaded " + error.message)
            });
        }
        else {
            setCourse({ ...props.course })
        }
        if (authors.length == 0) {
            loadAuthors().catch(error => {
                alert("Authors Not Loaded " + error.message)
            });
        }
    }, [props.course]);

    function handleChange(event) {
        const { name, value } = event.target;
        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: name === "authorId" ? parseInt(value, 10) : value

        }))
        console.log('name :>> ', name);
        console.log('value :>> ', value);
    }

    function formIsValid(course) {
        const errors = {}

        if (!course.title) errors.title = "Title is required"
        if (!course.author) errors.author = "Author is required"
        if (!course.category) errors.category = "category is required"
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid(course)) {
            return;
        }
        setSaving(true);
        saveCourse(course).then(() => {
            toast.success("Course saved.")
            history.push("/courses");
        }).catch(error => {
            setSaving(false);
            setErrors({ onSave: error.message });
        })
    }

    return (
        <Fragment>
            {courses.length > 0 || authors.length > 0 || course.length > 0
                ? (<CourseForm errors={errors} course={course} authors={authors} onChange={handleChange}
                    onSave={handleSave} saving={saving} />)
                : <Spinner />}
        </Fragment>
    )

}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    saveCourse: PropTypes.func.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
}

function getCourseBySlug(courses, slug) {
    return courses.find(course => course.slug === slug) || null
}

function mapStateToProps(state, ownProps) {
    const slug = ownProps.match.params.slug;
    const course = slug && state.courses.length > 0 ? getCourseBySlug(state.courses, slug) : newCourse
    return {
        course,
        courses: state.courses,
        authors: state.authors
    }
}

const mapDispatchToProps = {
    loadCourses,
    loadAuthors,
    saveCourse,
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage)