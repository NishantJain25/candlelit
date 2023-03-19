import React from "react"

import "./checkout-details.styles.scss"

const CheckoutDetails = ({ cartAmount, quantity }) => {
	return (
		<div className="checkout-details">
			<div className="checkout-row">
				<p>Items</p>
				<p>{quantity}</p>
			</div>
			<div className="checkout-row">
				<p>Order Value</p>
				<p>Rs.{cartAmount}</p>
			</div>
			<div className="checkout-row">
				<p>Delivery Charges*</p>
				<p>Rs.150</p>
			</div>

			<div className="total">
				<p>Total</p>
				<p>Rs.{cartAmount + 150}</p>
			</div>
		</div>
	)
}

export default CheckoutDetails
