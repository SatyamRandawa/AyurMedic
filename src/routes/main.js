const { request, response, Router } = require('express')
const express = require('express')
const { route, render } = require('express/lib/application')
const async = require('hbs/lib/async')
const contact = require("../models/contactUs")
const userModel = require("../models/user")
const jwt = require('jsonwebtoken')
const app = express();

const Detail = require("../models/Detail")
const slider = require('../models/slider')



const routes = express.Router()

routes.get("/", async (req, res) => {

    const details = await Detail.findOne({ "_id": "62a6c67c82531260713128b3" })
    const slides = await slider.find()
    // console.log(slides)
    //console.log(details)

    res.render("index", {

        Detail: details,
        slides: slides
    })
    //app.set('views', path.join(__dirname, ''));
})


routes.get("/Specialities", async (req, res) => {
    const details = await Detail.findOne({ "_id": "62a6c67c82531260713128b3" })
    res.render("Specialities", {
        Detail: details
    })
});

routes.get("/doctors", async (req, res) => {
    const details = await Detail.findOne({ "_id": "62a6c67c82531260713128b3" })
    res.render("doctors", {
        Detail: details
    })
});


routes.get("/yoga", async (req, res) => {
    const details = await Detail.findOne({ "_id": "62a6c67c82531260713128b3" })
    res.render("yoga", {
        Detail: details
    })
})
///////////////////////////////////////////LOGIN///////////////////////////////////////////////////////////////////////////////////

routes.get("/Login", async (req, res) => {
    const details = await Detail.findOne({ "_id": "62a6c67c82531260713128b3" })
    res.render("Login", {
        Detail: details
    })
})

    routes.post("/Login", async (req, res) => {
        try {
            if (!req.body.email) {
                return res.send("Please enter email for Login")
            }
            if (!req.body.password) {
                return req.send("Please enter password")
            }

            let checkEmail = await userModel.findOne({ email: req.body.email })
            
            if (!checkEmail) {
                return res.send("Email Id is not valid, If you not do registration,do so go to egistration page and do registration ")
            }

            if (checkEmail.password !== req.body.password) {
                return res.send("Please enter valid Password")
            }

            let generateToken = jwt.sign({userId:checkEmail._id, Email:req.body.email, phone:checkEmail.phone}, "AyurMedic1998")
            updatetoken = await userModel.findOneAndUpdate({email:req.body.email},{token:generateToken})
            console.log(updatetoken)

            if(updatetoken){
            return res.render('index',{title:"data",data:updatetoken })
            //return res.redirect("/")
            }
              
        


        } catch (error) {
            console.log(error)

        }
    })


// module.exports.checkEmail = this.checkEmail



routes.get("/alert", async (req, res) => {
    res.render("alert")
})

///////////////////////////////////////////USER REGISTER/////////////////////////////////////////////////////////////////////////////

routes.get("/Register", async (req, res) => {
    const details = await Detail.findOne({ "_id": "62a6c67c82531260713128b3" })
    res.render("Register", {
        Detail: details
    })

    routes.post("/Register", async (req, res) => {

        try {
            const data = req.body
            const { name, email, phone, password, repeatPassword } = data

            if (!name) {
                res.send({ msg: "Please enter name" })
                // return res.redirect("/alert")

            }
            if (!(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/).test(name))

                res.status(400).send({ status: false, msg: "Please use valid type of name" })

            if (!email) {
                res.status(400).send({ status: false, msg: "Please enter email" })

            }
            if (!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/).test(email)) {
                res.status(400).send({ status: false, msg: "Please provide a email in correct format" })
            }
            let duplicateEmail = await userModel.findOne({ email: email })
            if (duplicateEmail) {
                res.status(400).send({ status: false, msg: 'You are already register, go for Login' })
            }

            if (!phone) {
                return res.status(400).send({ status: false, msg: "Please enter Phone Number" })
            }
            let duplicatePhone = await userModel.findOne({ phone: phone })
            if (duplicatePhone) {
                return res.status(400).send({ status: false, msg: 'You are already register, go for Login' })
            }

            if (!password) {
                return res.status(400).send({ status: false, msg: "Please enter password" })
            }
            if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/).test(password)) {
                return res.status(400).send({ status: false, msg: "Password is not Valid :=> Enter Password in UpperCase ,lowercase with atleast one symbol and number with min. 8 length" })
            }

            if (!repeatPassword) {
                return res.status(400).send({ status: false, msg: "Please enter Repeat password" })
            }
            if (password !== repeatPassword) {
                return res.status(400).send({ status: false, msg: "Your Password Is Not Same" })

            }

            let createUser = await userModel.create(data)
            //return res.status(200).send({status:true, msg:"Register Successful"})
            console.log(createUser)
            return res.redirect("/Login")



        } catch (error) {
            console.log(error)
        }
 
    })



})

///////////////////////////////////////////////CONTACT US////////////////////////////////////////////////////////////////////////

routes.post("/process-contact-form", async (req, res) => {
    console.log("this form is submitted")

    //console.log(req.body.Message)
    //let save data on DB
    try {
        const data = await contact.create(req.body)
        console.log(data)
        return res.redirect("/")


    } catch (error) {
        console.log(error)
        res.redirect("/")
    }

})


///////////////////////////////////////////////////PROFILE PAGE///////////////////////////////////////////////////////////////////////

routes.get("/profile", async (req, res) => {
    const details = await Detail.findOne({ "_id": "62a6c67c82531260713128b3" })
    res.render("profile", {
        Detail: details

    })
    routes.get("/ABC" ,async (req, res) =>{

    let findDATA = await userModel.findOne()

    })
});






module.exports = routes