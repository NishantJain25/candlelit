import React, { useState } from "react"
import { VscChevronDown, VscChevronUp } from "react-icons/vsc"
import "./order-card.styles.scss"
const OrderCard = ({
	products,
	amount,
	orderDate,
	status,
	deliveryAddress,
}) => {
	const [isExpanded, setIsExpanded] = useState(false)
	const handleClick = () => {
		setIsExpanded((currentState) => !currentState)
	}
	return (
		<div
			className={`order-card ${isExpanded ? "expanded" : ""}`}
			style={{
				backgroundColor: `${status === "delivered" ? "grey" : "white"}`,
			}}
			onClick={handleClick}
		>
			<p id="title">Products Purchased</p>
			<p id="date">{orderDate}</p>
			<div id="expand-button">
				{isExpanded ? <VscChevronUp /> : <VscChevronDown />}
			</div>
			<p id="products">
				Product1 (x2), Product2 (x1), Product1 (x2), Product2 (x1), Product1
				(x2), Product2 (x1), Product1 (x2), Product2 (x1)
			</p>
			<p id="amount">Rs. {amount}</p>
		</div>
	)
}

export default OrderCard
