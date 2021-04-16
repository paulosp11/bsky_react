import React from "react"
import { StoreContainer } from "../unstated/StoreContainer"
import { Input } from "baseui/input";
import { Button, SHAPE } from "baseui/button"
import { useStyletron } from 'baseui';
import { Redirect } from "react-router-dom"


interface Props {}

function Register(props: Props) {
    const {} = props
    const { 
      usernameReg_Input, 
      setValueUsernameInput,
      emailRegInput, 
      setValueEmailInput,
      passwordRegInput,
      setValuePasswordInput,
      confirmRegPasswordInput,
      setValueConfirmPasswordInput,
      handleRegister, 
      isUserLogged      
       } = StoreContainer.useContainer()

      const [css] = useStyletron();  
   
    if (isUserLogged) {       
        return  <Redirect to="/Main" /> }     
      
  return (

    <div className={css({
      display: 'flex',
      textAlign: "center",
      justifyContent: "center"
      })}> 
      
      <form action = "" >

        <br />
               
        <h1>Sign Up</h1>  <br /> 
        
        <Input          
          type="name"
          placeholder="Username"
          value={usernameReg_Input}
          name="name"
          onChange={e => setValueUsernameInput(e.currentTarget.value)}          
        /> <br />

        <Input          
          type="text"
          placeholder="Email"
          value={emailRegInput}
          name="email"
          onChange={e => setValueEmailInput(e.currentTarget.value)}       
        /> <br />
        
        <Input          
          type="password"
          placeholder="Password"
          value={passwordRegInput}
          name="password"
          onChange={e => setValuePasswordInput(e.currentTarget.value)}        
        /> <br />

        <Input        
          type="password"
          placeholder="Confirm your Password"
          value={confirmRegPasswordInput}
          name="confirmpassword"
          onChange={e => setValueConfirmPasswordInput(e.currentTarget.value)}        
        />      
        <br />

        <div className="al-button">
        <Button 
         onClick={e => { handleRegister(e)	}}
         shape={SHAPE.default}          
        >
            Register
        </Button>    
        </div>
      </form>

    </div>
   
  )
}

export default Register
