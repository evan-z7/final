const validator = require('fastest-validator')
const models = require('../../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const e = require('express')


//add new data function
save = (req, res) =>
{
  models.user.findOne({where:{email:req.body.email}}).then(result =>
  {
    if (result) { res.status(409).json({success:false,message: "email is already exists"}) }
    else
    {
      //hashing the password
      bcrypt.genSalt(10,(err,salt)=>
      {
        bcrypt.hash(req.body.password, salt,(err,hash)=>
        {
          const user ={
            name: req.body.name,
            email: req.body.email,
            password: hash,
            position: req.body.position,
            number: req.body.number,
                      }  
          const schema = {
            name: { type: "string", optional: false, max: 100 },
            email: {type: "email", optional: false, max: 100 },
            password: { type: "string" , optional: false, min : 8 },
            number: { type: "string", optional: false, length:10 },
            position: { type: "string", optional: false, max: 100 }
                         }
          const v = new validator();
          const validatorResponse = v.validate(user, schema)
          if (validatorResponse !== true) {return res.status(400).json({ message: "validation faild", error: validatorResponse }) }
          try {
            models.user.create(user)
            res.status(201).json({success:true, message: "user created succefuly!" })
              }
          catch (error) {
            res.status(400).json({ success:false,message: "something wrong" })
                        }
        } )
      })
    }
  })
}

//get data by ID function
show = (req, res) => {
  const id = req.params.id
  try {
    models.user.findByPk(id).then(result => {
      if (result) { res.status(200).json(result) }
      else {
        res.status(400).json({success:true, message: "data not found" })
      }
    })
  }
  catch (error) {
    res.status(500).json({ success:false,message: "something wrong" })
  }

}

//get all data 
allData = (req, res) => {
  try {
    models.user.findAll().then(result => {
      
      res.status(200).json(({success:true, data: result }))
    })
  }
  catch (error) {
    res.status(500).json({success:false, message: "something wrong" })
  }

}
 

//updating some data
updateData = (req, res) => {


  const id = req.params.id
  const updateduser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    position: req.body.position,
    number: req.body.number,
  }

  const schema = {
    name: { type: "string", optional: false, max: 100 },
    email: { type: "email", optional: true, max: 100,},
    password: { type: "string", optional: true, min: 8},
    number: { type: "string", optional: false, length: 10 },
    position: { type: "string", optional: false, max: 100 },

  }

  const v = new validator();
  const validatorResponse = v.validate(updateduser, schema)
  if (validatorResponse !== true) {
    return res.status(400).json({ message: "validation faild", error: validatorResponse })
  }
  try {
    models.user.update(updateduser, { where: { id: id } })
    res.status(200).json({success:true, message: "post updated succefully" })
  } catch (error) {
    res.status(500).json({success:false, message: "something wrong", errors: error })
  }
}

//delete data 
drop = (req, res) => {
  const id = req.params.id
  try {
    models.user.destroy({ where: { id: id } })
    res.status(200).json({ success:true,message: "users deleted succefully" })
  } catch (error) {
    res.status(500).json({success:false, message: "something wrong", errors: error })
  }
}

//login
 login=(req,res)=>{
  try{
  models.user.findOne({where:{email:req.body.email}}).then(user =>
    {
      if(user === null){
          res.status(401).json(
            { success:false,message: "no email!!" }
          )}
          else{
            bcrypt.compare(req.body.password,user.password,(err, result)=>{
              if(result)
              {
                const token =jwt.sign(
                  {
                  email:user.email,
                  userId:user.id
                  },
                'secret', (err,token)=>{
                  res.status(200).json({success:true, message: "Authentication successful!",token:token })
                })
              }
              else{res.status(401).json({success:false,message: "Authentication faild!" })
                  }
            })
          }
    })}
    catch (error) {
      res.status(500).json({success:false, message: "something wrong" })
    }
 }


module.exports = {
  save: save,
  show: show,
  allData: allData,
  updateData: updateData,
  drop: drop,
  login:login
}