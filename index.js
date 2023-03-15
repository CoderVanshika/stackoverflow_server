import express from 'express'
import mongoose, { mongo } from 'mongoose'

import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/users.mjs'
import questionRoutes from './routes/Questions.mjs'
import answerRoutes from './routes/Answers.mjs'
import otpRoutes from './routes/otp.mjs'
import paymentRoutes from './routes/Payment.mjs'
import communityRoutes from './routes/Post.mjs'
import commentRoutes from './routes/Comments.mjs'
import { databaseReset } from './databasereset/databasereset.js'


const app = express();
dotenv.config();
app.use(express.json({limit:"30mb", extended: true}))
app.use(express.urlencoded({limit:"30mb",extended: true}))
app.use(cors());

app.get('/',(req,res) => {
    res.send("This is a stack overflow clone API")
})


app.use('/user',userRoutes)
app.use('/questions', questionRoutes)
app.use('/answer', answerRoutes)
app.use('/otpverify', otpRoutes)
app.use('/userplan', paymentRoutes)
app.use('/community',communityRoutes)
app.use('/comment',commentRoutes)

const PORT = process.env.PORT || 5000

//const CONNECTION_URL="mongodb+srv://admin:admin@stack-overflow-clone.yxzku6h.mongodb.net/?retryWrites=true&w=majority"

//const DATABASE_URL = "mongodb+srv://admin:admin@stack-overflow-clone.yxzku6h.mongodb.net/test?retryWrites=true&w=majority"
mongoose.set("strictQuery",true)
mongoose.connect(process.env.CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true})
 .then(() => app.listen(PORT, () => 
    {console.log(`server running on port ${PORT}`)
    databaseReset()
 }
 ))

 .catch((err) => console.log(err))
