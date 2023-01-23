import React, { useState } from "react"
import FormInput from "../../components/form-input/form-input.component"
import Button from "../../components/button/button.component"
import "./contact.styles.scss"

const Contact = () => {
	const defaultFormFields = {
		name: "",
		message: "",
	}
	const defaultFormErrors = {
		nameError: "",
		messageError: "",
	}
	const [formFields, setFormFields] = useState(defaultFormFields)
	const [formErrors, setFormErrors] = useState(defaultFormErrors)

	const { name, message } = formFields
	const { nameError, messageError } = formErrors
	const handleChange = (event) => {
		const { name } = event.target
		setFormFields({ ...formFields, [name]: event.target.value })
	}
	return (
		<div className="contact-container">
			<section className="title-container">
				<h1>We'd love to hear from you!</h1>
			</section>
			<section className="contact-form">
				<h2>Write to us</h2>
				<form>
					<FormInput
						label="Your Name"
						type="text"
						name="message"
						value={name}
						onChange={handleChange}
						error={nameError}
					/>
					<FormInput
						label="Type your message"
						type="text"
						name="message"
						value={message}
						onChange={handleChange}
						error={messageError}
					/>
					<Button buttonType="primary">Send</Button>
				</form>
			</section>
		</div>
	)
}

export default Contact
