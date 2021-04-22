import React, { useEffect, useState } from 'react'
import { Redirect } from "react-router-dom"
import PropTypes from 'prop-types'
import { loadAuthors, deleteAuthors } from "../../redux/actions/authorActions"
import { loadCourses } from "../../redux/actions/courseActions"
import AuthorList from "./AuthorList"
import Spinner from "../common/Spinner"
import { connect } from "react-redux"
import { toast } from 'react-toastify'


const AuthorsPage = ({ loadAuthors, authors, loading, deleteAuthors, loadCourses, courses }) => {
    const [isBtnClick, setIsBtnClick] = useState(false)
    const [authorList, setAuthorList] = useState(authors)
    useEffect(() => {
        if (authors.length === 0) {
            try {
                loadAuthors()
            } catch (error) {
                alert("Authors not loaded " + error.message)
            }
        } else {
            setAuthorList(authors)
        }
        if (courses.length === 0) {
            try {
                loadCourses()
            } catch (error) {
                alert("Courses not loaded " + error.message)
            }
        }
        if (authors.length > 0 && courses.length > 0) {
            let sampleAuthors = []
            sampleAuthors = authors.map(author => {
                let counter = 0
                courses.map(course => {
                    if (course.authorId == author.id) {
                        counter = counter + 1;
                    }
                })
                return {
                    ...author,
                    numOfCourses: counter
                }
            })
            setAuthorList(sampleAuthors)
            console.log('sampleAuthors :>> ', sampleAuthors);
        }
    }
        , [authors])

    const handleDeleteAuthor = async (author) => {
        if (author.numOfCourses > 0) {
            alert("Cannot delete an author because it has courses")
        } else {
            try {
                toast.success("Author deleted")
                await deleteAuthors(author.id)

            } catch (error) {
                toast.error("Author Not deleted" + error.message, { autoClose: false })
            }
        }

    }

    return (
        <>
            {isBtnClick && <Redirect to="/author" />}
            {loading || authors.length === 0 ? (<Spinner />)
                : (<div>
                    <h2>Authors</h2>
                    <button
                        onClick={() => setIsBtnClick(!isBtnClick)}
                        className="btn btn-primary mb-3">Add Author</button>
                    <AuthorList authors={authorList}
                        onClickDelete={handleDeleteAuthor}
                    />
                </div>)
            }
        </>
    )
}

AuthorsPage.propTypes = {
    loadAuthors: PropTypes.func.isRequired,
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    deleteAuthors: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    loadCourses: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
    loadAuthors,
    deleteAuthors,
    loadCourses,
}



const mapStateToProps = (state) => {
    return {
        authors: state.authors,
        courses: state.courses,
        loading: state.apiCallsInProgress.length > 0
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage)