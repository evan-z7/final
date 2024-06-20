const express = require ('express')
const postsConrtoller =require('../controllers/post_contorl')
const router =express.Router()
const {upload} = require('../utils/multerToHandelUpload')

router.post ('/',upload.single('image'),postsConrtoller.save)
 
router.get('/:id',postsConrtoller.show) 
router.get('/',postsConrtoller.allData)
router.patch('/:id',upload.single('image'),postsConrtoller.updateData)
router.delete('/:id',postsConrtoller.drop)
router.get('/destination/search',postsConrtoller.destdata)
router.get('/users/names', postsConrtoller.UsersNames)


module.exports=router       
