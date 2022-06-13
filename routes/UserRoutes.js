const express = require("express")
const {UserProtect, protect} = require("../Authorization/Auhorization")
const router = express.Router()
const { userSignUp, loginUser, userPurchased, userOrdersList } = require("../controllers/Usercontrollers")


router.route("/").post(userSignUp)
router.route("/login").post(loginUser)
router.route("/purchase").post(protect,userPurchased)
router.route("/userOrdres").get(protect,userOrdersList)


module.exports = router