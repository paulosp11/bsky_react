 import React, { Component } from "react";

import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

import Signup from "./Signup";

class Main extends Component {
    render() {
      return (
       
       <HashRouter>
          <div>
            <h1 className = "h1_home"> CoinBase - Welcome </h1>
          
            <ul className="header"> 
              <li><NavLink to="/component/Main">Home</NavLink></li>             
              <li><NavLink to="/component/Login">Login</NavLink></li>
              <li><NavLink to="/component/Signup">Signup</NavLink></li>
            </ul>
            
            <div className="content">                            
                 
              <Route path="/component/Signup" component={Signup}/>    
            </div>

          </div>
        </HashRouter>
      );
    }
  }

  export default Main;  