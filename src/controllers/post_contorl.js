const validator = require('fastest-validator')
const  models =require ('../../models')
const cloudinary=require('cloudinary').v2


//add new data function
  save =async (req,res)=>{
    const Photo = await cloudinary.uploader.upload(req.file.path,
      { public_id: `profilePics/${req.file.filename}` }, 
          function (error, result) {
              if (error) { 
                 return next(error)
              }
                  console.log(result);
              });
    const post ={
        discreption:req.body.discreption, 
        image:Photo.url,
        destination:req.body.destination  ,
        date:req.body.date

    }

    const schema={
      discreption:{type:"string",optional:false,max:"500"},
      image:{type:"string",optional:false},
      destination:{type:"string",optional:false,max:"100"},
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
      if(result){res.status(200).json(result)}
      else{res.status(400).json({success:false,message :"data not found"})
          }
        })
    }
    catch (error) {      
          res.status(500).json({success:false,message:"something wrong"})
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
// updateData = (req,res)=>{


//   const id= req.params.id
//   const updatedPost ={
//     title:req.body.title, 
//     content:req.body.content,
//     imageUrl: req.body.imageUrl,
//     categoryId:req.body.categoryId
//   }

// const userId =1

  
// const schema={
//   title:{type:"string",optional:false,max:"100"},
//   content:{type:"string",optional:false,max:"500"},
//   categoryId:{type:"number",optional:false}
// }

// const v= new validator();
// const validatorResponse = v.validate(updatedPost,schema)
// if(validatorResponse !== true){
// return res.status(400).json({message:"validation faild",error:validatorResponse})
//                               }
// try {
//   models.post.update(updatedPost, {where: {id:id , userId:userId}})
//     res.status(200).json({message:"post updated succefully" })
// } catch (error) {
//     res.status(500).json({message:"something wrong"})
// }
// }

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
    // updateData:updateData,
    drop:drop,
  
    
                }