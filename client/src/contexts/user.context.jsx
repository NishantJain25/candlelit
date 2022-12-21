import { createContext, useEffect, useState } from "react"
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
		const unsubscribe = onAuthStateChangeListener(async (user) => {
			if (user) {
				//createUserDocFromAuth(user)
				const data = await getUser(user.uid)
				setCurrentUser(data)
			} else {
				setCurrentUser(user)
			}
		})
		return unsubscribe
	}, [])

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
