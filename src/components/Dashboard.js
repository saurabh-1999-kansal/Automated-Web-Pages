import React, { useState } from "react"
import { Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Content from './Content';
import Footer from './Footer';

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
     
          {/* this is the header of our website with some icons */}
      <div id="header"> 
   
        <div className="headerClass" id="error">
         {error && <Alert variant="danger">{error}</Alert>}
        </div>
        
        
        <div className="headerClass" id="Email">
         {currentUser.email}
        </div>

        <div className="headerClass" id="image">
        <h1>Web Designing App</h1>
        </div>


         <div  className="headerClass" id="UpdateProfileLink">
          <Link style={{color:"white"}}  to="/update-profile" >
           UpdateProfile
          </Link>
          </div>

         <div className="headerClass" id="logOutButton" >
          <Button variant="link" style={{color:"white"}} onClick={handleLogout}>
          Logout
          </Button>
         </div>
  
     </div>
 
    <Content/>
    <Footer/>

    </>
  )
}
