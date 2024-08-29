import { useState } from "react";

import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function SignUp() {
    const [passwordShown, setPasswordShown] = useState(false);
    const [firstname,setFirstName]=useState("")
    const [lastname,setLastName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
    const navigate=useNavigate()
    const register=()=>{
        const data={
            "firstName":firstname,
            "lastName":lastname,
            "email":email,
            "password":password
        }
        axios.post(`http://localhost:8000/register`,data)
        .then(res=>{
            navigate("/login")
            
        }).catch(err=>console.log(err))
    }

    return (
      <section className="grid text-center h-screen items-center p-8">
        <div>
          <Typography variant="h3" color="blue-gray" className="mb-2">
            Sign Up
          </Typography>
          
          <form action="#" className="mx-auto max-w-[24rem] text-left">
          <div className="mb-6">
              <label htmlFor="email">
                <Typography
                  variant="small"
                  className="mb-2 block font-medium text-gray-900"
                >
                 First Name
                </Typography>
              </label>
              <Input
                id="firstname"
                color="gray"
                size="lg"
                type="text"
                name="firstname"
                placeholder="name@mail.com"
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                labelProps={{
                  className: "hidden",

                }}
                value={firstname}
                onChange={(e)=>setFirstName(e.target.value)}
                
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email">
                <Typography
                  variant="small"
                  className="mb-2 block font-medium text-gray-900"
                >
                 Last Name
                </Typography>
              </label>
              <Input
                id="firstname"
                color="gray"
                size="lg"
                type="text"
                name="firstname"
                placeholder="Last Name"
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                labelProps={{
                  className: "hidden",
                }}
                value={lastname}
                onChange={(e)=>setLastName(e.target.value)}
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="email">
                <Typography
                  variant="small"
                  className="mb-2 block font-medium text-gray-900"
                >
                  Your Email
                </Typography>
              </label>
              <Input
                id="email"
                color="gray"
                size="lg"
                type="email"
                name="email"
                placeholder="name@mail.com"
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                labelProps={{
                  className: "hidden",
                }}

                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password">
                <Typography
                  variant="small"
                  className="mb-1 block font-medium text-gray-900"
                >
                  Password
                </Typography>
              </label>
              <Input
                size="lg"
                placeholder="********"
                labelProps={{
                  className: "hidden",
                }}
                className="w-full placeholder:opacity-100 y"
                type={passwordShown ? "text" : "password"}
                icon={
                  <i onClick={togglePasswordVisiblity}>
                    {passwordShown ? (
                      <EyeIcon className="h-5 w-5" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5" />
                    )}
                  </i>
                }
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
            <Button color="gray" size="lg" className="mt-6" fullWidth onClick={register}>
              sign up
            </Button>
            <div className="!mt-4 flex justify-end">
              
            </div>
            
            
          </form>
        </div>
      </section>
    );
}

export default SignUp