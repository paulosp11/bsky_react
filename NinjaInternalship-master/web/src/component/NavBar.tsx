import * as React from "react";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem
} from "baseui/header-navigation";

import { Button, SIZE, KIND } from "baseui/button"
import  logo  from '../logo/logo.png';
import {  NavLink } from "react-router-dom"

import {StoreContainer} from "../unstated/StoreContainer"


export default () => {

  const { vCurrentUser, handleRestart } = StoreContainer.useContainer()


  return (
    <HeaderNavigation>
      <StyledNavigationList $align={ALIGN.left} >
 

      <img className="img" src={logo} />    
      
      </StyledNavigationList>
             <React.Fragment>
							<StyledNavigationList $align={ALIGN.center} />
							<StyledNavigationList $align={ALIGN.right}>
								<StyledNavigationItem>
                
                { vCurrentUser ?                
                      ""           
                    :                    
                  <NavLink to="/">
                    <Button size={SIZE.compact} >Login</Button>
                  </NavLink> 
                }

								</StyledNavigationItem>
								<StyledNavigationItem>


                { vCurrentUser ?

                  <NavLink to="/">
                  <Button size={SIZE.compact}                                   
                   onClick={() => {handleRestart()  }} >                                    
                    Logout
                  </Button>  
                  </NavLink>           
                    :                    
                  <NavLink to="/signup">
                    <Button size={SIZE.compact}>Sign Up</Button>
                  </NavLink>                   
                }
								</StyledNavigationItem>
							</StyledNavigationList>
						</React.Fragment>
    </HeaderNavigation>
  );
}