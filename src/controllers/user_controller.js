const validator = require('fastest-validator')
const validates = require('validator')
const models = require('../../models')

//add new data function
save = (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    position: req.body.position,
    number: req.body.number,
  }  

  const schema = {
    name: { type: "string", optional: false, max: "100" },
    email: {
      type: "string", optional: true, max: "100",
      validator(value) { if (!validator.isEmail(value)) { throw new Error('email is invalid') } }
    },
    password: { type: "string", optional: true, minLength: 8, validate(value) { if (value.includes('password')) { throw new Error('password is invalid') } } },
    number: { type: "string", optional: false, max: "100" },
    position: { type: "string", optional: false, max: "100" }
  }
  const v = new validator();
  const validatorResponse = v.validate(user, schema)
  if (validatorResponse !== true) {
    return res.status(400).json({ message: "validation faild", error: validatorResponse })
  }
 
  try {
    models.user.create(user)
    res.status(201).json({success:true, message: "user created succefuly!" })
  }
  catch (error) {
    res.status(400).json({ success:false,message: "something wrong" })
  }
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
    name: { type: "string", optional: false, max: "100" },
    email: {
      type: "string", optional: false, max: "100",
      validate(value) { if (!validator.isEmail(value)) { throw new Error('email is invalid') } }
    },
    password: { type: "string", optional: false, minLength: 8, validate(value) { if (value.includes('password')) { throw new Error('password is invalid') } } },
    position: { type: "string", optional: false, max: "100" },
    number: { type: "number", optional: false, max: "100" }

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


module.exports = {
  save: save,
  show: show,
  allData: allData,
  updateData: updateData,
  drop: drop
}