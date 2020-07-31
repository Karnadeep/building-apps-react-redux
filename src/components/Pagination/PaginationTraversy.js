import React from 'react'
import PropTypes from 'prop-types'

const PaginationTraversy = ({ coursesPerPage, totalCourses, paginate }) => {
    const pageNumber = []
    for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
        pageNumber.push(i)
    }
    return (
        <nav>
            <ul className="pagination">
                {pageNumber.map(number => (
                    <li key={number} className="page-item">
                        <a className="page-link" onClick={() => paginate(number)}>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

PaginationTraversy.propType = {
    coursesPerPage: PropTypes.number.isRequired,
    totalCourses: PropTypes.number.isRequired,
    paginate: PropTypes.func.isRequired,
}
export default PaginationTraversy
