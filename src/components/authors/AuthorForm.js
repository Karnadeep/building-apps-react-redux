import React from 'react'
import PropTypes from 'prop-types'
import TextInput from "../common/TextInput"

const AuthorForm = ({ author, onChangeName, onSave }) => {
    return (
        <div>
            <form onSubmit={onSave}>
                <TextInput
                    name="name"
                    label="Name"
                    value={author.name}
                    onChange={(event) => onChangeName(event)}
                    placeholder="Enter the name"
                />
                <button className="btn-btn-light" >Save</button>
            </form>

        </div>
    )
}

AuthorForm.propTypes = {
    author: PropTypes.object,
    onChangeName: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
}

export default AuthorForm
