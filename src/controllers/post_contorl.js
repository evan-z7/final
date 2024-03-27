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
        destination:req.body.destination ,
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
 
  //first try
  // destData=(req,res)=>{
  //   try {
  //     models.post.findAll({where:{destination:'server'}}).then(result=>{
  //       res.status(200).json(({success:true, data: result }))})
  //     }
  //     catch (error) {      
  //           res.status(500).json({success:false, message: "something wrong" })
  //     }
  //   }
  
  /*
  second try
async function findByName(destination) {
  try {
    const record = await post.findOne({
      where: {
        destination: destination ,
      },
    });

    if (record) {
      console.log('Found record:', record.dataValues); // Access data using dataValues
    } else {
      console.log('No record found with the name:', destination);
    }
  } catch (error) {
    console.error('Error finding record:', error);
  }
}
  */



 

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
    // destData:destData
  
    
                }