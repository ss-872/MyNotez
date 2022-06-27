import React from 'react' 
import { NavDropdown,Nav,Navbar,Container} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {logout } from "../Actions/userActions"
function Header(setSearch){
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const userLogin=useSelector(state=>state.userLogin)
  const {userInfo}=userLogin
  const logoutHandler=()=>{
      dispatch(logout())
      navigate("/")
  }
  return (
    <div>
      
        <Navbar bg="light" expand="lg">
        <a class="navbar-brand" href="/"><img src="navbrandphoto.svg" width={"80px"}></img></a>
      <Navbar.Brand  href="/">MyNotez</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
        <NavDropdown title="Logout?" id="basic-nav-dropdown">
          {/* <NavDropdown.Item  onClick={()=>{navigate('/profile')}}>My Profile</NavDropdown.Item> */}
            <NavDropdown.Item  onClick={logoutHandler}>Logout</NavDropdown.Item>
          </NavDropdown>
          
        </Nav>
      </Navbar.Collapse>
    
  </Navbar>
        
    </div>
  )
}

export default Header
