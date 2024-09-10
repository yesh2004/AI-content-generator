import Nav from "../components/Nav";
import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Typography,
  Input,
} from "@material-tailwind/react";
import { Context } from "../App";
import { Link } from "react-router-dom";
import Robot from "../assets/artoons.jpeg";
function Home() {
  const [isAuth, setIsAuth] = useState(false);
  const [userDetail, setUserDetail] = useContext(Context);

  console.log("context:", userDetail);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && token.length > 0) {
      setIsAuth(true);
    }
  }, []);
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
              className="mx-auto my-6 w-full leading-snug  text-[36px] lg:max-w-3xl lg:!text-7xl kanit"
            >
              The Fastest Way To Write Your Content Using{" "}
              <span className="text-[#4d8ef7] leading-snug kanit ">AI</span>.
            </Typography>
            <Link to="/dashboard">
              <Button className="bg-[#4d8ef7] text-md">Get Started</Button>
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
              Craft engaging, SEO-friendly blog posts effortlessly. Our AI Blog
              Writer ensures your content is well-structured and tailored to
              your audience, helping you consistently produce quality articles
              in minutes.
            </Typography>
          </CardBody>
        </Card>
        <Card className=" w-96">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Email Template
            </Typography>
            <Typography>
              Generate polished, customized email templates for any occasion.
              Communicate effectively and professionally with ease using our
              AI-driven Email Template Creator.
            </Typography>
          </CardBody>
        </Card>
        <Card className=" w-96">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Story Writer
            </Typography>
            <Typography>
              Bring your imagination to life with our AI Short Story Writer.
              Create original, captivating tales from simple prompts in just a
              few moments.
            </Typography>
          </CardBody>
        </Card>
      </div>
      <section className="sec h-[500px] bg-[#4d8ef7] text-white flex justify-center content-center -skew-y-1 ">
        <div className=" pl-[100px] pr-[100px] mt-10">
          <h2 className="text-center text-[64px]">
            Transform Ideas into Words Instantly
          </h2>
          <p className="text-[32px] mt-4 tracking-wider">
            Our AI content generator is designed to help you bring your ideas to
            life effortlessly. Whether you need a blog post, an email, or a
            creative story, our AI-powered tool generates high-quality content
            in a matter of seconds. With a few inputs, you can produce
            professional and engaging text that suits your needs, saving you
            time and letting you focus on what matters most—your ideas.
          </p>
        </div>
      </section>
      <section className="sec h-[500px] flex justify-center content-center ">
        <div className=" mt-10 ">
          <h2 className="text-[56px] font-bold">Why Choose Our AI?</h2>
          <p className="m-2">
            Discover the powerful features that make our AI content generator
            stand out. It's more than just a tool—it’s your personal assistant
            for generating text in various formats.
          </p>
          <ul className="list-none gap-3">
            <li className="p-5 border-solid border-[1px] border-black rounded-[10px] mt-4">
              <span className="font-semibold">Blog Generator :</span>
              Create well-structured, informative blog posts tailored to any
              topic or industry in just a few clicks. Perfect for students,
              content creators, and businesses.
            </li>
            <li className="p-5 border-solid border-[1px] border-black rounded-[10px] mt-4">
              <span className="font-semibold">Email Generator :</span>
              Generate personalized and professional emails for any occasion,
              whether you're sending a business inquiry or personal
              correspondence.
            </li>
            <li className="p-5 border-solid border-[1px] border-black rounded-[10px] mt-4">
              <span className="font-semibold">Story Generator :</span>
              Unleash your creativity with AI-powered stories. Whether you're
              writing fiction or brainstorming ideas, let the AI inspire you
              with unique narratives.
            </li>
          </ul>
        </div>
      </section>
      <section className="sec flex justify-between p-2 mb-10 bg-[#f0e4d4] h-[500px] skew-y-1 pt-3 pb-3">
        <div className=" mt-10">
          <h2 className="text-[48px] font-semibold">
            Simple Steps to Generate Content
          </h2>
          <ul className="mt-10">
            <li className="p-3 bg-white mt-2 mb-8 text-lg">
              Step 1: Choose the type of content you need—blog, email, story, or
              any other format.
            </li>
            <li className="p-3 bg-white mt-2 mb-8 text-lg">
              Step 2: Enter the necessary details or prompts. You can provide a
              topic, keywords, or a brief description to guide the AI.
            </li>
            <li className="p-3 bg-white mt-2 text-lg ">
              Step 3: Hit "Generate," and in just a few seconds, you'll have
              your content ready to go! You can edit, refine, or use it as it
              is.
            </li>
          </ul>
        </div>
        <div className="">
          <img src={Robot} alt="" className="h-[450px]" />
        </div>
      </section>
      <footer className="flex w-full flex-row flex-wrap content-center justify-center text-center h-[100px] bg-[#fff]">
        <Typography color="black" className="font-bold">
          &copy; 2023
        </Typography>
      </footer>
    </>
  );
}

export default Home;
