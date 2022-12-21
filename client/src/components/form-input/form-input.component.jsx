import "./form-input.styles.scss"
import React from "react"

const FormInput = ({ label, error, ...otherProps }) => {
	return (
		<div className="group">
			<input className={`${error ? "error" : ""} form-input`} {...otherProps} />
			{label && (
				<label
					className={`${
						otherProps.value.length ? "shrink" : ""
					} form-input-label`}
				>
					{label}
				</label>
			)}
			{error && <p className="error">{error}</p>}
		</div>
	)
}

export default FormInput
