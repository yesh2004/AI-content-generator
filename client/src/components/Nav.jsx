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
          <a href="#" className="flex items-center">
            Pages
          </a>
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
      <div className="   max-h-[768px] w-[100%] ">
        <Navbar className="sticky top-0 z-10 h-max max-w-full bg-gray-100 rounded-none px-4 py-2 lg:px-8 lg:py-4">
          <div className="flex items-center justify-between text-blue-gray-900">
            <Typography
              as="a"
              href="#"
              className="mr-4 cursor-pointer py-1.5 font-bold uppercase text-[16px]"
            >
              Contentify
            </Typography>
            <div className="mr-4 hidden lg:block">{navList}</div>
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
            <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block"
            >
              <Link to="/login" ><span>Login</span></Link> 
            </Button>
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
        <Button fullWidth variant="gradient" size="sm" className="">
              <span>Login</span>
            </Button>  

          
          }
            
          </Collapse>
        </Navbar>
      </div>
)}

export default Nav
