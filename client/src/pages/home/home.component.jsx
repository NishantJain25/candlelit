import React, { useContext, useEffect } from "react"
import { useNavigate, NavLink } from "react-router-dom"
import ProductCard from "../../components/product-card/product-card.component"
import Button from "../../components/button/button.component"
import { CategoryContext } from "../../contexts/category.context"
import { ProductContext } from "../../contexts/product.context"
import { addCollectionsAndDocuments } from "../../utils/firebase/firebase.utils"
import "./home.styles.scss"

const Home = () => {
	const { categoriesList } = useContext(CategoryContext)
	const { productList } = useContext(ProductContext)
	console.log(productList)
	const navigate = useNavigate()
	const onNavigateHandler = () => navigate("/shop")

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])
	//to add new products
	/* useEffect(() => {
		const products = [
			{
				category: "Statue",
				colors: ["white", "black", "lavender"],
				images: {
					white:"https://images.unsplash.com/photo-1607713328148-0e55aa0c0772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhbmRsZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
					black:"https://images.unsplash.com/photo-1659959342837-ab43b43a8074?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
					lavender:"https://images.unsplash.com/photo-1608181831718-2501832be3e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
				},
				date: "18/01/2023",
				id: 1,
				name: "The Woman",
				weight: 250,
				price: 300,
				stock: 7,
				scents: ["lavender", "lemongrass", "morning dew"],
			},
			{
				category: "Pillar",
				colors: ["white", "beige", "lavender"],
				images: {
					white:"https://images.unsplash.com/photo-1607713328148-0e55aa0c0772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhbmRsZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
					beige: "https://images.unsplash.com/photo-1659959342837-ab43b43a8074?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
					lavender: "https://images.unsplash.com/photo-1608181831718-2501832be3e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
				},
				date: "18/01/2023",
				id: 1,
				name: "The Pillar",
				price: 300,
				weight: 350,
				stock: 7,
				scents: ["lavender", "lemongrass", "morning dew"],
			},
			{
				category: "Bubble",
				colors: ["white", "beige", "lavender"],
				images: {
					white: "https://images.unsplash.com/photo-1607713328148-0e55aa0c0772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhbmRsZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
					beige: "https://images.unsplash.com/photo-1659959342837-ab43b43a8074?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
					lavender: "https://images.unsplash.com/photo-1608181831718-2501832be3e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
				},
				date: "18/01/2023",
				id: 1,
				name: "Bubble cube",
				price: 300,
				weight: 150,
				stock: 7,
				scents: ["lavender", "lemongrass", "morning dew"],
			},
			{
				category: "Statue",
				colors: ["white", "beige", "lavender"],
				images: {
					white: "https://images.unsplash.com/photo-1607713328148-0e55aa0c0772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhbmRsZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
					beige: "https://images.unsplash.com/photo-1659959342837-ab43b43a8074?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
					lavender: "https://images.unsplash.com/photo-1608181831718-2501832be3e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
				},
				date: "18/01/2023",
				id: 1,
				name: "The Woman",
				price: 300,
				weight: 250,
				stock: 7,
				scents: ["lavender", "lemongrass", "morning dew"],
			},
			{
				category: "Statue",
				colors: ["white", "beige", "lavender"],
				images: {
					white: "https://images.unsplash.com/photo-1607713328148-0e55aa0c0772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhbmRsZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
					beige: "https://images.unsplash.com/photo-1659959342837-ab43b43a8074?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
					lavender: "https://images.unsplash.com/photo-1608181831718-2501832be3e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
				},
				date: "18/01/2023",
				id: 1,
				name: "The Woman",
				price: 300,
				weight: 300,
				stock: 7,
				scents: ["lavender", "lemongrass", "morning dew"],
			},
		]
		const addProducts = async () =>
			await addCollectionsAndDocuments("products", products)
		addProducts()
	}, []) */
	return (
		<div className="home-container">
			<section className="home-section" id="landing-page">
				<h1 className="display-1">Light A Candle</h1>
				<Button buttonType="primary" onClick={onNavigateHandler}>
					Shop now
				</Button>
			</section>
			<section id="home-about">
				<div className="home-about-images">
					<div id="image-1"></div>
					<div id="image-2"></div>
				</div>
				<div className="home-about-text">
					<h1>Looking For A Way To Relax After A Long Day?</h1>
					<p>
						Light up a candle. Take out a candle. Use a lighter. Check the
						scent. Do all that shit. Decorate the room.{" "}
					</p>
				</div>
			</section>
			<section id="home-explore">
				<header>
					<h1>Explore</h1>
					<p>Check out the different types of candles.</p>
				</header>
				<div id="separator" />
				<div className="explore-container">
					{categoriesList &&
						categoriesList.map((category) => (
							<NavLink
								to={`/categories/${category.name}`}
								className="category-link"
							>
								<div
									className="category-container"
									style={{
										background: `url(${category.imageUrl})`,
										backgroundPosition: "center",
										backgroundSize: "cover",
									}}
								>
									<h2>{category.name}</h2>
								</div>
							</NavLink>
						))}
				</div>
			</section>
			<section id="home-shop">
				<header>
					<h1>Our Shop</h1>
					<p>
						Browse through our catalogue to find the perfect candles for you
					</p>
				</header>
				<div id="separator" />
				<div className="home-shop-container">
					{productList &&
						productList
							.filter((_, index) => index < 5)
							.map((product, key) => (
								<ProductCard key={key} product={product} />
							))}
					<button id="view-shop-button" onClick={onNavigateHandler}>
						View Shop
					</button>
				</div>
			</section>
		</div>
	)
}

export default Home
