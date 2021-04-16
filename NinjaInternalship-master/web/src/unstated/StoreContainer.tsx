import React, { useState, MouseEvent, useEffect, useRef } from "react"
import { createContainer } from "unstated-next"
import { ILogin, ITickerData, IProduct, IFavourite } from "./Interface"

interface Props {}

export const UserStore = () => {
	
	const postData = async (url: string, body: {}) => {
		
		try {
			return await fetch(url, {
				method: "post",
				body: JSON.stringify(body),
			})
				.then(res => res.json())
				.then(data => {
					console.log(data)
				return data})
		} catch {}
	}

	// init user
	const [initUser, setInitUser] = useState<ILogin>()

	// ======================================= //
	//Card PopUp
	const [popUp, setpopUp] = useState<boolean>(false)
	const [onLine, setOnLine] = useState<boolean>(false)

	const handleRestart = () => {
		// signOut Method
		setOnLine(false)

		setisUserLogged(false)
		setInitUser(undefined)
		setCurrentUser(undefined)	

		setValueLogin_Password("")
		setValueLogin_Email("")
	}	
		

	// 1# Login Init
	const [isUserLogged, setisUserLogged] = useState<boolean>(false)	

    const [emailLogin_Input, setValueLogin_Email] = useState<string>("")
	const [passwordLogin_Input, setValueLogin_Password] = useState<string>("")
	const [isLogin, setIsLogin] =useState<boolean>(false)

	// Login
	const handleSubmitLogin = async (evt: MouseEvent) => {
		evt.preventDefault()

        if (emailLogin_Input != "" && passwordLogin_Input != "") {
			
  		    postData("/api/users/signin", { email: emailLogin_Input, password: passwordLogin_Input }).then(data => {
				
			   	if (data.id != undefined) {

					const UserSql: ILogin = {
						Id: data.id,
						isSubmitting: true,
						isUserLogged: true,
						email: data.email,
						username: data.username,
						password: data.password,						
						message: data.message
					}

					console.log(data.id)
					console.log(data.message)
					setInitUser(UserSql)
					getSetFavourites(UserSql.Id)
					setisUserLogged(true)
					setOnLine(true)					

					setIsLogin(data.success)
					setCurrentUser(UserSql)									
					
					// post get faves
				} else {
					alert("Please check Email or Password")
				}
			})

	    } else {
			alert("Please put your Email and Password")	
			setisUserLogged(false)
			setOnLine(false)	
		}
	}

	const getSetFavourites = async (id: string) => {
		//await postData("http://localhost:8000/api/favourite/list", { uid: id }).then(data => {
          await postData("/api/favourite/list", { uid: id }).then(data => {			
			setUserFavourites(data ? data : [])		
		})
	}

	// Register
	const [usernameReg_Input, setValueUsernameInput] = useState<string>("")
	const [emailRegInput, setValueEmailInput] = useState<string>("")
	const [passwordRegInput, setValuePasswordInput] = useState<string>("")
	const [confirmRegPasswordInput, setValueConfirmPasswordInput] = useState<string>("")	
 
	const handleRegister = async (evt: MouseEvent) => {
		evt.preventDefault()
		
		if (confirmRegPasswordInput === passwordRegInput) {	
			
		//	await postData("http://localhost:8000/api/users/signup", {
			await postData("/api/users/signup", {
				email: emailRegInput,
				username: usernameReg_Input,
				password: confirmRegPasswordInput,
			}).then(data => {
				console.log("There is nothing to do, Pauloooooo", data)

				if (data.success === true) {
					const UserSql: ILogin = {
						Id: data.id,
						isUserLogged: true,
						isSubmitting: true,
						username: data.username,
						email: data.email,
						password: data.password,
						message: data.message
					}
					
					
					console.log(UserSql)
					setInitUser(UserSql)
					getSetFavourites(UserSql.Id)
					setisUserLogged(true)
					setOnLine(true)					

					setIsLogin(data.success)
					setCurrentUser(UserSql)					
					
					alert("Registred")
				} else {
					alert(data.message)
				}
			})
		} else {
			alert("Password and Confirm Passaword is not the same ")
			setisUserLogged(false)
			setOnLine(false)					

		}
	}

	const [coinBaseProducts, setCoinBaseProducts] = useState<IProduct[]>() // all products
	const [vQryProducts, setQryProducts] = useState<IProduct[] | undefined>(coinBaseProducts) // quiried products
	
	// State
	const [prodSearchInput, prodSetSearchInput] = useState<string>("")
	const [isViewModalOpen, setViewModalOpen] = useState<boolean>(false)

	const [currentTicker, setCurrentTicker] = useState<ITickerData>()

	const getDetailTicker = async (id: string) => {
	//	await postData("http://localhost:8000/api/get/ticker", { id: id.toString() }).then(data => {
		await postData("/api/get/ticker", { id: id.toString() }).then(data => {
	      setCurrentTicker(data)
			console.log(id, data)
		})
	}

	const [vCurrentUser, setCurrentUser] = useState<ILogin>()

	const [userFavourites, setUserFavourites] = useState<IFavourite[] | undefined>([])

	// check if id in favourites
	const isFavourited = (favourite: IFavourite) => {
		return userFavourites && userFavourites.includes(favourite)
	}

	const handleFavIcon=(productID: string)=>{
		const isfave =userFavourites?userFavourites.find(fav=>fav.id===productID):undefined
		console.log("PSO")
		return isfave		
	}



	const isFavouritedProduct = (prod: IProduct) => {		
		if (vQryProducts) {			
			if (userFavourites) {
					return userFavourites
					.map(f => {
						if (f.id == prod.id) {
							return prod
						}
					})
					.includes(prod)		
					
			}
		}
	}

	const tgFavs = (userId: string, coinId: string) => {
		console.log("kdkd")
		if (vCurrentUser) {
		    // api call to toggle fave based on usre/coin id
		//	postData("http://localhost:8000/api/favourite/toggle", {
				postData("/api/favourite/toggle", {				
				user_id: userId,
				coin_id: coinId,
			})
				.then(data => {
					setIsPaused(true)
					return data
				})
				.then(d => {
					if (d) {
						// api call to get the fave list
					//	postData("http://localhost:8000/api/favourite/list", { uid: userId }).then(faveList => {
	                	postData("/api/favourite/list", { uid: userId }).then(faveList => {						
							// sets new fave list
							setUserFavourites(faveList ? faveList : [])
						})
					}
				})
		}
	}	

	const qryProducts = (evt: MouseEvent) => {
		evt.preventDefault()
		coinBaseProducts && setQryProducts(coinBaseProducts.filter(product => product.id.includes(prodSearchInput.toUpperCase())))
		// return vQryProducts
	}

	const putInFavourites = (id: string) => {
		// setUserFavourites([...userFavourites, id])
		// console.log(userFavourites)
	}

	// Methods
	const useFetchProducts = (url: string, options = {}) => {
		const [response, setResponse] = React.useState()
		const [error, setError] = React.useState()
		React.useEffect(() => {
			const fetchData = async () => {
				try {
					const res = await fetch(url, options)
					const json = await res.json()
					setResponse(json)
					setCoinBaseProducts(json)
				} catch (error) {
					setError(error)
				}
			}
			fetchData()
		}, [])
		return { response, error }
	}

	function useInterval(callback: any, delay: number | null) {
		const savedCallback = useRef<any>()

		// Remember the latest callback.
		useEffect(() => {
			savedCallback.current = callback
		}, [callback])

		// Set up the interval.
		useEffect(() => {
			function tick() {
				savedCallback.current()
			}
			if (delay !== null) {
				let id = setInterval(tick, delay)
				return () => clearInterval(id)
			}
		}, [delay])
	}



	const [timing, setTiming] = useState<number | null>(null)

	const RefreshTickers = () => {
		useInterval(() => {
			// console.log(vCurrentUser)

			if (vCurrentUser && isPused != true) {
				const passData = { uid: vCurrentUser.Id }
			//	postData("http://localhost:8000/api/favourite/list", passData).then(data => {
				postData("/api/favourite/list", passData).then(data => {				
					setUserFavourites(data)
					console.log("Faves has been updated lmao")
				})
			} else {
				// console.log("nothing")
			}
		}, timing)
	}

	const [isPused, setIsPaused] = React.useState(true)

	const handlePauseRefresh = (event: MouseEvent) => {
		event.preventDefault()
		setIsPaused(true)
		setTiming(null)
	}

	const handleRestartRefresh = (event: MouseEvent) => {
		event.preventDefault()
		setIsPaused(false)
		setTiming(5000)
	}	

	const handleLogout = () => {
		setCurrentUser(undefined)
	}


    return{
		//Login
        emailLogin_Input,
        setValueLogin_Email,
        passwordLogin_Input,
		setValueLogin_Password,
		handleSubmitLogin,

		// Register
		usernameReg_Input, 
		setValueUsernameInput,
		emailRegInput, 
		setValueEmailInput,
		passwordRegInput,
		setValuePasswordInput,
		confirmRegPasswordInput,
		setValueConfirmPasswordInput,
		handleRegister,
		
		// Logout	
		handleLogout,

		qryProducts,

		vCurrentUser,

		// View Coin Modal
		getDetailTicker,
		isViewModalOpen,
		setViewModalOpen,

		// Tickers
		currentTicker,

	    /*Fetch Products */
		// State
		coinBaseProducts,
		setCoinBaseProducts,
		// Methods
		useFetchProducts,
		isFavourited,
		putInFavourites,
		userFavourites,
		getSetFavourites,
		tgFavs,
		isFavouritedProduct,
		setCurrentTicker,
		
		/* Main */
		prodSearchInput,
		prodSetSearchInput,
		vQryProducts,
		setQryProducts,
		
		RefreshTickers,
		setTiming,
		
		//init user
		initUser,
		setInitUser,		
		handleRestart,
		isUserLogged,
		popUp, setpopUp, handleFavIcon,
		setUserFavourites,

		setIsPaused,
		isPused
    }


}

export const StoreContainer = createContainer(UserStore)