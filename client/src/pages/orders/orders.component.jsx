import React, { useState, useEffect, useContext } from "react"
import { useNavigate, Routes, Route, Outlet } from "react-router-dom"
import OrderCard from "../../components/order-card/order-card.component"

import "./orders.styles.scss"
const Orders = () => {
	return (
		<div className="details">
			<header>
				<p>Your Orders</p>
			</header>
			<div className="previous-orders">
				<div className="current-orders">
					<OrderCard
						products={[
							{ name: "The Woman", quantity: 1 },
							{ name: "The Pillar", quantity: 2 },
						]}
						amount={1500}
						status={"pending"}
						orderDate={"03/01/2023"}
						deliveryAddress={"B/1507, RNA Royale Park"}
					/>
				</div>
				<div className="completed-orders"></div>
			</div>
		</div>
	)
}

export default Orders
