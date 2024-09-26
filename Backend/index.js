import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRouter from "../Backend/routes/auth.js"
import employeeRouter from "./routes/employee.js"
import connectToDatabase from "./db/db.js"

connectToDatabase();
dotenv.config();
const app= express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/employees', employeeRouter);

app.listen(process.env.PORT,()=>{
    console.log(`server is running in port ${process.env.PORT}`);
    
}
)
