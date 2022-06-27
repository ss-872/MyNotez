import React from 'react'
import axios from "axios"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card,Form,Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createNoteAction } from '../../Actions/notesActions'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Loading from '../Loading/Loading'
import ReactMarkdown from 'react-markdown'
import MainTitle from '../MainTitle/MainTitle'
function CreateNote() {
    const [notes, setnotes] = useState([])
    const [Title, setTitle] = useState()
    const [Content, setContent] = useState()
    const [Category, setCategory] = useState()
    const [Change, setChange] = useState(0)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const noteCreate=useSelector((state)=>state.noteCreate)
    const {loading,error,note}=noteCreate
    const resetHandler=()=>{
      setTitle("");
      setContent("");
      setCategory("");
    }

    const token=localStorage.getItem("userInfo");
    const submitHandler=async(e)=>{
        e.preventDefault()
        if (!Title || !Content || !Category) return
        console.log(Title)
        dispatch(createNoteAction(Title,Content,Category));
        resetHandler();
        navigate("/notes")
        
        
       
      }
       
      
  return (
    <MainTitle title="Create a Note">
       <Card>
        <Card.Header>
          Create a new Note
        </Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
              type="text" value={Title} placeholder="Enter the Title"
              onChange={(e)=>setTitle(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
              type="textarea" value={Content} placeholder="Enter the Content"
              onChange={(e)=>setContent(e.target.value)}></Form.Control>
            </Form.Group>

            {Content && (
              <Card>
                <Card.Header>
                  Note Preview
                </Card.Header>
                <Card.Body>
                  <ReactMarkdown>{Content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
              type="text" value={Category} placeholder="Enter the Category"
              onChange={(e)=>setCategory(e.target.value)}></Form.Control>
            </Form.Group>

            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create Note
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
              Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>

    </MainTitle>

  
  )
}

export default CreateNote