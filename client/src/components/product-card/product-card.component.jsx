import React from "react"
import { useNavigate } from "react-router-dom"

import "./product-card.styles.scss"

const ProductCard = ({ product }) => {
	console.log(product)
	const { id,name, images, price, desc, category, colors } = product

	const navigate = useNavigate()
	const onNavigateHandler = () => navigate(`/product/${id}`)
	return (
		<div className="product-card" onClick={onNavigateHandler}>
			<div id="product-image">
				<img id="image" src={images[0]} />
			</div>
			<div id="product-details">
				<div id="details">
					<p id="category">{category}</p>
					<p id="name">{name.toUpperCase()}</p>
				</div>
				<div id="price">
					<p>&#8377; {price}</p>
				</div>
			</div>
		</div>
	)
}

export default ProductCard
