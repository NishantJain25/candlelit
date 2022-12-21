import "./signup-form.styles.scss"
import React, { useState } from "react"
import {
	createAuthUserWithEmailAndPassword,
	createUserDocFromAuth,
} from "../../utils/firebase/firebase.utils"
import FormInput from "../../components/form-input/form-input.component"
import Button from "../../components/button/button.component"

const SignUp = () => {
	const defaultFormFields = {
		displayName: "",
		email: "",
		password: "",
		confirmPassword: "",
	}
	const defaultFormErrors = {
		displayNameError: "",
		emailError: "",
		passwordError: "",
		confirmPasswordError: "",
		authError: "",
	}
	const [formFields, setFormFields] = useState(defaultFormFields)
	const [formErrors, setFormErrors] = useState(defaultFormErrors)
	const { displayName, email, password, confirmPassword } = formFields

	const {
		displayNameError,
		emailError,
		passwordError,
		confirmPasswordError,
		authError,
	} = formErrors

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

		if (displayName.length === 0) {
			setFormErrors({ ...formErrors, displayNameError: "Required Field." })
			setTimeout(
				() => setFormErrors({ ...formErrors, displayNameError: "" }),
				3000
			)
			return
		}
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
		if (password.length < 8) {
			setFormErrors({
				...formErrors,
				passwordError: "Password should be atleast 8 characters long.",
			})
			setTimeout(
				() => setFormErrors({ ...formErrors, passwordError: "" }),
				3000
			)
			return
		}
		if (confirmPassword.length === 0) {
			setFormErrors({ ...formErrors, confirmPasswordError: "Required Field." })
			setTimeout(
				() => setFormErrors({ ...formErrors, confirmPasswordError: "" }),
				3000
			)
			return
		}
		if (confirmPassword !== password) {
			setFormErrors({
				...formErrors,
				confirmPasswordError:
					"Passwords do not match. Please check your password",
			})
			setTimeout(
				() => setFormErrors({ ...formErrors, confirmPasswordError: "" }),
				3000
			)
			return
		}
		try {
			const response = await createAuthUserWithEmailAndPassword(email, password)
			await createUserDocFromAuth(response.user, { displayName })
			resetForm()
			console.log(response)
		} catch (error) {
			if (error.code === "auth/email-already-in-use") {
				setFormErrors({
					...formErrors,
					authError: "Cannot create user. Email already in use.",
				})
			}
			console.log("User creation encountered an error ", error.message)
		}
	}
	return (
		<div className="signup-form-container">
			<h2>Sign Up</h2>
			<form onSubmit={onSubmit} noValidate>
				<FormInput
					label="Name"
					type="text"
					required
					onChange={handleChange}
					name="displayName"
					value={displayName}
					error={displayNameError}
				/>

				<FormInput
					label="Email"
					type="text"
					name="email"
					value={email}
					onChange={handleChange}
					error={emailError}
				/>

				<FormInput
					label="Password (min. 8 characters long)"
					type="password"
					name="password"
					value={password}
					onChange={handleChange}
					error={passwordError}
				/>
				<FormInput
					label="Confirm Password"
					type="password"
					name="confirmPassword"
					value={confirmPassword}
					onChange={handleChange}
					error={confirmPasswordError}
				/>
				{authError && <p className="error">{authError}</p>}
				<Button type="submit">Sign up</Button>
			</form>
		</div>
	)
}

export default SignUp
