require("dotenv").config()
const mongoose = require("mongoose")


const conncetToDb = () => {
    mongoose.connect(process.env.URL).then(() => console.log("mongoose connected ")).catch(()=>console.log("error connecteing to mongodb"))
}


module.exports = conncetToDb


