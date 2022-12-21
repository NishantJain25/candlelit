import "./button.styles.scss"
import React from "react"

const Button = ({ buttonType, children, ...otherProps }) => {
	const BUTTON_TYPE_CLASSES = {
		primary: "primary",
		secondary: "secondary",
	}
	return (
		<button
			className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
			{...otherProps}
		>
			{children}
		</button>
	)
}

export default Button
