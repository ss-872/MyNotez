import React from 'react'
import {useEffect,useState} from "react";
import axios from "axios"
import {Link, useNavigate} from "react-router-dom"
import {Badge, Button, Card} from 'react-bootstrap'
import {useDispatch,useSelector} from "react-redux"
import { deleteNoteAction, listNotes } from '../../Actions/notesActions';
import MainTitle from "../MainTitle/MainTitle"
import Loading from "../Loading/Loading"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
function MyNotes() {
  const dispatch=useDispatch()
  const noteList=useSelector(state=>state.noteList)
  const {loading,notes,error}=noteList
    // const [notes, setnotes] = useState([])
    const [title, settitle] = useState()
    const [content, setcontent] = useState()
    const [category, setcategory] = useState()
    const [Change, setChange] = useState(0)
    const token=localStorage.getItem("userInfo");
    const userLogin = useSelector(state=>state.userLogin);
    const noteCreate = useSelector(state=>state.noteCreate);
    const {success:successCreate}=noteCreate
  const {userInfo}=userLogin;
  const noteDelete = useSelector((state)=>state.noteDelete);
  const {loading:loadingDelete,success:successDelete,error:errorDelete}=noteDelete;
 
  const noteUpdate = useSelector((state)=>state.noteUpdate);
  let { success:successUpdate }=noteUpdate;
  const deleteHandler=(id)=>{
      if (window.confirm("Are you sure?")){
        dispatch(deleteNoteAction(id))
      }
   
        
    }
  
   
    useEffect(() => {
      dispatch(listNotes())
      if (!userInfo)
      navigate("/")
      }, [dispatch,successCreate,userInfo,successDelete,successUpdate]);
  
    const navigate=useNavigate()
    
    return (
      <MainTitle title={`Welcome back ${userInfo.name}.. `}>
      <div>
        <Link to='/createnote'>
        <Button  className="button m-4" style={{"align-items":"center"}}>
          Create New Note
        </Button>
      </Link>
      {errorDelete && <ErrorMessage variant='danger'>{errorDelete}</ErrorMessage>}
      {successDelete && <ErrorMessage variant='success'>Deleted note Successfully</ErrorMessage>}
      {/* {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>} */}
      {successCreate && <ErrorMessage variant='success'>Created a note Successfully</ErrorMessage>}
      {loading && <Loading/>}
      {
      notes?.reverse().map((note,index)=>(
        <Card className="card" key={index}>
          <Card.Header className='cardheader'>
            <h4 className='cardtitle m-2'>{note.title}</h4>
            <div>
            <Button href={`/note/${note._id}`}>Edit Note</Button>
            <Button variant="danger" className='mx-4 sm' onClick={()=>deleteHandler(note._id)}>Delete Note</Button>
            </div>
          </Card.Header>
          <Card.Body>
            <h4> 
              <Badge bg="success">
                category-{note.category}
              </Badge>  
            </h4>
            <blockquote className='blockquote mb-0'>
                <p>
                  {note.content}
                </p>
                <footer className='blockquote-footer'>
                    Created On {" "}
                    Created On {" "}
                      <cite title="Source Title">
                        {note.createdAt.substring(0,10)}
                      </cite>
                </footer>
            </blockquote>
          </Card.Body>

        </Card>
      ))
      }

       
        
        
      </div>
      </MainTitle>
    );
  }

export default MyNotes