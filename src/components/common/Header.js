import React, { useEffect } from 'react';
import { connect } from "react-redux"
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { loadCourses } from "../../redux/actions/courseActions"



const Header = ({ courses, loadCourses }) => {

    useEffect(() => {
        loadCourses().catch(error => {
            alert("Courses not loaded " + error.message)
        })
    }, [])

    const activeStyle = { color: "#F15B2A" }
    return (
        <nav>
            <NavLink to="/" activeStyle={activeStyle} exact>Home</NavLink>{" | "}
            <NavLink to="/courses" activeStyle={activeStyle}>Courses #{courses.length}</NavLink>{" | "}
            <NavLink to="/authors" activeStyle={activeStyle}>Authors</NavLink>{" | "}
            <NavLink to="/about" activeStyle={activeStyle} >About</NavLink>

        </nav>
    )
}

Header.propTypes = {
    // noOfcourses: PropTypes.number.isRequired,
    courses: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({

    courses: state.courses

})

export default connect(mapStateToProps, { loadCourses })(Header)