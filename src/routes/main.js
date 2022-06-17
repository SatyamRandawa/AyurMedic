const { request, response, Router } = require('express')
const express = require('express')
const { route } = require('express/lib/application')
const async = require('hbs/lib/async')
const contact = require("../models/contactUs")
const userModel = require("../models/user")


const Detail = require("../models/Detail")
const slider = require('../models/slider')



const routes = express.Router()

routes.get("/", async (req, res) => {

    const details = await Detail.findOne({"_id":"62a6c67c82531260713128b3"})
    const slides = await slider.find()
    // console.log(slides)
    //console.log(details)

    res.render("index", {
       
        Detail:details,
        slides:slides
    })
    //app.set('views', path.join(__dirname, ''));
 })


routes.get("/Specialities", async (req, res) => {
    const details = await Detail.findOne({"_id":"62a6c67c82531260713128b3"})
    res.render("Specialities",{
        Detail:details
    })
});
///////////////////////////////////////////LOGIN///////////////////////////////////////////////////////////////////////////////////

routes.get("/Login", async (req,res) => {
    const details = await Detail.findOne({"_id":"62a6c67c82531260713128b3"})
    res.render("Login",{
        Detail:details  
    })

    try{

    }catch(error){

    }
     
})

///////////////////////////////////////////USER REGISTER/////////////////////////////////////////////////////////////////////////////

routes.get("/Register", async (req,res) => {
    const details = await Detail.findOne({"_id":"62a6c67c82531260713128b3"})
    res.render("Register",{
        Detail:details  
    })

    routes.post("/Register", async (req, res) => {

        try{
            const data = req.body
            const {name, email, phone, password, repeatPassword } = data
    
            if(!name){
                 res.send({ msg:"Please enter name"})
            }
            if (!(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/).test(name))
    
             res.status(400).send({ status: false, msg: "Please use valid type of name" })
    
            if(!email){
                 res.status(400).send({status:false, msg:"Please enter email"})
    
            }
            if (!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/).test(email)) {
                 res.status(400).send({ status: false, msg: "Please provide a email in correct format" })
            }
            let duplicateEmail = await userModel.findOne({ email: email })
            if (duplicateEmail) {
                 res.status(400).send({ status: false, msg: 'You are already register, go for Login' })
            }
    
            if(!phone){
                return res.status(400).send({status:false, msg:"Please enter Phone Number"})
            }
            let duplicatePhone= await userModel.findOne({ phone: phone })
            if (duplicatePhone) {
                return res.status(400).send({ status: false, msg: 'You are already register, go for Login' })
            }
    
            if(!password){
                return res.status(400).send({status:false, msg:"Please enter password"})
            }
            if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/).test(password)) {
                return res.status(400).send({ status: false, msg: "Password is not Valid :=> Enter Password in UpperCase ,lowercase with atleast one symbol and number with min. 8 length" })
            }
    
            if(!repeatPassword){
                return res.status(400).send({status:false, msg:"Please enter Repeat password"})
            }
            if(!password === repeatPassword){
                return res.status(400).send({status:false, msg:"Your Password Is Not Same"})
    
            }
    
            let createUser = await userModel.create(data)
            //return res.status(200).send({status:true, msg:"Register Successful"})
            console.log(createUser)
            return res.redirect("/")
    
    
    
        }catch(error){
           console.log(error)
        }
        
    })

    
     
})

///////////////////////////////////////////////CONTACT US////////////////////////////////////////////////////////////////////////

routes.post("/process-contact-form",async (req, res) =>{
      console.log("this form is submitted")
      console.log(req.body)
      //let save data on DB
       try{    
        const data = await contact.create(req.body)
        console.log(data)
        return res.redirect("/")


       }catch(error){
            console.log(error)
            res.redirect("/")
       }

})






module.exports = routes