import React, { useEffect } from "react"
import "./about.styles.scss"

const About = () => {
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])
	return (
		<div className="about-container">
			<header>
				<h1>About Us</h1>
			</header>
			<section className="grid">
				<div className="images" id="first">
					<p>Some images</p>
				</div>
				<div className="text">
					<h2>Some title</h2>
					<p>Lots of text</p>
				</div>
			</section>
			<section className="grid">
				<div className="text">
					<p>Another paragraph</p>
				</div>
				<div className="images">Some more images</div>
			</section>
		</div>
	)
}

export default About
