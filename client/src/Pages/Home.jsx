import Nav from '../components/Nav'
import React, { useContext, useEffect, useState } from 'react'
import {
    Card,
  CardBody,
  CardFooter,
    Button,
    
    Typography,
    Input,
  } from "@material-tailwind/react";
import { Context } from '../App';
import { Link } from 'react-router-dom';
  
function Home() {
  const [isAuth,setIsAuth]=useState(false)
  const[userDetail,setUserDetail]=useContext(Context)
  
  console.log("context:",userDetail)
  useEffect(()=>{
    const token=localStorage.getItem("token");
    if(token && token.length>0){
      setIsAuth(true)
    }
      
    

  },[]);
  return (
    <>
    <Nav isAuth={isAuth} />
   
    <header className=" m-0">
        <div className="grid mt-16 min-h-[40vh] w-full lg:h-[30rem] md:h-[34rem] place-items-stretch bg-[url('/image/bg-hero-17.svg')] bg-center bg-contain bg-no-repeat">
          <div className="container mx-auto px-4 text-center">
            <Typography className="inline-flex text-xs rounded-lg border-[1.5px] border-blue-gray-50 bg-white py-1 lg:px-4 px-1 font-medium text-primary">
              Exciting News! Introducing our latest innovation
            </Typography>
            <Typography
              variant="h1"
              color="blue-gray"
              className="mx-auto my-6 w-full leading-snug  text-[36px] lg:max-w-3xl lg:!text-7xl"
            >
              The Fastest Way To Write Your Content Using{" "}
              <span className="text-[#4d8ef7] leading-snug ">
                AI
              </span>
              
              
              .
            </Typography>
            <Link to="/dashboard">
            <Button className='bg-[#4d8ef7] text-md'>
              Get Started 
            </Button>
            </Link>
            
          </div>
        </div>
      </header>
      
      <div className="grid mb-10  algin-center ml-auto mr-auto  lg:grid-cols-3 lg:pl-[10rem] lg:pr-[10rem]  sm:grid-cols-1 sm:ml ">
      <Card className=" w-96">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Blog Writer
        </Typography>
        <Typography>
        Craft engaging, SEO-friendly blog posts effortlessly. Our AI Blog Writer ensures your content is well-structured and tailored to your audience, helping you consistently produce quality articles in minutes.

        </Typography>
      </CardBody>
      
    </Card>
    <Card className=" w-96">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
         Email Template 
        </Typography>
        <Typography>
        Generate polished, customized email templates for any occasion. Communicate effectively and professionally with ease using our AI-driven Email Template Creator.
        </Typography>
      </CardBody>
      
    </Card>
    <Card className=" w-96">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Story Writer
        </Typography>
        <Typography>
        Bring your imagination to life with our AI Short Story Writer. Create original, captivating tales from simple prompts in just a few moments.
        </Typography>
      </CardBody>
      
    </Card>
      </div>
    </>
  )
}

export default Home