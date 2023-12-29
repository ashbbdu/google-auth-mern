const express = require("express")
const { signup, signin } = require("../controllers/User")
const router = express.Router()


router.post("/create-user" , signup)
router.post("/signin" , signin)

module.exports = router;