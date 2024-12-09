import express from 'express';
import {PORT, mongoDBURL} from './config.js';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/taskRoute.js';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/', router);

mongoose.connect(mongoDBURL)
.then(()=>{
    console.log("Connected with database");
    app.listen(PORT, ()=>{
        console.log("App started at Port", PORT);
    })
})
.catch(error=>{
    console.log("Failed to connect with the database", error);
})
