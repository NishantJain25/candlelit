import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { storage } from "../../utils/firebase/firebase.utils"
import {
	ref,
	getDownloadURL,
} from "firebase/storage"

import "./product-card.styles.scss"

const ProductCard = ({ product }) => {
	const { id, name, images, price, desc, category, colors } = product
	const [image, setImage] = useState(null)

	const navigate = useNavigate()
	const onNavigateHandler = () => navigate(`/product/${id}`)
	useEffect(() => {
		setImage(images[0])
	},[])
	
	return (
		<div className="product-card" onClick={onNavigateHandler}>
			<div id="product-image">
				 <img id="image" src={image} style={{background:"white"}} loading="lazy"/>
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
