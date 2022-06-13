const User = require("../modal/usermodel")
const {generateTocken} = require("../tocken/generateTocken")

const userSignUp = async (req,res) => {

    const user = await User(req.body)
    if(user.length){
        res.status(400).json({message:"User Already Exists "})
    }else{
        try{
            let insertData = await User(req.body)
            const result = await insertData.save()
            const tocken = await generateTocken(result._id)
            res.status(200).json({message:"SignUp SuccessFull",result,tocken})
        }catch(error){
            console.log("error",error)
        }
    }
}



const loginUser = async (req,res) => {
    let user = await User.findOne({email:req.body.email})
    if(user){
        let comparedResult = await user.matchPassword(req.body.password)
        if(comparedResult){
            let tocken = await generateTocken(user._id)
            res.status(200).json({message:"Login SuccessFull",result:user,tocken})
        }else{
            res.status(400).json({message:"Password does Not MAtch"})
        }
    }else{
        res.status(400).json({message:"User Not Found "})
    }
}



const userPurchased = async (req,res) => {
    try{
        let purchasedProduct = await User.updateOne({_id:req.user._id},{$push:{orders:req.body}}) 
        res.status(200).json({message:"SuccessFully Updated",result:purchasedProduct})
        
    }catch(error){
        res.json({message:"unable to buy the Product"})
    }
}


const userOrdersList = async (req,res) => {
    try{
        let data = await User.findById({_id:req.user._id})
        res.status(200).json({message:"SuccessFully Retrived The Data",result:data})
    }catch(error){
        res.json({message:"Unable  to Retrive The Data"})
    }
}



module.exports = {userSignUp, loginUser, userPurchased, userOrdersList}