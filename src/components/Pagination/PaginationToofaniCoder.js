import React, { useState } from 'react'

const PaginationToofaniCoder = ({ coursesPerPage, totalCourses, counter, paginate }) => {
    const [numberOfPages, setNumberOfPages] = useState(Math.ceil(totalCourses / coursesPerPage))
    console.log('numberOfPages :>> ', numberOfPages);

    const onButtonClick = (type) => {
        if (type === "prev") {
            if (counter === 1) {
                paginate(1)
            }
            else {
                paginate(counter - 1)
            }
        }
        else if (type === "next") {
            if (counter == numberOfPages) {
                paginate(counter)
            }
            else {
                paginate(counter + 1)
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
                    {new Array(numberOfPages).fill("").map((ele, index) => (
                        <li key={index} className={`page-item ${index + 1 === counter ? "active" : null}`}><a className="page-link"
                            onClick={() => paginate(index + 1)}>
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

export default PaginationToofaniCoder

