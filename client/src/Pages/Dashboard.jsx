import React, { useContext,useEffect,useState } from 'react'
import Nav from '../components/Nav'
import { Context } from '../App'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@material-tailwind/react'
import {jwtDecode} from "jwt-decode"
function Dashboard() {
    const[userDetail,setUserDetail]=useContext(Context)
    const [isAuth,setIsAuth]=useState(false)
    const navigate=useNavigate()
    useEffect(()=>{
      const token=localStorage.getItem("token");
      if(token && token.length>0){
        setIsAuth(true)
        const decode=jwtDecode(token)
            const userData={
              id:decode.id,
              firstName:decode.firstName,
              lastName:decode.lastName,
              email:decode.email
            }
            setUserDetail(userData)
      }else{
        navigate("/login")
      }
       
      
  
    },[]);
    console.log(userDetail)
  return (
    <>
    <Nav isAuth={isAuth} />
    <div className="sec">
        <Typography variant='h2'>
            HI! {userDetail.firstName} <span>{userDetail.lastName}</span>
        </Typography>
        <Typography variant='p' className=' mt-2  text-[28px]'>
            AI Tools we offer:
        </Typography>
    </div>
    </>
  )
}

export default Dashboard