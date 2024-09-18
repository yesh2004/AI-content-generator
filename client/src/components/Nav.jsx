import React from 'react'
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
  } from "@material-tailwind/react";
  import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from 'react-router-dom';
function Nav({isAuth}) {
    const [openNav, setOpenNav] = React.useState(false);

    const logout=()=>{
      localStorage.removeItem("token");
      window.location.reload()
    }

    React.useEffect(() => {
      window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setOpenNav(false),
      );
    }, []);
   
    const navList = (
      <ul className="mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <Link>
            Pages
          </Link>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <a href="#" className="flex items-center">
            Account
          </a>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <a href="#" className="flex items-center">
            Dashbord
          </a>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <a href="#" className="flex items-center">
            Docs
          </a>
        </Typography>
      </ul>
    );
   
    return (
      <div className="   max-h-[768px] w-[100%]  mt-5 bg-white ">
        <Navbar className="sticky  z-10 h-max max-w-full  bg-white rounded-lg px-4 py-1 lg:px-6 lg:py-4 lg:border-solid lg:border-2 border-gray-200 shadow-xl" >
          <div className="flex items-center justify-between text-blue-gray-900">
            <Typography
              as="a"
              
              className="mr-4 cursor-pointer py-1.5 font-bold uppercase text-[18px] text-[#4d8ef7]"
            >
              <Link to="/">
              Contentify
              </Link>
            </Typography>
            
            {
              isAuth?
              <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block"
              onClick={logout}
            >
              <span>Logout</span>
            </Button>
            :
            <Link to="/login" >
            <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block"
            >
              <span>Login</span>
            </Button>
            </Link>
            }
            
            <IconButton
              variant="text"
              className="lg:hidden"
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <XMarkIcon className="h-6 w-6" strokeWidth={2} />
              ) : (
                <Bars3Icon className="h-6 w-6" strokeWidth={2} />
              )}
            </IconButton>
          </div>
          <Collapse open={openNav}>
            {navList}
            {isAuth?
          <Button fullWidth variant="gradient" size="sm" className="">
          <span>Logout</span>
        </Button>
        :
        <Button fullWidth variant="gradient" size="lg" className="">
              <span>Login</span>
            </Button>  

          
          }
            
          </Collapse>
        </Navbar>
      </div>
)}

export default Nav
