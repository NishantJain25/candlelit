import React from "react"
import { NavLink } from "react-router-dom"

import "./checkout-product.styles.scss"

const CheckoutProduct = ({ cartItem }) => {
	console.log(cartItem)
	const { id, name, price, color, images, weight, quantity, scent } = cartItem
	return (
		<div className="checkout-product">
			<div
				className="img"
				style={{
					backgroundImage: `url(${images[color]})`,
					backgroundColor: "beige",
				}}
			></div>
			<div className="details">
				<NavLink to={`/product/${id}`}>
					<p id="name">{name}</p>
				</NavLink>
				<p id="price">Rs.{price}</p>
				<div className="info-grid">
					<p id="cart-quantity">Quantity:</p>
					<p id="value">{quantity}</p>
					<p id="scent">Scent:</p>
					<p id="value">{scent}</p>
					<p id="color">Colour:</p>
					<p id="Value">{color}</p>
					<p id="weight">Weight:</p>
					<p id="value">
						{weight}
						<span>g</span>
					</p>
					<p id="total">Total:</p>
					<p id="value">Rs.{price * quantity}</p>
				</div>
			</div>
		</div>
	)
}

export default CheckoutProduct
