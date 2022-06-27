import React,{useState,useEffect} from 'react'
import { Form,Button,Row,Col } from 'react-bootstrap'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loading from "../Loading/Loading"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import { Register } from '../../Actions/userActions'
function RegisterScreen() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState(null);
    const [confirmPassword, setconfirmPassword] = useState("")
    const [picMessage, setPicMessage] = useState(null);
    const [pic, setPic] = useState(
        "https://img.icons8.com/ios/50/000000/user--v1.png"
      )
    
      
      const navigate=useNavigate();
  const dispatch=useDispatch();
  const userRegister=useSelector(state=>state.userRegister)
  const {loading,error,userInfo}=userRegister
  const submitHandler=async(e)=>{
    e.preventDefault();
    if(password !== confirmPassword){
        setMessage('Passwords didn\'t match')
      }
 
    else
    dispatch(Register(name,email,password,pic))
  }
  const postDetails = (pics)=>{
    if(!pics){
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);

    if(pics.type === 'image/jpeg' || pics.type === 'image/png'){
      const data =  new FormData();
      data.append('file',pics);
      data.append('upload_preset','NoteZipper');
      data.append('cloud_name','sunny872');
      fetch("https://api.cloudinary.com/v1_1/sunny872/image/upload",{
        method : "post",
        body: data,
      }).then((res)=>res.json())
      .then((data)=>{
        console.log(data);
        setPic(data.url.toString());
      }).catch((err)=>{
        console.log(err);
      })
    }
    else{
      return setPicMessage("Please Select an Image");
    }
  }
  useEffect(() => {
    console.log(userInfo)
    if (userInfo)
    navigate("/notes")
  }, [userInfo])
  return (
    <div className="registerContainer">
        <Row className="m-2">
            
            <Col>
            <h1>Register Here</h1>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
            <Form id="register" onSubmit={submitHandler}>
            <p>
        <Form.Group controlId="Name">
            <Form.Label>Name</Form.Label>
                <Form.Control type="name" placeholder="Enter Name" value={name}
                onChange={(e)=>{setName(e.target.value)}}/>
        </Form.Group>   
        </p>
        <p>
        <Form.Group controlId="Email">
            <Form.Label>email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email}
                onChange={(e)=>{setEmail(e.target.value)}}/>
        </Form.Group>  
        </p> 
        <p>
        <Form.Group controlId="Password">
            <Form.Label>password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" value={password}
                onChange={(e)=>{setPassword(e.target.value)}}/>
        </Form.Group>   
        </p>
        <p>
        <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="Password" placeholder="Re-enter Password" value={confirmPassword}
                onChange={(e)=>{setconfirmPassword(e.target.value)}}/>
        </Form.Group> 
        {picMessage && <ErrorMessage variant="danger">{picMessage}</ErrorMessage>}

        <Form.Group controlId="pic">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
          type="file" 
          onChange={(e)=>postDetails(e.target.files[0])} />
        </Form.Group>
        </p>
        <Button variant="primary" type="submit"> Register</Button>
        <Row className='my-2'>
              <Col>
                 New User ? <Link to="/login">Login Here</Link>
              </Col>
              
          </Row>
        </Form>
            </Col>
            <Col>
            <div className='image'>
               
               <img src="registerphoto.svg" alt="not avaliable"/>
           </div>
            </Col>
        </Row>
        
    </div>
  )
}

export default RegisterScreen