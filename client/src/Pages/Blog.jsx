import React, { useState,useEffect } from 'react'
import Nav from '../components/Nav'
import { Button, Input, Textarea, Typography } from '@material-tailwind/react'
import OpenAI from "openai"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Blog() {
    const[blog,setBlog]=useState("")
    const [topic,setTopic]=useState("")
    const [title,setTitle]=useState("")
    const [isAuth,setIsAuth]=useState(false)
    const navigate=useNavigate()
    useEffect(()=>{
      const token=localStorage.getItem("token");
      if(token && token.length>0){
        setIsAuth(true)
      }else{
        navigate("/login")
      }
       
      
  
    },[]);
    let c=0
  
     function main() {
      c+=1
      console.log(c)
    }
    const createBlog=()=>{
      
      axios.post("http://localhost:8000/createblog",{"title":`${topic}`})
      .then((res)=>{
        console.log(JSON.stringify(res.data))
        console.log(res.data["title"])
        setBlog(res.data["content"])
        setTitle(res.data["title"])
      }).catch(err=>console.log(err))
    }
  return (
    <>
    <Nav isAuth={isAuth} />
    <div className="sec">
    <Typography variant='h3' color="gray">
        Create a Blog With AI
    </Typography>
    <Input label="Type The Topic Here" value={topic} onChange={(e)=>setTopic(e.target.value)} />
    <Button className='mt-2' onClick={createBlog}>Create</Button>
    <div className="mt-3">
    <Typography variant='h2' color="blue-gray">
        Result:
    </Typography>
    {title.length>0?
    <Typography variant='h2' color="blue-gray">
    {title}
</Typography>
    :  ""
  }
    <Textarea className='disabled h-[600px] text-[18px]' placeholder="The result will take 10-15 seconds to load" value={blog}/>
    </div>
    </div>
    
    </>
  )
}

export default Blog