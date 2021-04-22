import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { loadAuthors, saveAuthor } from "../../redux/actions/authorActions"
import { newAuthor } from "../../../tools/mockData"
import AuthorForm from "./AuthorForm"
import Spinner from "../common/Spinner"
import PageNotFound from "../error404/PageNotFound"
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify'

const ManageAuthorPage = ({ authors, actions, author, history, loading }) => {

    const [authorForm, setAuthorForm] = useState(author)

    useEffect(() => {
        if (authors.length == 0) {
            actions.loadAuthors()
                .catch(error => alert("Authors Not loaded " + error.message))
        } else {
            setAuthorForm(author)
        }

        // if (courses.length == 0) {
        //     console.log('courses :>> ', courses);
        //     actions.loadCourses()
        //         .catch(error => {
        //             alert("Courses Not loaded " + error.message)
        //         })
        // }
    }, [author])


    const handleChange = event => {
        const { name, value } = event.target
        setAuthorForm(prevAuthor => ({
            ...prevAuthor,
            [name]:
                value
        }))

    }

    async function handleSave(event) {
        event.preventDefault()
        try {
            await actions.saveAuthor(authorForm)
            history.push("/authors")
            toast.success("Authors Saved Successfully")
        } catch (error) {
            toast.error("Authors Not saved" + error.message, { autoClose: false })
        }
    }
    return (
        loading ? <Spinner /> :
            (
                authorForm.id === -1 ? (<PageNotFound />) :
                    (
                        <div>
                            <h2>Author Form</h2>
                            <AuthorForm author={authorForm} onChangeName={handleChange} onSave={handleSave} />
                        </div>
                    )
            )


    )
}

ManageAuthorPage.propTypes = {
    authors: PropTypes.array.isRequired,
    // courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    author: PropTypes.object,
    loading: PropTypes.bool.isRequired,
}
function getAuthorById(authors, authorId) {
    const author = authors.find(author => author.id == authorId)
    console.log('author :>> ', author);
    if (author == null) {
        const newAuthor = {
            id: -1,
            name: ""
        }
        return newAuthor
    } else {
        return author
    }
}
function mapDispatchToProps(dispatch
) {
    return {
        actions:
        {
            loadAuthors: bindActionCreators(loadAuthors, dispatch),
            saveAuthor: bindActionCreators(saveAuthor, dispatch),
            // loadCourses: bindActionCreators(loadCourses, dispatch)
        }
    }
}

const mapStateToProps = (state, ownprops) => {
    const authorId = ownprops.match.params.authorId

    return {
        authors: state.authors,
        author: (authorId) && (state.authors.length > 0) ? getAuthorById(state.authors, authorId) : newAuthor,
        // courses: state.courses,
        loading: state.apiCallsInProgress > 0
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage)
