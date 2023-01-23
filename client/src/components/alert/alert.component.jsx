import React, { useState } from "react"
import "./alert.styles.scss"
const Alert = ({ message, show, type }) => {
	return (
		<div
			className={`alert ${type}`}
			style={{ height: `${show ? "50px" : "0px"}` }}
		>
			<p>{message}</p>
		</div>
	)
}

export default Alert
