// import cors from 'cors'//use When we using [CORS] for data fetching
import express from 'express';
const app = express()

import 'express-async-errors'
import morgan from 'morgan'  //not that much useful ,It shows path of routes and statusCode in console when send http req or run routes 

import dotenv from 'dotenv'
dotenv.config()

//*use only when ready to deploy
//!1]build Production Ready Application 
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url)); //crating __dirname to hold direname fileURLToPath import

//!2]Server Security
import helmet from 'helmet';
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'

//!Cookie for token authorization
import cookieParser from 'cookie-parser';

//db connection
import connectDB from './db/connect.js';

//routes
import authRoutes from './routes/authRoutes.js'
import jobRoutes from './routes/jobRoutes.js'
//middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateUser from './middleware/auth.js';


//not that much useful ,It shows path of routes and statusCode colorfully in console when send http req or run routes 
if (process.env.NODE_ENV !== "production") {
    app.use(morgan('dev'))
}

//*use only when application is ready to deploy
//!build Production Ready Application
app.use(express.static(path.resolve(__dirname, './client/build')))

// app.use(cors())   //use When we using [CORS] for data fetching
app.use(express.json())
app.use(cookieParser()) //!Cookie for token Authorization
//!Server Security
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

// app.get('/', (req, res) => {
//     // throw new Error('Error')
//     res.json({msg:"Welcome to backend!"})
// })
app.get('/api', (req, res) => {    //When we using [proxy] for data fetching
    res.json({ msg: "Fetching using PROXY!" })
})


const port = process.env.PORT || 5000

app.use('/api/v1/user', authRoutes)
app.use('/api/v1/job', authenticateUser, jobRoutes)

//* use only when ready to deploy
//!build Production Ready Application 
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html')) //When all the defined routes on upperSide-> calls the get route, We will send it to frontEnd client->build->index.html folder ...where we have react router ...And react router do their job, to fetch and run frontEnd
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`Server Running On Port ${port} `)
        })
    } catch (err) {
        console.log(err)
    }
}

start()