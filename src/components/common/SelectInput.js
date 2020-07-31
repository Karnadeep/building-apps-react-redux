import React from 'react'
import PropTypes from 'prop-types'

const SelectInput = ({ name, label, value, defaultOptions, options, onChange, error }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <div className="field">
                {/* Note, value is set here rather than on the option - docs: https://facebook.github.io/react/docs/forms.html */}
                <select
                    name={name}
                    className="form-control"
                    value={value}
                    onChange={onChange}
                >
                    <option value="">{defaultOptions}</option>
                    {options.map(option => {
                        return (
                            <option key={option.value} value={option.value}>
                                {option.text}
                            </option>
                        )
                    })}
                </select>
                {error && (<div className="alert alert-danger">{error}</div>)}
            </div>
        </div>
    )
}

SelectInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    defaultOptions: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    error: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object)

}

export default SelectInput
