import React, { useState } from "react"
import FormInput from "../../components/form-input/form-input.component"
import "./address-form.styles.scss"

const AddressForm = () => {
	const defaultFormFields = {
		address: "",
		house: "",
		postalCode: "",
		city: "",
		state: "",
		phoneNumber: "",
	}
	const defaultFormFieldErrors = {
		addressError: "",
		houseError: "",
		postalCodeError: "",
		cityError: "",
		stateError: "",
		phoneNumberError: "",
	}
	const [formFields, setFormFields] = useState(defaultFormFields)
	const [formFieldErrors, setFormFieldErrors] = useState(defaultFormFieldErrors)
	const { address, house, postalCode, city, state, phoneNumber } = formFields
	const {
		addressError,
		houseError,
		postalCodeError,
		cityError,
		stateError,
		phoneNumbeError,
	} = formFieldErrors

	const handleChange = (e) => {
		e.preventDefault()
		setFormFields({ ...formFields, [e.target.name]: e.target.value })
	}

	return (
		<div className="address-form">
			<FormInput
				label="Address"
				name="address"
				value={address}
				onChange={handleChange}
			/>
			<FormInput
				label="House number"
				name="house"
				value={house}
				onChange={handleChange}
			/>
			<FormInput
				label="Postal Code"
				name="postalCode"
				value={postalCode}
				onChange={handleChange}
			/>
			<FormInput
				label="City"
				name="city"
				value={city}
				onChange={handleChange}
			/>
			<div className="state-dropdown">
				<select name="state" onChange={handleChange}>
					<option value="none" defaultValue hidden></option>
					<option value="maharashtra">Maharashtra</option>
					<option value="gujarat">Gujarat</option>
					<option value="delhi">Delhi</option>
					<option value="chennai">Chennai</option>
				</select>
				<label
					className={`${state.length > 0 ? "shrink" : ""} form-input-label`}
				>
					Select State
				</label>
			</div>
			<FormInput
				label="Phone Number"
				name="phoneNumber"
				value={phoneNumber}
				onChange={handleChange}
			/>
		</div>
	)
}

export default AddressForm
