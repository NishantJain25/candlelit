import React, { useState } from "react"
import { VscChevronUp, VscChevronDown } from "react-icons/vsc"
import "./dropdown.styles.scss"

const Dropdown = ({ options, selectedOption, setterFunc, type }) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const handleClick = (option) => {
		setterFunc(option)
		setIsDropdownOpen(false)
	}
	return (
		<div className="dropdown">
			<div
				className="dropdown-button"
				onClick={() => setIsDropdownOpen((currentState) => !currentState)}
			>
				<p>{selectedOption ? selectedOption : `Choose a ${type}`}</p>
				{isDropdownOpen ? <VscChevronUp /> : <VscChevronDown />}
			</div>
			<div
				className="dropdown-container"
				style={{ display: `${isDropdownOpen ? "" : "none"}` }}
			>
				{options.map((option, key) => (
					<div
						className="dropdown-option"
						key={key}
						onClick={() => handleClick(option)}
					>
						<p>{option}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default Dropdown
