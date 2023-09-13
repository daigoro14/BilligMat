import { willys } from "./webScraping/willys"
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()


const groceriesRouter = require('./groceries').router

const app = express()
const PORT = process.env.PORT || 8080;

app.use(cors())

app.use(express.urlencoded({extended: true}))

app.use(express.json())

app.use('/groceries', groceriesRouter)

app.post("/post", (req: any, res: any) => {
  console.log(req.body.search);
  res.redirect("/");
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));

