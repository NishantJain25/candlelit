import React from "react"
import Button from "../../components/button/button.component"
import { useNavigate } from "react-router-dom"
import "./error-page.styles.scss"

const ErrorPage = () => {
	const navigate = useNavigate()

	const handleClick = () => {
		navigate(-1)
	}
	return (
		<div className="error-page">
			<h1 className="heading">Something Went Wrong</h1>
			<Button buttonType="primary" onClick={handleClick}>
				Go Back
			</Button>
		</div>
	)
}

export default ErrorPage
