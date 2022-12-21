import "./authentication.styles.scss"
import React, { useState } from "react"
import Login from "../../components/login-form/login-form.component"
import SignUp from "../../components/signup-form/signup-form.component"

const Authentication = () => {
	const [currentPage, setCurrentPage] = useState("login")
	return (
		<div className="authentication-container">
			<h1>Join the family</h1>
			<div className="form-container">
				<Login />
				<SignUp />
			</div>
		</div>
	)
}

export default Authentication
