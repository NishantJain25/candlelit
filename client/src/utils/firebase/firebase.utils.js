import { initializeApp } from "firebase/app"
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs,
	where,
} from "firebase/firestore"

import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth"

const firebaseConfig = {
	apiKey: "AIzaSyBMcYl13tBMvn6rmfG8q-1mdKVS_lf5VA4",
	authDomain: "candlelit-dc08b.firebaseapp.com",
	projectId: "candlelit-dc08b",
	storageBucket: "candlelit-dc08b.appspot.com",
	messagingSenderId: "152910063548",
	appId: "1:152910063548:web:2e375edf35fa89aeebedb9",
	measurementId: "G-KENY142NS0",
}

//Initialize firebase
const app = initializeApp(firebaseConfig)
//const analytics = getAnalytics(app);
const db = getFirestore(app)

const auth = getAuth(app)

export const addCollectionsAndDocuments = async (
	collectionKey,
	objectToAdd
) => {
	const collectionRef = collection(db, collectionKey)
	const batch = writeBatch(db)

	objectToAdd.forEach((object) => {
		const docRef = doc(collectionRef)
		batch.set(docRef, object)
	})
	await batch.commit()
	console.log("done")
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return

	return await createUserWithEmailAndPassword(auth, email, password)
}

export const createUserDocFromAuth = async (userAuth, additionalInfo = {}) => {
	if (!userAuth) return

	const userDocRef = doc(db, "users", userAuth.uid)
	const userSnapshot = await getDoc(userDocRef)

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth
		const createdAt = new Date()

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInfo,
			})
		} catch (error) {
			console.error("Error creating user: ", error)
		}
	}
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return

	return await signInWithEmailAndPassword(auth, email, password)
}

export const getUser = async (uid) => {
	if (!uid) return

	try {
		const docRef = doc(db, "users", uid)
		const docSnap = await getDoc(docRef)

		if (docSnap.exists()) {
			return docSnap.data()
		} else {
			return null
		}
	} catch (error) {
		console.log(error)
	}
}
const signUserOut = async () => {
	await signOut(auth)
}

export const onAuthStateChangeListener = (callback) => {
	onAuthStateChanged(auth, callback)
}

export const getAllProducts = async (filters = []) => {
	const productsRef = collection(db, "products")

	const q =
		filters.length > 0
			? query(productsRef, where(...filters))
			: query(productsRef)
	try {
		const querySnapshot = await getDocs(q)
		const products = querySnapshot.docs.reduce((arr, docSnapshot, index) => {
			console.log(docSnapshot)
			arr[index] = docSnapshot.data()
			return arr
		}, [])
		return products
	} catch (error) {
		console.log(error)
	}
}
