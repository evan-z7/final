const express = require ('express')
const postsConrtoller =require('../controllers/post_contorl')
const router =express.Router()
const {upload} = require('../utils/multerToHandelUpload')

router.post ('/',upload.single('photo'),postsConrtoller.save)
 
router.get('/:id',postsConrtoller.show) 
router.get('/',postsConrtoller.allData)
// router.patch('/:id',postsConrtoller.updateData)
router.delete('/:id',postsConrtoller.drop)


module.exports=router       