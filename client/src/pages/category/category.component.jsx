import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import ProductCard from "../../components/product-card/product-card.component"
import { ProductContext } from "../../contexts/product.context"
import { getCategoryFromDatabase } from "../../utils/firebase/firebase.utils"
import "./category.styles.scss"

const Category = () => {
	const { category } = useParams()
	const [categoryData, setCategoryData] = useState([])
	const [productData, setProductData] = useState([])
	const { productList } = useContext(ProductContext)

	useEffect(() => {
		window.scrollTo(0, 0)
		const getData = async () => {
			const response = await getCategoryFromDatabase(category)
			setCategoryData(response)
		}
		getData()
	}, [category])

	useEffect(() => {
		const filteredProducts = productList.filter(
			(product) => product.category === category
		)
		console.log(filteredProducts)
		setProductData(filteredProducts)
	}, [productList])

	const { categoryName, categoryDesc, imageUrl } = categoryData
	console.log(productList)
	return (
		<div className="category-container">
			<section className="title">
				<div className="hero-image">
					<img src={imageUrl} />
				</div>
				<div className="title-text">
					<h1>{category}</h1>
					<p>{categoryDesc}</p>
				</div>
			</section>
			<section className="shop">
				<h2>Shop for {category} candles</h2>

				{productData.length > 0 ? (
					<div className="product-list">
						{productData.map((product, key) => (
							<ProductCard product={product} key={key} />
						))}
					</div>
				) : (
					<p>No products available</p>
				)}
			</section>
		</div>
	)
}

export default Category
