import React from "react"
import { IFavourite } from "../unstated/Interface"
import { StoreContainer } from "../unstated/StoreContainer"
import { Button, SIZE, KIND } from "baseui/button"
import { FaStar, FaRegStar } from "react-icons/fa"
import "../App.css"

import {
	Card,
	StyledBody,
	StyledAction
  } from "baseui/card";

interface PFave {
	favo: IFavourite
}

function FavsCard(props: PFave) {
	const { favo } = props
	const { isFavourited, tgFavs, initUser } = StoreContainer.useContainer()
	
    console.log(props)
    
	return (
      <React.Fragment>
		<div className = "card-grid" key={favo.price}>
			<Card>
			<StyledBody>
            <StyledAction>
				<Button
					size={SIZE.default}
                    kind={KIND.primary}
                    
					onClick={() => {
						initUser && tgFavs(initUser.Id, favo.id)
					}}>

					{ isFavourited(favo) ? 
						   <FaStar color="green" size={30} /> 
						   : 
						   <FaRegStar color="#b5a19f" size={30} /> }
				</Button>
                </StyledAction>
                <br/>
				<h3 className="card-title">{favo.id}</h3>
                <ul>				
					<li>Ask: {favo.ask}</li>
					<li>Price: {favo.price}</li>
					<li>Bid: {favo.bid}</li>
					<li>Volume: {favo.volume}</li>
				</ul>
    		</StyledBody> 			
			</Card>		
		</div>
      </React.Fragment>
	)
}

export default FavsCard