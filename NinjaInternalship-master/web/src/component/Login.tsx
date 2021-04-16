import React from "react"
import {StoreContainer} from "../unstated/StoreContainer"
import { Input } from "baseui/input";
import { Button } from "baseui/button"
import {useStyletron} from 'baseui';
import { Redirect } from "react-router-dom"



interface Props {}

const Login: React.FC<Props> = () => {
  

    const { emailLogin_Input, setValueLogin_Email, passwordLogin_Input, setValueLogin_Password, handleSubmitLogin, isUserLogged } = StoreContainer.useContainer()
    const [css, theme] = useStyletron();  
  
    if (isUserLogged) {       
       return  <Redirect to="/Main" />
     } 

    return(       
 
       <div className={css({
              display: 'flex',
              textAlign: "center",
              justifyContent: "center"
       
              })}>         
         
         <form action= " " >            
              
              <br/> 
     
              
              <h1>Login</h1>                
              <br/> 

              <Input               
                     type="text"
                     value={emailLogin_Input}
                     onChange={e => setValueLogin_Email(e.currentTarget.value)} 
                     placeholder="Email"                   
              />  <br/> 
            
              <Input 
                     type="password"
                     value={passwordLogin_Input}
                     onChange={e => setValueLogin_Password(e.currentTarget.value)} 
                     placeholder="Password"
              />  <br/>                
              
              <div className="al-button"> 
              <Button onClick={handleSubmitLogin} >
                     Login
              </Button>         
              
             
              </div>       

           </form>
       </div>       

    )    


}

export default Login