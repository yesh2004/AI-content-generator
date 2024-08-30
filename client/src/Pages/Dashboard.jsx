import React, { useContext, useEffect, useState } from "react";
import avatar from "../assets/robot.png";
import Nav from "../components/Nav";
import { Context } from "../App";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  Tabs,
  Tab,
  TabPanel,
  TabsBody,
  TabsHeader,
  Typography,
  Button,
  CardFooter,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Markdown from "react-markdown";
function Dashboard() {
  const [userDetail, setUserDetail] = useContext(Context);
  const [isAuth, setIsAuth] = useState(false);
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  const handleOpen = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && token.length > 0) {
      setIsAuth(true);
      const decode = jwtDecode(token);
      const userData = {
        id: decode.id,
        firstName: decode.firstName,
        lastName: decode.lastName,
        email: decode.email,
      };
      setUserDetail(userData);
    } else {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    if (userDetail && userDetail.id) {
      const data = {
        userid: userDetail.id,
      };

      axios
        .post("http://localhost:8000/getprojects", data)
        .then((res) => {
          setProjects(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [userDetail]);
  if (projects.length > 0) {
    Object.values(projects).map((project) => {
      console.log(project.title);
    });
  }
  return (
    <>
      <Nav isAuth={isAuth} />
      <div className="sec">
        <div className=" flex">
          <img
            src={avatar}
            alt=""
            className="h-[100px] mr-4 avatar border-solid border-black rounded"
          />
          <Typography variant="h2" className="mt-3">
            HI! {userDetail.firstName} <span>{userDetail.lastName}</span>
          </Typography>
        </div>
        <Typography variant="h2" className=" mt-2  text-[28px]">
          AI Tools we offer:
        </Typography>
        <Tabs value="services">
          <TabsHeader>
            <Tab value="services">Services</Tab>
            <Tab value="project">Project</Tab>
          </TabsHeader>
          <TabsBody
            animate={{
              initial: { y: 250 },
              mount: { y: 0 },
              unmount: { y: 250 },
            }}
          >
            <TabPanel value="services">
              <div className="grid mb-10    lg:grid-cols-3   sm:grid-cols-1 sm:ml ">
                <Card className=" w-96">
                  <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      Blog Writer
                    </Typography>
                    <Typography>
                      Craft engaging, SEO-friendly blog posts effortlessly. Our
                      AI Blog Writer ensures your content is well-structured and
                      tailored to your audience, helping you consistently
                      produce quality articles in minutes.
                    </Typography>
                    <CardFooter>
                      <Link to="/blog">
                        <Button className="mt-1 w-full bg-[#4d8ef7]">
                          Create
                        </Button>
                      </Link>
                    </CardFooter>
                  </CardBody>
                </Card>
                <Card className=" w-96">
                  <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      Email Template
                    </Typography>
                    <Typography>
                      Generate polished, customized email templates for any
                      occasion. Communicate effectively and professionally with
                      ease using our AI-driven Email Template Creator.
                    </Typography>
                    <CardFooter>
                      <Link to="/email">
                        <Button className="mt-1 w-full bg-[#4d8ef7]">
                          Create
                        </Button>
                      </Link>
                    </CardFooter>
                  </CardBody>
                </Card>
                <Card className=" w-96">
                  <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      Story Writer
                    </Typography>
                    <Typography>
                      Bring your imagination to life with our AI Short Story
                      Writer. Create original, captivating tales from simple
                      prompts in just a few moments.
                    </Typography>
                    <CardFooter>
                      <Link to="/story">
                        <Button
                          variant="solid"
                          className="mt-1 w-full bg-[#4d8ef7]"
                        >
                          Create
                        </Button>
                      </Link>
                    </CardFooter>
                  </CardBody>
                </Card>
              </div>
            </TabPanel>
            <TabPanel value="project">
              <div className="grid mb-10    lg:grid-cols-3   sm:grid-cols-1 sm:ml ">
                {projects && projects.length > 0 ? (
                  projects.map((project) => (
                    <Card className=" w-96 mb-2">
                      <CardBody>
                        <h2 className="text-lg font-bold">{project.title}</h2>
                        <p className="text-gray text-sm italic">
                          Type:{project.type}
                        </p>
                        <p>{project.content.substring(0, 200)}</p>
                        <Button
                          onClick={() => {
                            handleOpen();
                            setSelected(project);
                          }}
                          variant="gradient"
                        >
                          Open Dialog
                        </Button>
                        <Dialog open={open} size="xl" className="">
                          <DialogHeader>
                            <p>{selected.title}</p>
                          </DialogHeader>
                          <DialogBody className="">
                            <p>Type:{selected.type}</p>
                            <Markdown className="mt-2 markdown_dialog overflow-scroll text-black">
                              {selected.content}
                            </Markdown>
                          </DialogBody>
                          <DialogFooter>
                            <Button
                              variant="text"
                              color="red"
                              onClick={handleOpen}
                              className="mr-1"
                            >
                              <span>Close</span>
                            </Button>
                          </DialogFooter>
                        </Dialog>
                      </CardBody>
                    </Card>
                  ))
                ) : (
                  <p>No projects</p>
                )}
              </div>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
    </>
  );
}

export default Dashboard;
