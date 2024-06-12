const validator = require('fastest-validator')
const  models =require ('../../models')
const cloudinary=require('cloudinary').v2
const uploadImage=require('../cloudinary/cloudinary')


//add new data function
save =async (req,res)=>{
    const imageName = new Date().getTime().toString()
    const Photo = await uploadImage(req.file.buffer,imageName)

    
    const post ={
        discreption:req.body.discreption, 
        image:Photo.url,
        receiver: req.body.receiver,
        sender: req.body.sender,
        date:req.body.date

    } 
  
    const schema={
      discreption:{type:"string",optional:false,max:500},
      image:{type:"string",optional:false},
      receiver: { type: "number", optional: false },
      sender: { type: "number", optional: false },
      date:{type:"string",optional:false}
    }
    const v= new validator();
    const validatorResponse = v.validate(post,schema)
    if(validatorResponse !== true){
    return res.status(400).json({message:"validation faild",error:validatorResponse})
                                  }
    
    try {
          models.post.create(post)
           res.status(201).json({success:true, message:"post created succefuly!"})
          } 
    catch (error){
        res.status(400).json({success:false,message:"something wrong"})
                 }
          }    
//get data by ID function
show= (req,res)=>{
    const id= req.params.id
    try {
    models.post.findByPk(id).then(result=>{
      if(result){res.status(200).json(({success:true, data: result }))}
      else{res.status(400).json({success:false,message :"data not found"})
          }
        })
    }
    catch (error) {      
          res.status(500).json({success:false,message:"something wrong"})
                  }

  }

// get  data  by receiver
destdata = (req ,res)=>{
  try {
    const receiver = req.body.receiver; 

    if (!receiver) {
      return res.status(400).json({ success: false, message: 'Missing receiver parameter' })
    }

    const posts = models.post.findAll({ where: { receiver:receiver } }).then(result=>{
      if (result.length>0) {   res.status(200).json({ success: true, data: result })  } 
      else  {   res.status(404).json({ success: false, message: 'No data found for the provided receiver' })  }
    }) 
      }
   catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
 } 

//get all data 
allData= (req,res)=>{
    try {
    models.post.findAll().then(result=>{
      res.status(200).json(({success:true, data: result }))})
    }
    catch (error) {      
          res.status(500).json({success:false, message: "something wrong" })
    }

  }

//updating some data
updateData = async(req,res)=>{
  const imageName = new Date().getTime().toString()
  const Photo = await uploadImage(req.file.buffer,imageName)

  const id= req.params.id
  const updatedPost ={
    discreption:req.body.discreption, 
    image:Photo.url,
  
      
    date:req.body.date  
  }


  
const schema={
  discreption:{type:"string",optional:false,max:500},
  image:{type:"string",optional:true},
    date:{type:"string",optional:false}
}

const v= new validator();
const validatorResponse = v.validate(updatedPost,schema)
if(validatorResponse !== true){
return res.status(400).json({success:false,message:"validation faild",error:validatorResponse})
                              }
try {
  models.post.update(updatedPost, {where: {id:id }})
    res.status(200).json({success:true, message:"post edited succefuly!"})
} catch (error) {
    res.status(500).json({success:false,message:"something wrong"})
}
}

//delete data 
drop = (req,res)=>{
  const id= req.params.id
  try {
    models.post.destroy({where: {id:id }})
  res.status(200).json({success:true,message:"post deleted succefully"})
  } catch (error) {
    res.status(500).json({success:false,message:"something wrong"})
  }
 }


 module.exports={
    save:save,
    show:show,
    allData:allData,
    updateData:updateData,
    drop:drop,
    destdata: destdata  
    
                }