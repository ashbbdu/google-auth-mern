const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const userRouter = require("./routes/userRoutes")


const app = express()
app.use(cors())
app.use(express.json())

const PORT = 4000;

const MONGODB_URL = "mongodb://localhost:27017/Google_Auth"

app.use("/user" , userRouter)

mongoose.connect(MONGODB_URL).then(data => console.log("DB connected successfully")).catch(e => console.log("Unable to connect to DB" + e))


app.get("/" , (req , res) => {
    res.send("App is up and running")
})

app.listen(PORT , () => {
    console.log(`App is running on port ${PORT}`);
})