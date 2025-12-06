import express from "express";
import cors from "cors"

import authRoute from "./authenticate/authRoute.js"

const app = express()

app.use(express.json())
app.use(cors({origin: true}))

app.use("/authenticate", authRoute)

app.listen(3000)