import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { loadCourses, saveCourse } from "../../redux/actions/courseActions"
import { loadAuthors } from "../../redux/actions/authorActions"
import { newCourse, courses } from ".././../../tools/mockData";
import CourseForm from "./CourseForm"
import Spinner from "../common/Spinner"
import CourseNotFound from "../error404/CourseNotFound"
import { toast } from "react-toastify"
import useUnsavedChanges from "../common/useUnsavedChanges"
export function ManageCoursePage({ courses, authors, loadAuthors, loadCourses, saveCourse, history, course }) {

    //  console.log('course :>> ', course);
    const [courseForForm, setCourse] =
        useState(course);
    // console.log('use State course :>> ', courseForForm);
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const [routerPrompt, setDirty, setPristine] = useUnsavedChanges()


    useEffect(() => {

        if (courses.length == 0) {
            loadCourses().catch(error => {
                alert("Courses Not Loaded " + error.message)
            });
        }
        else {
            setCourse(course)


            //       console.log('use Effect course :>> ', course);
        }
        if (authors.length == 0) {
            loadAuthors().catch(error => {
                alert("Authors Not Loaded " + error.message)
            });
        }
    }, [course]);

    function handleChange(event) {
        const { name, value } = event.target;
        console.log('name :>> ', name);
        console.log('value :>> ', value);
        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: name === "authorId" ? parseInt(value, 10) : value
        }))
        setDirty()
        // console.log('name :>> ', name);
        // console.log('value :>> ', value);
    }
    function containSpecialChar(input) {
        const iChars = "!`@#$%^&*()+=[]\\';/{}|\"<>?~_"
        for (let i = 0; i < input.length; i++) {
            if (iChars.indexOf(input.charAt(i)) !== -1) {
                return true
            }
        }
        return false
    }
    function formIsValid(course) {
        const errors = {}

        if (!course.title) errors.title = "Title is required"
        if (containSpecialChar(course.title)) errors.title = "Special characters are not allowed in title except , . - :"
        if (!course.authorId) errors.author = "Author is required"
        if (!course.category) errors.category = "category is required"
        if (containSpecialChar(course.category)) errors.category = "Special characters are not allowed in category except , . - :"

        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    function handleSave(event) {
        event.preventDefault();

        if (!formIsValid(courseForForm)) {
            return;
        }
        setPristine();
        setSaving(true);

        saveCourse(courseForForm).then(() => {
            toast.success("Course saved.")
            history.push("/courses");
        }).catch(error => {
            setSaving(false);
            setErrors({ onSave: error.message });
        })
    }

    return (

        courses.length > 0 || authors.length > 0 || course.length > 0
            ? (
                course.id === -1 ?
                    (<Fragment>
                        <CourseNotFound />
                        {/* {course = newCourse} */}
                    </Fragment>)
                    : (<Fragment>

                        <CourseForm errors={errors} course={courseForForm} authors={authors} onChange={handleChange}
                            onSave={handleSave} saving={saving} />

                        {routerPrompt}
                    </Fragment>))
            : <Spinner />

    )

}

ManageCoursePage.propTypes = {
    course: PropTypes.object,
    saveCourse: PropTypes.func.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
}
// function returnNull() {
//     return null
// }
function getCourseBySlug(courses, slug) {
    let course
    const courseWithSlug = courses.find(course => course.slug === slug)
    if (courseWithSlug == null) {
        //       course = newCourse
        course = {
            id: -1,
            title: "",
            authorId: null,
            category: ""
        }
    } else {
        course = courseWithSlug
    }
    return course
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