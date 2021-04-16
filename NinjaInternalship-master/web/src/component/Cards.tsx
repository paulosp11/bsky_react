import React from "react"
import { Button, SIZE, KIND } from "baseui/button"
import { FaStar, FaRegStar, FaUserNinja } from "react-icons/fa"
import { StoreContainer } from "../unstated/StoreContainer"
import { IFavourite } from "../unstated/Interface"

import {
	Card,
	StyledBody,
	StyledAction
  } from "baseui/card";

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

interface Props {
	product: IProduct
}

interface PropsFaves {
	favourite: IFavourite
}

function Cards(props: Props) {
	const { product } = props
	const { setViewModalOpen, getDetailTicker, isFavouritedProduct, tgFavs, vCurrentUser, setIsPaused } = StoreContainer.useContainer()

	return (
		<React.Fragment>
			<div key={props.product.id}>
			<Card>
			    <StyledAction>
				<Button
					size={SIZE.default}
					kind={KIND.primary}
					// onClick={() => { vCurrentUser && tgFavs(vCurrentUser.Id, props.product.id)}}
					onClick={() => { vCurrentUser && tgFavs(vCurrentUser.Id, props.product.id)}}>
					
					{ isFavouritedProduct(product) ?
						   <FaStar color="green" size={30} /> 
						   : 
						   <FaRegStar color="#b5a19f" size={30} /> }
				</Button>
					
				</StyledAction> <br/>
				
				<StyledBody>
				    <h4 className="card-title">{props.product.display_name}</h4>
				</StyledBody> <br/>
  			    <StyledAction>
					<Button
						onClick={() => {
							setViewModalOpen(true)
							setIsPaused(true)
							getDetailTicker(props.product.id)
						}}
						size={SIZE.default}
					>
						View + <FaUserNinja color="green" size={25} />
					</Button> 
				</StyledAction> 			
				</Card>			

			</div>
		</React.Fragment>
	)
}
export default Cards
