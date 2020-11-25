const express = require('express')
const app = express()
const fs = require('fs')
const { exec } = require("child_process");

const f_data = fs.readFileSync('./datalist','utf8')
const data = f_data.trim().split('\n')

const PATH = './public/'
const UNLABELED_PATH = PATH+'Unlabeled/'

async function moveFile(filename,clas,res){
    let old = UNLABELED_PATH+filename

    let new_ = `${PATH}${clas}/${filename}`;
    
    // console.log("old", old)
    // console.log("new",new_)

    fs.rename(old,new_,()=>{
        res.sendStatus(200)
    })
}

app.post('/postRes/:img/:cat', (req,res) =>{
    // console.log(req)
    // console.log(req.params)
    // console.log(req.params.img)
    // console.log(req.params.cat)
    moveFile(req.params.img,req.params.cat,res)
})

app.get('/getSample',(req,res)=>{
    if(data.length > 0)
        res.send({img:data.pop()})
    else
        res.status(404).send({err:"no files left"})
})

app.use(express.static(PATH))

app.listen(80)
