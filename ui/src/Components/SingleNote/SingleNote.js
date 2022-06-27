import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import {useEffect,useState} from "react";
import {Card, Form,Row,Col,Button } from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import ReactMarkdown from 'react-markdown'
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { updateNoteAction } from '../../Actions/notesActions';
import MainTitle from "../MainTitle/MainTitle"
import Loading from "../Loading/Loading"
function SingleNote({match}) {
    
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [category, setCategory] = useState("")
    const {id}=useParams();
    const dispatch=useDispatch()
   const navigate=useNavigate()
   const token=localStorage.getItem("userInfo");
   
   const noteUpdate = useSelector((state)=>state.noteUpdate);
   let { success:successUpdate }=noteUpdate;
   const {loading,error}=noteUpdate;
   const resetHandler=()=>{
    setCategory("");
    setContent("");
    setTitle("");
}
useEffect(() => {
  const fetching = async()=>{
   
    const {data}= await axios.get(`/api/notes/${id}`);
    console.log(id)
    setTitle(data.title);
    setContent(data.content);
    setCategory(data.category);
    
}

fetching();
}, [id]);

  const submitHandler=(e)=>{
        e.preventDefault();
        if (!title || !category || !content)
        return ;
       dispatch(updateNoteAction(id,title,content,category))
      resetHandler()
      navigate("/notes")
      }
      
      return (
        <MainTitle title="Edit Note">
        <Card>
            <Card.Header>
            Edit your Note
            </Card.Header>
            <Card.Body>
            <Form onSubmit={submitHandler}>
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                type="text" value={title} placeholder="Enter the Title"
                onChange={(e)=>setTitle(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control
                type="textarea" value={content} placeholder="Enter the Content"
                onChange={(e)=>setContent(e.target.value)}></Form.Control>
                </Form.Group>

                {content && (
                <Card>
                    <Card.Header>
                    Note Preview
                    </Card.Header>
                    <Card.Body>
                    <ReactMarkdown>{content}</ReactMarkdown>
                    </Card.Body>
                </Card>
                )}

                <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                type="text" value={category} placeholder="Enter the Category"
                onChange={(e)=>setCategory(e.target.value)}></Form.Control>
                </Form.Group>

                {loading && <Loading />}
                <Button type="submit" variant="primary">
                Update Note
                </Button>
                <Button className="mx-2" variant="danger" onClick={resetHandler}>
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
};
export default SingleNote