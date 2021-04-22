import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'
import * as courseActions from '../../redux/actions/courseActions'
import * as authorActions from "../../redux/actions/authorActions"
import PaginationTraversy from "../Pagination/PaginationTraversy"
import PaginationTC from "../Pagination/PaginationToofaniCoder"
import CourseList from "./CourseList"
import Spinner from "../common/Spinner"
import { toast } from "react-toastify"
import { authors } from '../../../tools/mockData'

class CoursesPage extends React.Component {

    state = {
        currentPage: 1,
        coursesPerPage: 3,
        setRedirecttoPage: false,
        courseList: this.props.courses,
        courseFields: "",
        authorName: "",
        category: "",
        pageStart: 0,
        pageEnd: 3
    }

    componentDidMount() {
        const { courses, authors, actions, history } = this.props;
        if (authors.length == 0) {
            actions.loadAuthors().catch(err =>
                alert("Authors Not Loaded" + err.message));
        }
        if (courses.length == 0) {
            actions.loadCourses().then(() => {
                this.setState({
                    courseList: this.props.courses
                })
            })
                .catch(err => {
                    alert("Error Occured" + err.message);
                });

        } else {
            this.setState({
                ...this.state,
                courseList: this.props.courses,
            })
        }
        if (history.length == 0) {
            actions.loadCoursesHistory()
                .catch(error => alert("CoursesHistory not loaded " + error.message))
        }

    }

    compareByTitle = (a, b) => {

        const variantA = a.title.toUpperCase()
        const variantB = b.title.toUpperCase()

        let comparison = 0
        if (variantA > variantB) {
            comparison = 1
        } else if (variantA < variantB) {
            comparison = -1
        }
        return comparison

    }

    compareByAuthName = (a, b) => {

        const variantA = a.authorName.toUpperCase().trim()
        const variantB = b.authorName.toUpperCase().trim()

        let comparison = 0
        if (variantA > variantB) {
            comparison = 1
        } else if (variantA < variantB) {
            comparison = -1
        }
        return comparison

    }

    compareByCategory = (a, b) => {

        const variantA = a.category.toUpperCase()
        const variantB = b.category.toUpperCase()

        let comparison = 0
        if (variantA > variantB) {
            comparison = 1
        } else if (variantA < variantB) {
            comparison = -1
        }
        return comparison

    }
    handleSortChange = (event) => {
        let { courses } = this.props
        if (event.target.value === "title") {

            courses.sort(this.compareByTitle)

            this.setState({
                ...this.state,
                courseFields: "title",
                courseList: courses
            })


        }
        if (event.target.value === "authorName") {
            courses.sort(this.compareByAuthName)
            this.setState({
                ...this.state,
                courseFields: "authorName",
                courseList: courses
            })


        }
        if (event.target.value === "category") {
            courses.sort(this.compareByCategory)
            this.setState({
                ...this.state,
                courseFields: "category",
                courseList: courses
            })

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
            await this.props.actions.deleteCourse(course)
            this.setState({
                ...this.state,
                courseList: this.props.courses
            })
        }

        catch (error) {
            toast.error("Course Not Deleted " + error.message, { autoClose: false })
        }
    };

    //traversy paginate method
    paginate = (currentPageNumber) => {

        this.setState({
            currentPage: currentPageNumber
        })
    }

    //Toofanicoder pagination method
    onPaginationChange = (startValue, endValue) => {
        // console.log('startvalue,endValue  :>> ', startValue, endValue);
        this.setState({
            ...this.state,
            pageStart: startValue,
            pageEnd: endValue
        })
        // setPagination({
        //   start: startValue,
        //   end: endValue
        // })
    }

    handleAuthorChange = (event) => {
        let { courses } = this.props
        this.setState({
            ...this.state,
            authorName: event.target.value,
            courseList: courses.filter(course => course.authorName === event.target.value)
        })
    }

    handleCategoryChange = event => {
        const { courses } = this.props
        this.setState({
            ...this.state,
            category: event.target.value,
            courseList: courses.filter(course => course.category === event.target.value)
        })
    }
    handleUndoChange = async (courseHistory) => {
        const { history, actions } = this.props
        const historyAuthor = authors.find(author => author.id === courseHistory.course.authorId)
        if (window.confirm(`Click OK to revert the course details back to
        title : ${courseHistory.course.title}
        author : ${historyAuthor.name}
        category : ${courseHistory.course.category}
        `)) {
            try {
                await actions.saveCourse(courseHistory.course)
                toast.success("Course Changes reverted")
                await actions.deleteCourseHistory(courseHistory.id);
                toast.success("Course History deleted")
            } catch (error) {
                alert("Error" + error.message)
            }
            //console.log('history :>> ', history);
        }
    }
    render() {
        const { courses, authors } = this.props
        let categories = [...new Set(courses.map(course => course.category))] // Get unique categories from courses array
        //get current courses : brad traversy
        const { currentPage, coursesPerPage } = this.state
        const indexOfLastCOURSE = currentPage * coursesPerPage
        const indexOdFirstCourse = indexOfLastCOURSE - coursesPerPage
        const currentCourses = this.state.courseList.slice(indexOdFirstCourse, indexOfLastCOURSE)
        const slicedCourses = this.state.courseList.slice(this.state.pageStart, this.state.pageEnd)
        return (
            <>
                {this.props.loading ? <Spinner /> : (
                    <Fragment>
                        {this.state.setRedirecttoPage && <Redirect to="/course/" />}
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

                            <CourseList onClickDelete={this.handleDelete} currentCourses={slicedCourses} authors={authors}
                                history={this.props.history} onClickUndo={this.handleUndoChange} courseFields={this.state.courseFields} sortCourses={this.handleSortChange}
                                categories={categories} authorName={this.state.authorName} onChangeAuthor={this.handleAuthorChange}
                                category={this.state.category} onChangeCategory={this.handleCategoryChange}
                            />
                            <PaginationTC showPerPage={this.state.coursesPerPage} totalCourses={this.state.courseList.length}
                                counter={this.state.currentPage} onPaginationChange={this.onPaginationChange} />
                            {/* < PaginationTraversy coursesPerPage={this.state.coursesPerPage} totalCourses={this.state.courseList.length}
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
    history: PropTypes.array.isRequired,
}


function mapStateToProps(state) {
    let courses = state.courses
    const authors = state.authors
    // console.log('authors :>> ', authors);
    // console.log('courses :>> ', courses);
    if (authors.length > 0 && courses.length > 0) {
        courses = state.courses.map(course => {
            return {
                ...course,
                authorName: authors.find(a => a.id === course.authorId).name
            }
        })
    }


    return {
        authors,
        // courses: state.authors.length == 0 ? [] : state.courses.map(course => {
        //     return {
        //         ...course,
        //         authorName: state.authors.find(a => a.id === course.authorId).name
        //     }
        // }),
        courses,
        history: state.history,
        loading: state.apiCallsInProgress > 0
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
            deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
            loadCoursesHistory: bindActionCreators(courseActions.loadCoursesHistory, dispatch),
            saveCourse: bindActionCreators(courseActions.saveCourse, dispatch),
            deleteCourseHistory: bindActionCreators(courseActions.deleteCourseHistory, dispatch)
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage)