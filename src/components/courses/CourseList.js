import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const CourseList = ({ currentCourses, onClickDelete, authors, courseFields, sortCourses,
    categories, authorName, onChangeAuthor, category, onChangeCategory }) => {
    return (
        <Fragment>
            <div className="form-group">
                <div className="field">
                    <select value={courseFields} name="courseFields" className="form-control width:350px mb" onChange={sortCourses}>
                        <option value="">Sort Courses By</option>
                        <option value="title">Title</option>
                        <option value="authorName">Author</option>
                        <option value="category">Category</option>
                    </select>
                    <div className="row mx-md-n5">
                        {/* <p>Hi</p> */}
                        <div className="col px-md-5">
                            {/* <p>Hi</p> */}
                            <div className="p-3 border bg-light">
                                <p>Filter By Author</p>
                                <select className="form-control" name="authorName" value={authorName} onChange={onChangeAuthor}>
                                    <option value="">Select</option>
                                    {authors.map(author => (
                                        <option key={author.id} value={author.name}>{author.name}</option>
                                    ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col px-md-5">
                            <div className="p-3 border bg-light">
                                <p>Filter By Category</p>
                                <select className="form-control" name="category" value={category} onChange={onChangeCategory} >
                                    <option value="">Select</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {currentCourses.length == 0 ? (<h1>Course List is epmty</h1>)
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
                        {currentCourses.map(course => (
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
    onClickDelete: PropTypes.func.isRequired,
    currentCourses: PropTypes.array.isRequired,
    courseFields: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired,
    sortCourses: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    onChangeAuthor: PropTypes.func.isRequired,
    authorName: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    onChangeCategory: PropTypes.func.isRequired,

}

export default CourseList
