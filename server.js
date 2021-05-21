const express = require('express')
const app = express()
const server = require('http').createServer(app)
const next = require('next')

const dev = process.env.NODE_ENV!=='production'
const nextApp = next({dev})
const handle = nextApp.getRequestHandler();

require('dotenv').config({path : './config.env' });
const connectDb = require('./utilsServer/connectDb')
const port = process.env.PORT || 3000;
connectDb();

nextApp.prepare().then(()=>{  
    app.all("*",(req,res) => handle(req,res));
    
    server.listen(port,err=>{
        if(err)
            throw err;
        console.log(`Server is running on ${port}`);
    });
});