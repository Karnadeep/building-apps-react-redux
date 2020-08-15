import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'


const PaginationToofaniCoder = ({ showPerPage, totalCourses, onPaginationChange }) => {
    //  console.log('numberOfPages :>> ', numberOfPages);

    const [counter, setCounter] = useState(1)
    const [numberOfButtons, setNumberOfButtons] = useState(Math.ceil(totalCourses / showPerPage))
    useEffect(() => {
        const value = showPerPage * counter
        const startValue = value - showPerPage
        const endValue = value
        onPaginationChange(startValue, endValue)
        setNumberOfButtons(Math.ceil(totalCourses / showPerPage))
    }, [counter, totalCourses])

    const onButtonClick = (type) => {
        if (type === "prev") {
            if (counter === 1) {
                setCounter(1)
            }
            else {
                setCounter(counter - 1)
            }
        }
        else if (type === "next") {
            if (counter == numberOfButtons) {
                setCounter(counter)
            }
            else {
                setCounter(counter + 1)
            }
        }
    }
    return (
        <div className="d-flex justify-content-center">
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><a className="page-link"
                        onClick={() => onButtonClick("prev")}
                    >Previous</a></li>
                    {new Array(numberOfButtons).fill("").map((ele, index) => (
                        <li key={index} className={`page-item ${index + 1 === counter ? "active" : null}`}><a className="page-link"
                            onClick={() => setCounter(index + 1)}>
                            {index + 1}</a>
                        </li>
                    ))}

                    <li className="page-item"><a className="page-link"
                        onClick={() => onButtonClick("next")}
                    >Next</a></li>
                </ul>
            </nav >
        </div>

    )
}

PaginationToofaniCoder.propTypes = {
    showPerPage: PropTypes.number.isRequired,
    totalCourses: PropTypes.number.isRequired,
    onPaginationChange: PropTypes.func.isRequired,

}

export default PaginationToofaniCoder

