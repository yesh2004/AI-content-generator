const cors = require('cors')
const express=require("express")
const bodyParser=require("body-parser")
const bcrypt=require("bcryptjs")
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { GoogleGenerativeAI} = require("@google/generative-ai");
const {User,Project} =require("./models")
dotenv.config();
const app=express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
const db=require("./models")
const KEY=`AIzaSyCnDI-2NViqtdRNz_yd-7Qs8XhSpf5o1xU`
console.log(process.env.SECRET)
const genAI = new GoogleGenerativeAI(KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash",generationConfig: { 
    responseMimeType: "application/json"
}});

async function run(topic) {
    const prompt = `Output a 500 word blog  on the topic given by the user as:${topic} make sure the output is in JSON Format with the following schema:
    {
    title:{type:string},
    content:{type:string}
    }
    
    `
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const out={
        "res":`${text}`
    }
    
    return text
  }
  async function email(topic) {
    const prompt = `Output a short email template on the topic given by the user as:${topic} make sure the output is in JSON Format with the following schema:
    {
    title:{type:string},
    content:{type:string}
    }
    
    `
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const out={
        "res":`${text}`
    }
   
    return text
  }
  async function story(topic) {
    const prompt = `Output a 500 word short story  on the topic given by the user as:${topic} make sure the output is in JSON Format with the following schema:
    {
    title:{type:string},
    content:{type:string}
    }
    
    `
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const out={
        "res":`${text}`
    }
    
    return text
  }
  db.sequelize.sync().then((req)=>{
    app.listen(8000,()=>{
        console.log("server running on port 8000")
      })
})

app.get("/",(req,res)=>{
    res.send("API working")
})
app.post("/createblog",async (req,res)=>{
    const result=await run(req.body.title)
    console.log(JSON.stringify(result))
    
    res.status(200).send(result)
})
app.post("/createemail",async (req,res)=>{
  const result=await email(req.body.title)
  console.log(JSON.stringify(result))
  
  res.status(200).send(result)
})
app.post("/createstory",async (req,res)=>{
  const result=await story(req.body.title)
  console.log(JSON.stringify(result))
  
  res.status(200).send(result)
})
  
app.post("/project",async (req,res)=>{
  const proj={
    type:req.body.type,
    title:req.body.title,
    content:req.body.content,
    userid:req.body.userid
  }
  const created_project=await Project.create(proj)
  res.status(201).json(created_project)
})
app.post("/getprojects",async(req,res)=>{
  console.log("User:",req.body.userid)
  const projects=await Project.findAll({where:{userid:req.body.userid},order:[["id","DESC"]]});
  res.status(200).json(projects)
})

  
app.post("/register",async (req,res)=>{
    const salt=await bcrypt.genSalt(10)
    const usr = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : await bcrypt.hash(req.body.password, salt)
      };
      created_user = await User.create(usr);
      res.status(201).json(created_user);
})
app.post('/login',async(req,res,next)=>{
    const user = await User.findOne({ where : {email : req.body.email }});
    if(user){
       const password_valid = await bcrypt.compare(req.body.password,user.password);
       if(password_valid){
           token = jwt.sign({ "id" : user.id,"email" : user.email,"firstName":user.firstName,"lastName":user.lastName },process.env.SECRET);
           res.status(200).json({ token : token });
       } else {
         res.status(400).json({ error : "Password Incorrect" });
       }
     
     }else{
       res.status(404).json({ error : "User does not exist" });
     }
     
     });
