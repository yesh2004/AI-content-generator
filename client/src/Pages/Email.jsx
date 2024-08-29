import React, { useState,useEffect } from 'react'
import Nav from '../components/Nav'
import { Button, Input, Textarea, Typography } from '@material-tailwind/react'
import MarkDown from "react-markdown"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Email() {
    const[email,setEmail]=useState("*The results will load here*")
    const [topic,setTopic]=useState("")
    const [title,setTitle]=useState("")
    const [isAuth,setIsAuth]=useState(false)
    const [loading,isLoading] =useState(false)

      const markdown = '# Hi, *Pluto*!'
    const navigate=useNavigate()
    useEffect(()=>{
      const token=localStorage.getItem("token");
      if(token && token.length>0){
        setIsAuth(true)
      }else{
        navigate("/login")
      }
       
      
  
    },[]);
    //<Textarea size="lg" className='disabled !h-[600px] text-[18px]' placeholder="The result will take 10-15 seconds to load" value={blog}/>
    const createBlog=()=>{
      isLoading(true)
      axios.post("http://localhost:8000/createemail",{"title":`${topic}`})
      .then((res)=>{
        console.log(JSON.stringify(res.data))
        console.log(res.data["title"])
        setEmail(res.data["content"])
        setTitle(res.data["title"])
        isLoading(false)
      }).catch(err=>{
        
        console.log(err)
        isLoading(false)
      })
    }
  return (
    <>
    <Nav isAuth={isAuth} />
    <div className="sec">
    <Typography variant='h3' color="gray">
        Create an Email Template With AI
    </Typography>
    <Input label="Type The Topic Here" value={topic} onChange={(e)=>setTopic(e.target.value)} />
    {!loading?
    <Button className='mt-2' onClick={createBlog}>Create</Button>
    :
    <Button className='mt-2' loading={true}>Loading</Button>  
  }
    
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
    
    <MarkDown className="mt-2 markdown" placeholder="The result will take 10-15 seconds to load">
      {email}
      </MarkDown>
    </div>
    </div>
    
    </>
  )
}

export default Email