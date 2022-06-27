import React,{useState} from 'react'
import { Form,Button,Row,Col } from 'react-bootstrap'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import "./LoginScreen.css"
import { useEffect } from 'react';
import "../Loading/Loading"
import {useDispatch,useSelector} from 'react-redux'
import MainTitle  from '../MainTitle/MainTitle'; 
import {login} from "../../Actions/userActions"
import ErrorMessage from '../ErrorMessage/ErrorMessage';
function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password,setPassword]=useState("")
  const [Loading,setLoading]=useState(0)
  const dispatch=useDispatch()
  const submitHandler=async(e)=>{
    e.preventDefault();
    dispatch(login(email,password))
   
  }
  const userLogin = useSelector((state)=>state.userLogin);
  const {loading,error,userInfo}=userLogin
  const navigate=useNavigate()
  useEffect(() => {

    if(localStorage.getItem("userInfo")){
      const userInfo = localStorage.getItem("userInfo");
    }
    if(userInfo){
      navigate('/notes');
     }
    
  }, [userInfo]);
  
  return (
    <MainTitle title="LOGIN">
    <div className="loginContainer">
    {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
    {loading && <Loading/>}
      <Row className="m-2">
        <Col>
       
      <Form onSubmit={submitHandler} id="login">
        <p>
        <Form.Group controlId="Email">
        <Form.Label className='label'>Enter your email id</Form.Label>
        <Form.Control type="email" value={email} placeholder="enter email" onChange={(e)=>{setEmail(e.target.value)}}/>
      </Form.Group>
      </p>
      <p>
      <Form.Group controlId="Password">
        <Form.Label className='label'>Enter your password</Form.Label>
        <Form.Control Control type="password" value={password} placeholder="enter password" onChange={(e)=>{setPassword(e.target.value)}}/>
      </Form.Group>
      </p>
      
      <Button className='button' variant="primary" type="submit" > Login</Button>
      <Row className='my-2'>
              <Col>
                 Already have an account ? <Link to="/register">Register Here</Link>
              </Col>
              
          </Row>
    </Form>
        </Col>
        <Col>
            <div className='image'>
               
                <img src="loginphoto.jpg" alt="....."/>
            </div>
        </Col>
      </Row>
     
    </div>
    </MainTitle>
  )
}

export default LoginScreen