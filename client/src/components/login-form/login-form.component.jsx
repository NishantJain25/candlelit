import "./login-form.styles.scss"
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import FormInput from "../../components/form-input/form-input.component"
import Button from "../../components/button/button.component"
import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils"
const Login = () => {
	const navigate = useNavigate()
	const defaultFormFields = {
		email: "",
		password: "",
	}
	const defaultFormErrors = {
		emailError: "",
		passwordError: "",
		authError: "",
	}
	const [formFields, setFormFields] = useState(defaultFormFields)
	const [formErrors, setFormErrors] = useState(defaultFormErrors)

	const { email, password } = formFields
	const { emailError, passwordError, authError } = formErrors
	const handleChange = (event) => {
		const { name } = event.target
		setFormFields({ ...formFields, [name]: event.target.value })
	}

	const resetForm = () => {
		setFormFields(defaultFormFields)
		setFormErrors(defaultFormErrors)
	}

	const onSubmit = async (event) => {
		event.preventDefault()

		if (email.length === 0) {
			setFormErrors({ ...formErrors, emailError: "Required Field." })
			setTimeout(() => setFormErrors({ ...formErrors, emailError: "" }), 2000)
			return
		}
		if (password.length === 0) {
			setFormErrors({ ...formErrors, passwordError: "Required Field." })
			setTimeout(
				() => setFormErrors({ ...formErrors, passwordError: "" }),
				3000
			)
			return
		}

		try {
			const { user } = await signInAuthUserWithEmailAndPassword(email, password)

			resetForm()
			navigate(-1)
		} catch (error) {
			console.log(error.code)
		}
	}
	return (
		<div className="login-form-container">
			<h2>Login</h2>
			<form onSubmit={onSubmit}>
				<FormInput
					label="Email"
					type="text"
					name="email"
					value={email}
					onChange={handleChange}
					error={emailError}
				/>

				<FormInput
					label="Password"
					type="password"
					name="password"
					value={password}
					onChange={handleChange}
					error={passwordError}
				/>
				<Button type="submit" buttonType="primary">
					Login
				</Button>
			</form>
		</div>
	)
}

export default Login
