import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { VscEdit } from "react-icons/vsc"
import Button from "../../components/button/button.component"
import FormInput from "../../components/form-input/form-input.component"

import { updateUser, getUser } from "../../utils/firebase/firebase.utils"
import "./profile.styles.scss"
const Profile = ({ user, setShouldUpdate, setShow }) => {
	const [currentUser, setCurrentUser] = useState(user)
	const navigate = useNavigate()
	const defaultFormErrors = {
		nameError: "",
		emailError: "",
		addressError: "",
	}
	const [editMode, setEditMode] = useState(false)

	const [formFields, setFormFields] = useState({
		displayName: currentUser.displayName,

		address: "B/1507, RNA Royale Park",
	})
	const [formErrors, setFormErrors] = useState(defaultFormErrors)

	const { displayName, address } = formFields
	const { nameError, addressError } = formErrors

	const handleChange = (e) => {
		setFormFields({ ...formFields, [e.target.name]: e.target.value })
	}

	const onSubmit = async (event) => {
		event.preventDefault()

		if (displayName.length === 0) {
			setFormErrors({ ...formErrors, nameError: "Required Field." })
			setTimeout(() => setFormErrors({ ...formErrors, nameError: "" }), 3000)
			return
		}
		if (address.length === 0) {
			setFormErrors({ ...formErrors, addressError: "Required Field." })
			setTimeout(() => setFormErrors({ ...formErrors, addressError: "" }), 3000)
			return
		}

		const userData = { displayName, address }
		try {
			await updateUser(currentUser.userID, userData)
			setEditMode(false)
			setShouldUpdate(true)
			setShow(true)
			setTimeout(() => setShow(false), 3000)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="profile">
			<header>
				<p>Your Details</p>
			</header>

			<div className="detail-container">
				<button
					id="edit-button"
					onClick={() => setEditMode((currentState) => !currentState)}
				>
					Edit <VscEdit />
				</button>
				<div className="detail-field">
					<p className="label">Name</p>
					<p className="value" style={{ display: `${editMode ? "none" : ""}` }}>
						{currentUser.displayName}
					</p>
					<FormInput
						name="displayName"
						value={displayName}
						onChange={handleChange}
						style={{ display: `${editMode ? "" : "none"}` }}
						error={nameError}
					/>
				</div>

				<div className="detail-field">
					<p className="label">Email</p>
					<p className="value" style={{ color: `${editMode ? "gray" : ""}` }}>
						{currentUser.email}
					</p>
				</div>
				<div className="detail-field">
					<p className="label">Address</p>
					<p className="value" style={{ display: `${editMode ? "none" : ""}` }}>
						{currentUser.address}
					</p>
					<FormInput
						name="address"
						value={address}
						onChange={handleChange}
						style={{ display: `${editMode ? "" : "none"}` }}
						error={addressError}
					/>
				</div>
				<div
					className="form-buttons"
					style={{ display: `${editMode ? "" : "none"}` }}
				>
					<Button buttonType="primary" onClick={onSubmit}>
						Save Changes
					</Button>
					<Button buttonType="secondary" onClick={() => setEditMode(false)}>
						Cancel
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Profile
