import React from "react"
import "./App.css"

import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

// Components imports
import Signup from "./component/Signup"
import Login from "./component/Login"
import NavBar from "./component/NavBar"
import Main from "./component/Main"

const App: React.FC = () => {
	return (
		<div >
      <Router>			  
        <NavBar/>	       
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/main" component={Main} />
            <Route path="/signup" component={Signup} />           
            {/* <Route path="/login" component={Login} />    */}
          </Switch> 
      </Router>
		</div>
	)
}

export default App
