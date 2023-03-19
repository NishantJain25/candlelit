import { createContext, useEffect, useState, useContext } from "react"
import {
	onAuthStateChangeListener,
	createUserDocFromAuth,
	getUser,
} from "../utils/firebase/firebase.utils"

export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
})

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null)

	const value = { currentUser, setCurrentUser }

	useEffect(() => {
		const unsubscribe = onAuthStateChangeListener((user) => {
			setCurrentUser(user)
		})
		return unsubscribe
	}, [])

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
