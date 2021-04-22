import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Link } from "react-router-dom"

const AuthorList = ({ authors, onClickDelete }) => {
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Number of Courses</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {authors.map(author => (
                        <tr key={author.id}>
                            <td><Link to={`/author/${author.id}`}>{author.name}</Link></td>
                            <td>{author.numOfCourses}</td>
                            <td>
                                <button
                                    onClick={() => onClickDelete(author)}
                                    className="btn btn-outline-danger"
                                >Delete Author</button>
                            </td>
                        </tr>
                    )
                    )
                    }
                </tbody>
            </table>
        </div>
    )
}

AuthorList.propTypes = {
    authors: PropTypes.array.isRequired,
    onClickDelete: PropTypes.func.isRequired,
}

export default AuthorList
