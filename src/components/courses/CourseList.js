import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const CourseList = ({ courses, onClickDelete }) => {
    console.log('courses :>> ', courses);
    console.log('courses.length :>> ', courses.length);
    return (
        <Fragment>
            {courses.length == 0 ? (<h1>Course List is epmty</h1>)
                : (<table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Category</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map(course => (
                            <tr key={course.id}>
                                <td>
                                    <a className="btn btn-light"
                                        href={"http://pluralsight.com/courses/" + course.slug}
                                    >
                                        Watch
                            </a>
                                </td>
                                <td>
                                    <Link to={"/course/" + course.slug}>
                                        {course.title}
                                    </Link>
                                </td>
                                <td>
                                    {course.authorName}
                                </td>
                                <td>{course.category}</td>
                                <td>
                                    <button onClick={() => onClickDelete(course)} className="btn btn-outline-danger">
                                        Delete
                            </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                )

            }
        </Fragment>
    )
}
CourseList.propTypes = {
    courses: PropTypes.array.isRequired,
    onClickDelete: PropTypes.func.isRequired,
}

export default CourseList
