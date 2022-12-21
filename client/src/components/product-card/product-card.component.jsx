import React from "react"
import { useNavigate } from "react-router-dom"

import "./product-card.styles.scss"

const ProductCard = ({ product }) => {
	const { id, name, imageUrl, price, desc, category } = product
	console.log(product)
	const navigate = useNavigate()
	const onNavigateHandler = () => navigate(`/product/${id}`)
	return (
		<div className="product-card" key={id} onClick={onNavigateHandler}>
			<div id="product-image">
				<img id="image" src={imageUrl} />
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
