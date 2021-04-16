import React, { useState } from "react"
import { Input } from "baseui/input";
import { Button, SIZE } from "baseui/button"
import { StoreContainer } from "../unstated/StoreContainer"
import TickerDetailsView from "./TickerDetailsView"
import { Spinner } from "baseui/spinner"
import {useStyletron} from 'baseui';
import { Drawer, ANCHOR } from "baseui/drawer"


import {
	HeaderNavigation,
	ALIGN,
	StyledNavigationList,
	StyledNavigationItem
  } from "baseui/header-navigation";

// Components
import Cards from "./Cards"
import { FaSearch, FaSadTear, FaSmileBeam } from "react-icons/fa";
import FavsCard from "./FavsCard"

interface IProduct {
	id: string
	base_currency: string
	quote_currency: string
	base_min_size: string
	base_max_size: string
	quote_increment: string
	base_increment: string
	display_name: string
	min_market_funds: string
	max_market_funds: string
	margin_enabled: boolean
	post_only: boolean
	limit_only: boolean
	cancel_only: boolean
	status: string
	status_message: string
}

function Main() {
	const { prodSearchInput, prodSetSearchInput, qryProducts, 
		 userFavourites, vQryProducts, useFetchProducts, setQryProducts } = StoreContainer.useContainer()
	 
	const [isOpen, setIsOpen] = React.useState(false)

	let [searchQuery, setSearchQuery] = useState("")
	// get products from api
	const products: IProduct[] = useFetchProducts(`https://api.pro.coinbase.com/products`).response

	const displayQuiredProducts = () => {
		if (vQryProducts != null) {
			if (vQryProducts.length > 0) {
				return vQryProducts.map((product: any) => <Cards key={product.id} product={product} />)
			} else {
				return <h3 className = "flash"> Sorry mate there are no results to show for "{searchQuery}"</h3>
			}
		} else {
			setQryProducts(products)
			return <Spinner color="#d5db70" />
		}
	}

	return (
		<div>
			<div>

			<HeaderNavigation>
              <StyledNavigationList $align={ALIGN.left} >    
      
			     <h1>Products-Coins</h1>    		 
     
              </StyledNavigationList>
              <React.Fragment>
			     <StyledNavigationList $align={ALIGN.center} />
				 <StyledNavigationList $align={ALIGN.right}>
				  <StyledNavigationItem>    
	     
					<Button onClick={() => setIsOpen(!isOpen)} size={SIZE.compact}  >
						Favourites
					</Button>
					 <Drawer isOpen={isOpen} autoFocus onClose={() => setIsOpen(false)} anchor={ANCHOR.left}>
						
							<h2 >Favourites</h2> 	<br/>
							<div >
								{userFavourites ? (
									userFavourites.length > 0 ? (
										userFavourites.map(Fave => {
											return <FavsCard key={Fave.id} favo={Fave} />
										})
									) : (
										
										<div> 
										<h5 >
											There is no Favourites to be Listeded 
											<FaSadTear color="gray"  size={35}/>										
										</h5> 
										   <ul>
											   <li></li>
											   <li></li>
											   <li></li>
										</ul>	   
										<h5 >
											You can go now and select it	
											<FaSmileBeam color="#34B3FF"  size={35}/>									
										</h5> 
										   										   
										</div>
									)
								) : (
									" "
								)}
							</div>
						</Drawer>
					      
				  </StyledNavigationItem>

				</StyledNavigationList>
				</React.Fragment>
              </HeaderNavigation> 
  
			  <br/>	

			  {vQryProducts && searchQuery !== "" && vQryProducts.length > 0 ? (
	 			<h3 className="flash">
						{vQryProducts.length} results for "{searchQuery}"
				</h3>                  

				) : (
					""
				)}  				
		
				<form action="">
				
				<div className= "search" >
				<Input	type="text"
						value={prodSearchInput}
						onChange={e => prodSetSearchInput(e.currentTarget.value)}
						placeholder="Search" 
				/>
		

                <Button onClick={evt => {qryProducts(evt) 
					                     setSearchQuery(prodSearchInput)}} >				
										 <FaSearch color="green" size={25} />
			    </Button> 
			    </div>

		    	</form>
			</div>
			<div className="bottom">
				<div className="card-grid">{displayQuiredProducts()}</div>
			</div>

			<TickerDetailsView />
		</div>
	)
}

export default Main
