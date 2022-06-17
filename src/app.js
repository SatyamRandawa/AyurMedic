const bodyParser = require('body-parser');
const express = require('express')
const hbs = require("hbs");
const { default: mongoose } = require('mongoose');
const app = express();
const routes = require("../src/routes/main")
//const bodyParser = require('body-parser')
const Detail = require("./models/Detail")
const slider = require("./models/slider")
const port = process.env.PORT || 8000;

//static/CSS/StyleSheet.CSS
app.use(bodyParser.urlencoded({
    extended:true
}))

app.use('/static', express.static("public"))
app.use('', routes)









app.get("/", (req, res) => {
    res.send("hello")
})

app.set('view engine', 'hbs')
app.set("views", "views")
hbs.registerPartials("views/partials")

mongoose.connect("mongodb+srv://SatyamRandawa:Loveyam@cluster0.s50dt.mongodb.net/AyurDoc?retryWrites=true&w=majority", () => {
    console.log("DB connected");

    // slider.create([
    //     {
    //         title: "Consult Ayurveda Doctors With AyuDoc",
    //         subTitle: "Motto of AyurDoc is : SWASTHASYA SYASTHYA RAKSHANAM, AATURASHCHA VIKAR PRASHAMANAM”, means: “Preservation to health of healthy person and treating ailments with breaking causative factors of pathogenesis”.",
    //         imageUrl: "/static/images/874.jpg"
    //     },
    //     {
    //         title: "Consult Ayurveda Doctors With AyuDoc",
    //         subTitle: "Motto of AyurDoc is : SWASTHASYA SYASTHYA RAKSHANAM, AATURASHCHA VIKAR PRASHAMANAM”, means: “Preservation to health of healthy person and treating ailments with breaking causative factors of pathogenesis”.",
    //         imageUrl: "/static/images/pic1.jpg"
    //     },
    //        {
    //         title: "Consult Ayurveda Doctors With AyuDoc",
    //         subTitle: "Motto of AyurDoc is : SWASTHASYA SYASTHYA RAKSHANAM, AATURASHCHA VIKAR PRASHAMANAM”, means: “Preservation to health of healthy person and treating ailments with breaking causative factors of pathogenesis”.",
    //         imageUrl: "/static/images/pic2.jpg"
    //     }

    // ])


    // Detail.create({
    //     brandName:"AyurDoc",
    //     brandIconUrl:"",
    //     links:[
    //         {
    //             label:"Home",
    //             url:"/"
    //         },
    //         {
    //             label:"Ayu Products",
    //             url:"/Products"
    //         },
    //         {
    //         label:"Yoga Classes",
    //         url:"/yogaClasses"
    //         },

    //         {
    //             label:"Contact Us",
    //             url:"/contact"
    //         },
    //         {
    //             label:"Specialities",
    //             url:"/Specialities"
    //         },
    //         {
    //             label:"Ayu Doctors ",
    //             url:"/Ayu Doctors "
    //         },
    //         {
    //             label:"Login",
    //             url:"/Login "
    //         },
                

    //     ]

    // })
})


// app.listen(process.env.PORT | 4000, () => {
//     console.log("server is running at 4000");
// })

app.listen(port, () => {
    console.log(`server connected on ${port}`);
})