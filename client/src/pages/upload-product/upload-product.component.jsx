import React, { useState } from "react"
import { products } from "../../products.jsx"
import { addCollectionsAndDocuments } from "../../utils/firebase/firebase.utils"
const UploadProduct = () => {
	const handleSubmit = (e) => {
		addCollectionsAndDocuments("products", products)
	}

	const handleFile = (id, file) => {
		products.map((product) => {
			if (product.id === id) {
				product.imageUrl = file
			}
		})
	}
	return (
		<div>
			<div>
				{products.map((product) => (
					<div>
						<p>{product.name}</p>
						<p>image: {product.images[0]}</p>
					</div>
				))}
			</div>
			<button onClick={handleSubmit}>upload</button>
		</div>
	)
}

export default UploadProduct
