import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"
import { Context } from "../App";

function LoginForm() {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [userDetail,setUserDetail]=useContext(Context)
    const navigate=useNavigate()
    const login=()=>{
        const data={
            email:email,
            password:password
        }

        axios.post(`http://localhost:8000/login`,data)
        .then((res)=>{
            
            localStorage.setItem("token",res.data.token)
            const decode=jwtDecode(res.data.token)
            const userData={
              id:decode.id,
              firstName:decode.firstName,
              lastName:decode.lastName,
              email:decode.email
            }
            setUserDetail(userData)
            console.log(decode)
            navigate('/dashboard')
            
        }).catch((err)=>console.log(err))
    }

    return (
      <section className="grid text-center h-screen items-center p-8">
        <div>
          <Typography variant="h3" color="blue-gray" className="mb-2">
            Sign In
          </Typography>
          <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
            Enter your email and password to sign in
          </Typography>
          <form action="#" className="mx-auto max-w-[24rem] text-left">
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
                  className="mb-2 block font-medium text-gray-900"
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
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
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
                onChange={e=>setPassword(e.target.value)}
              />
            </div>
            <Button color="gray" size="lg" className="mt-6" fullWidth onClick={login}>
              sign in
            </Button>
            <div className="!mt-4 flex justify-end">
              <Typography
                as="a"
                href="#"
                color="blue-gray"
                variant="small"
                className="font-medium"
              >
                Forgot password
              </Typography>
            </div>
            
            <Typography
              variant="small"
              color="gray"
              className="!mt-4 text-center font-normal"
            >
              Not registered?{" "}
              <Link to="/register" className="font-medium text-gray-900">
                Create account
              </Link>
            </Typography>
          </form>
        </div>
      </section>
    );
}

export default LoginForm