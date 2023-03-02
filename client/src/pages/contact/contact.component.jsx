import React, { useState, useRef } from "react"
import emailjs from "@emailjs/browser"

import FormInput from "../../components/form-input/form-input.component"
import Button from "../../components/button/button.component"
import Alert from "../../components/alert/alert.component"
import "./contact.styles.scss"

const Contact = () => {
	const [show, setShow] = useState(false)
	const defaultFormFields = {
		username: "",
		userEmail: "",
		message: "",
	}
	const defaultFormErrors = {
		nameError: "",
		emailError: "",
		messageError: "",
	}
	const [formFields, setFormFields] = useState(defaultFormFields)
	const [formErrors, setFormErrors] = useState(defaultFormErrors)

	const { username, userEmail, message } = formFields
	const { nameError, emailError, messageError } = formErrors
	const handleChange = (event) => {
		const { name } = event.target
		setFormFields({ ...formFields, [name]: event.target.value })
	}

	const form = useRef()
	const sendEmail = (e) => {
		e.preventDefault()

		emailjs
			.sendForm(
				"contact_service",
				"contact_form",
				form.current,
				"AsB4d4Nw8Z7oF0ZRx"
			)
			.then((response) => {
				console.log(response.text)
				setShow(true)
				setTimeout(() => {
					setShow(false)
				}, 3000)
			})
	}
	return (
		<div className="contact-container">
			<section className="title-container">
				<h1>We'd love to hear from you!</h1>
			</section>
			<section className="contact-form">
				<h2>Write to us</h2>
				<form ref={form} onSubmit={sendEmail}>
					<FormInput
						label="Your Name"
						type="text"
						name="username"
						value={username}
						onChange={handleChange}
						error={nameError}
					/>
					<FormInput
						label="Your Email"
						type="text"
						name="userEmail"
						value={userEmail}
						onChange={handleChange}
						error={emailError}
					/>
					<FormInput
						label="Type your message"
						type="textarea"
						name="message"
						value={message}
						onChange={handleChange}
						error={messageError}
					/>
					<Button type="submit" buttonType="primary">
						Send
					</Button>
				</form>
			</section>
		</div>
	)
}

export default Contact
