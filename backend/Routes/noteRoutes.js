const express=require("express");
const { protect } = require("../middlewares/authMiddleware");
const {getNotes,createNote,getNotebyId,deleteNote,updateNote}=require("../controllers/noteControllers");
const router=express.Router();
router.route('/').get(protect,getNotes);
router.route('/create').post(protect,createNote);
router.route('/:id').get(getNotebyId).delete(protect,deleteNote).put(protect,updateNote)
module.exports=router;