import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
	modifyCartItemQuantity,
	addItemToCart,
	removeItemFromCart,
} from "../../store/cart/cart.action"
import { selectCartItems } from "../../store/cart/cart.selector"
import { selectCurrentUser } from "../../store/user/user.selector"

import { NavLink } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"
import "./cart-item.styles.scss"

const CartItem = ({ product }) => {
	const dispatch = useDispatch()
	const currentUser = useSelector(selectCurrentUser)
	const { id, name, price, quantity, images, fragrance, color, category } =
		product

	const cartItems = useSelector(selectCartItems)
	const handleQuantity = (operation) => {
		if (quantity === 1 && operation === "subtract") {
			dispatch(removeItemFromCart(currentUser, cartItems, product))
		} else {
			dispatch(
				modifyCartItemQuantity(currentUser, cartItems, product, operation)
			)
		}
	}
	return (
		<div className="cart-item-container">
			<div className="product">
				<NavLink to={`/product/${id}`}>
					<div className="image">
						<img src={images[0]} />
					</div>
				</NavLink>
				<div className="details">
					<p id="name">{name}</p>
					<div id="price">Rs. {price}</div>
					<div id="info">
						<p className="label">Category: </p>
						<p className="value">{category}</p>
						<p className="label">Fragrance: </p>
						<p className="value">{fragrance}</p>
						<p className="label">Colour:</p>
						<div
							className="value"
							id="color-pill"
							style={{ backgroundColor: `${color}` }}
						>
							{color}
						</div>
						<p className="label">Total Price: </p>
						<p className="value" id="total">
							Rs. {price * quantity}
						</p>
					</div>

					<div className="quantity" id="quantity">
						<button id="subtract" onClick={() => handleQuantity("subtract")}>
							-
						</button>
						<span>{quantity}</span>
						<button id="add" onClick={() => handleQuantity("add")}>
							+
						</button>
					</div>
				</div>
				<div className="remove-button">
					<button
						id="remove"
						onClick={() =>
							dispatch(removeItemFromCart(currentUser, cartItems, product))
						}
					>
						<FontAwesomeIcon icon={faTrashCan} />
					</button>
				</div>
			</div>
		</div>
	)
}

export default CartItem
