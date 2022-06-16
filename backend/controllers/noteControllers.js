const Note=require("../models/notesModel");
const asyncHandler=require('express-async-Handler');
const getNotes=asyncHandler(async(req,res)=>{
    const notes=await Note.find({user:req.user._id});
    res.json(notes)
    return;
})

const createNote=asyncHandler(async(req,res)=>{
    if (!req.body){
        return
    }
    const {title,content,category}=req.body;
   
    if (!title || !content || !category){
        throw new Error("Please Fill all the Fields");
        return ;
    }
    else{
        const note = new Note({ user: req.user._id, title, content, category });

    const createdNote = await note.save();

    res.status(201).json(createdNote);
        // const user=req.user._id;
        // const user=req.user._id;
        // const note=new Note({title,content,category});
        // const createdNote=await note.save(createNote);
        // console.log(createdNote)
        // res.json(createdNote)
        return ;
    }
})
const getNotebyId=asyncHandler(async(req,res)=>{
    const note=await Note.findById(req.params.id);
    if (note){
        res.json(note);
        return ;
    }
    else{
        console.log("Note not found");
        return ;
    }
  
})
const deleteNote=asyncHandler(async(req,res)=>{
    const note=await Note.findById(req.params.id);
    if (!note){
        res.status(404);
        console.log("Note not found");
    }
    if (note){
        await note.remove();
        res.json({message:"Note Removed"});
    }
    else{
        res.status(404);
        console.log("Error in deleting");
    }
})
const updateNote=asyncHandler(async(req,res)=>{
    if (!req.body){
        return ;
    }
    const {title,content,category}=req.body;
    
    const note=await Note.findById(req.params.id);
    if (note){
        note.title=title;
        note.content=content;
        note.category=category;
        const updatedNote=await note.save();
        res.json(updatedNote); 
    }
    else{
        res.status(404);
        console.log("Note not found")
    }
})
module.exports={getNotes,createNote,getNotebyId,deleteNote,updateNote};