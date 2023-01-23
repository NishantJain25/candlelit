import logo from "./logo.svg"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import Navigation from "./components/navigation/navigation.component.jsx"
import { Outlet } from "react-router-dom"
import { VscArrowUp } from "react-icons/vsc"

function App() {
	return (
		<div className="App">
			<Navigation />
			<Outlet />
		</div>
	)
}

export default App
