import React, { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import {Button,Row,Col} from  'react-bootstrap'
import "./LandingPage.css"
function LandingPage() {
  let navigate = useNavigate();

  useEffect(() => { 
      const userInfo = localStorage.getItem("userInfo");
      // if(userInfo){
      //     navigate("/");
      // }
  }, [navigate]);
  return (
    <div>
    <div className='landingPage'>
    <Row>
      <Col>
      <Link to="/login" >
                <Button className='btn-lg'>Login</Button>
              </Link>
      </Col>
      <Col>
      <Link to="/register" >
                <Button className=' btn-lg'>Register</Button>
              </Link>
      </Col>
      </Row>
   
  

    </div>
    </div>
  )
}

export default LandingPage