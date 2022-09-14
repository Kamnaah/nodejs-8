const express = require('express')
const mongoose=require('mongoose')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
const studentArray=require("./InitialData");
let newId=studentArray.length+1;

app.get("/api/student",(req,res)=>{
    try{
        res.json({
            status:"sucess",
            studentArray
        })
    }catch(e){
        res.status(400).json({
            status:"Failure",
            message:e.message
        })
    }
})


app.get("/api/student/:id",(req,res)=>{
    try{
        const idx=studentArray.findIndex(obj=>obj.id== req.params.id);
        if(idx==-1){
            return res.status(400).json({
                status:"failure",
                message: "invalid Id "
            })
        }
        res.json({
            status:"sucess",
            data: studentArray[idx]
        })
    }catch(e){
        res.status(400).json({
            status:"Failure",
            message:e.message
        })
    }
})

app.post("/api/student",(req,res)=>{
    try{
        if(!req.body.name||!req.body.currentClass||!req.body.division){
            return res.status(400).json({
                status:"failed",
                message:"incomplete data"
            })
        }
        studentArray.push({
            id:newId,
            name:req.body.name,
            currentClass:req.body.currentClass,
            division:req.body.division
        });
        newId++;
        res.json({
            status:"sucess",
            id:newId
        })
    }catch(e){
        res.status(400).json({
            status:"Failure",
            message:e.message
        })
    }
})


app.put("/api/student/:id",(req,res)=>{
    try{
        const idx=studentArray.findIndex(obj=>obj.id== req.params.id);
        if(idx==-1){
            return res.status(400).json({
                status:"failure",
                message: "invalid Id "
            })
        }
        if(req.body.name){
            studentArray[idx].name=req.body.name;
        }
        if(req.body.currentClass){
            studentArray[idx].currentClass=req.body.currentClass;
        }
        if(req.body.division){
            studentArray[idx].division=req.body.division;
        }
        res.json({
            status:"sucess",
            data: studentArray[idx]
        })
    }catch(e){
        res.status(400).json({
            status:"Failure",
            message:e.message
        })
    }
})

app.delete("/api/student/:id",(req,res)=>{
    try{
        const idx=studentArray.findIndex(obj=>obj.id== req.params.id);
        if(idx==-1){
            return res.status(400).json({
                status:"failure",
                message: "invalid Id "
            })
        }
        studentArray.splice(idx,1)
        res.json({
            status:"success",
           message:"record deleted"
        })
    }catch(e){
        res.status(404).json({
            status:"Failure",
            message:e.message
        })
    }
})


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   