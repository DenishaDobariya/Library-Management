import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import './db.js'
import {AdminRouter} from "./routes/auth.js"
import { studentRouter } from './routes/student.js'
import { bookRouter } from './routes/book.js'
import { Book } from './models/Book.model.js'
import { Students } from './models/Student.model.js'
import { Admins } from './models/Admin.model.js'

const app = express()

const PORT = process.env.PORT ;

app.use(express.json())
app.use(cors(
   { origin: 'http://localhost:5173', 
    credentials: true,}
))
app.use(cookieParser())
dotenv.config()
app.use('/auth', AdminRouter)
app.use('/student', studentRouter)
app.use('/book', bookRouter)

app.get('/dashbord', async (req , res) => {
    try {
        const student = await Students.countDocuments()
        const book = await Book.countDocuments()
        const admin = await Admins.countDocuments()
        return res.json({ok: true , student, book, admin})
    } catch (error) {
        return res.json(err)
    }
})

app.listen(PORT, (err) => {
    if(err) {
        console.log(err);
    }
    console.log(`server is Running on ${process.env.PORT}`);
})