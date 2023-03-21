import "./authentication.styles.scss"
import React, { useState } from "react"
import Login from "../../components/login-form/login-form.component"
import SignUp from "../../components/signup-form/signup-form.component"
import Button from "../../components/button/button.component"

const Authentication = () => {
	const [currentPage, setCurrentPage] = useState("login")
	const handleToggle = (e) => {
		setCurrentPage((currentPage) =>
			currentPage === "login" ? "signup" : "login"
		)
	}

	return (
		<div className="authentication-container">
			<h1>Join the family</h1>
			<div className="form-container">
				<Login hide={currentPage === "login" ? false : true} />
				<SignUp hide={currentPage === "signup" ? false : true} />
			</div>
			<div className="toggle-login-signup">
				<Button type="submit" buttonType="secondary" onClick={handleToggle}>
					{currentPage === "login" ? "Sign Up" : "Login"}
				</Button>
			</div>
		</div>
	)
}

export default Authentication
