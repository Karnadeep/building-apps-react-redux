import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'
import * as courseActions from '../../redux/actions/courseActions'
import * as authorActions from "../../redux/actions/authorActions"
import Pagination from "../Pagination/PaginationTraversy"
import CourseList from "./CourseList"
import Spinner from "../common/Spinner"
import { toast } from "react-toastify"


class CoursesPage extends React.Component {
    state = {
        currentPage: 1,
        coursesPerPage: 3,
        setRedirecttoPage: false
    }

    componentDidMount() {
        const { courses, authors, actions } = this.props;
        if (courses.length == 0) {
            actions.loadCourses().catch(err => {
                alert("Error Occured" + err.message);
            });
        }
        if (authors.length == 0) {
            actions.loadAuthors().catch(err =>
                alert("Authors Not Loaded" + err.message));


        }


    }

    // state = {
    //     course: {
    //         title: ""
    //     }
    // }


    // handleChange = (event) => {
    //     const course = { ...this.state.course, title: event.target.value }
    //     this.setState({ course })
    // }

    // handleSubmit = (event) => {

    //     event.preventDefault();
    //     // this.props.dispatch(courseActions.createCourse(this.state.course));
    //     //this.props.createCourse(this.state.course)
    //     this.props.actions.createCourse(this.state.course);
    //     // alert(this.state.course.title)
    // }
    handleDelete = async course => {
        toast.success("Course Deleted.")
        try {
            this.props.actions.deleteCourse(course)
        }

        catch (error) {
            toast.error("Course Not Deleted " + error.message, { autoClose: false })
        }
    };

    paginate = async (currentPageNumber) => {
        this.setState({
            currentPage: currentPageNumber
        })
    }

    render() {
        //get current courses : brad traversy
        const { currentPage, coursesPerPage } = this.state
        const { courses } = this.props
        const indexOfLastCOURSE = currentPage * coursesPerPage
        const indexOdFirstCourse = indexOfLastCOURSE - coursesPerPage
        const currentCourses = courses.slice(indexOdFirstCourse, indexOfLastCOURSE)
        return (
            <>
                {this.props.loading ? <Spinner /> : (
                    <Fragment>
                        {this.state.setRedirecttoPage && <Redirect to="/course" />}
                        {/* <form onSubmit={this.handleSubmit}> */}
                        <h2>Courses</h2>
                        {/* <h3>Add course</h3>
               <input type="text" value={this.state.course.title} onChange={this.handleChange} />
                <input type="submit" value="Save" /> */}
                        {/* {this.props.courses.map(course => (
                    <div key={course.title}>{course.title}</div>
                ))} */}
                        {/* </form> */}
                        <button
                            style={{ marginBottom: 20 }}
                            className="btn btn-primary add-course"
                            type="submit"
                            onClick={() => this.setState({ setRedirecttoPage: true })}>
                            Add Course
                </button>

                        <div>
                            <CourseList onClickDelete={this.handleDelete} courses={currentCourses} />
                            {/* < Pagination coursesPerPage={this.state.coursesPerPage} totalCourses={this.props.courses.length}
                                paginate={this.paginate} /> */}
                        </div>

                    </Fragment>
                )}


            </>
        )
    }
}

CoursesPage.propTypes = {
    actions: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
    return {
        authors: state.authors,
        courses: state.authors.length == 0 ? [] : state.courses.map(course => {
            return {
                ...course,
                authorName: state.authors.find(a => a.id === course.authorId).name
            }
        }),
        loading: state.apiCallsInProgress > 0
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
            deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage)