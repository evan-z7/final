const express = require ('express')
const userConrtoller =require('../controllers/user_controller')
const router =express.Router()

router.post ('/',userConrtoller.save)
router.get('/:id',userConrtoller.show) 
router.get('/',userConrtoller.allData)
router.patch('/:id',userConrtoller.updateData)
router.delete('/:id',userConrtoller.drop)


module.exports=router       