import React from "react"
import { useNavigate } from "react-router-dom"
import ProductCard from "../../components/product-card/product-card.component"
import "./home.styles.scss"
import { products } from "../../products.jsx"

const Home = () => {
	const navigate = useNavigate()
	const onNavigateHandler = () => navigate("/shop")
	return (
		<div className="home-container">
			<section className="home-section" id="landing-page">
				<h1 className="display-1">Light A Candle</h1>
				<button className="button">Shop now</button>
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
					<div className="category-container"></div>
					<div className="category-container"></div>
					<div className="category-container"></div>
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
					{products
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
