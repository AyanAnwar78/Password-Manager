import express from "express";
import 'dotenv/config';
import connectDb from "./Connections/connectDb.js"
import { FortressKey } from "./models/Schema.js"
import { v4 as uuidv4 } from 'uuid'
import cors from "cors";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET","POST","PUT","DELETE"]
}));

// connect DB
connectDb();


// get the password
app.get("/", async (req, res) => {
    const data = await FortressKey.find()
    res.json(data)
})
// create the data
.post("/", async (req, res) => {
    try {
        await FortressKey.create({
            id: uuidv4(),
            siteURL: req.body.siteURL,
            username: req.body.username,
            password: req.body.password
        })
        res.status(201).json({ create: true });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
// update the data
.put("/", async(req,res)=>{
    try {
        const data = await FortressKey.findOneAndUpdate(            
            {   id: req.body.id   },            
            {
                siteURL: req.body.siteURL,
                username: req.body.username,
                password: req.body.password
            }
        )
        if(!data){
            res.status(404).json({message: "Entry not found"});
        }
        res.status(200).json({update: true});
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
// delete the data
.delete("/", async(req,res)=>{
    try {
        const data = await FortressKey.deleteOne({ id: req.body.id });

        if(result.deletedCount === 0){
            return res.status(404).json({message: "Entry not found"});
        }
        if(!data){
            res.status(400).json({message: "Entry is not found!"});
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

app.listen(port, () => console.log(`server: ${port}`));