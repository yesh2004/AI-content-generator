import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import {
  Breadcrumbs,
  Button,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import MarkDown from "react-markdown";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Blog() {
  const [blog, setBlog] = useState("*The results will load here*");
  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [loading, isLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [saved, setSaved] = useState(false);
  const markdown = "# Hi, *Pluto*!";
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && token.length > 0) {
      setIsAuth(true);
      const decode = jwtDecode(token);
      setUserId(decode.id);
    } else {
      navigate("/login");
    }
  }, []);
  //<Textarea size="lg" className='disabled !h-[600px] text-[18px]' placeholder="The result will take 10-15 seconds to load" value={blog}/>
  const saveProject = () => {
    const data = {
      type: "Blog",
      title: title,
      content: blog,
      userid: userId,
    };
    axios
      .post("http://localhost:8000/project", data)
      .then((res) => {
        setSaved(true);
        toast.success("Project is saved check in dashboard");
      })
      .catch((err) => console.log(err));
  };
  const create = () => {
    isLoading(true);
    setSaved(false)
    axios
      .post("http://localhost:8000/createblog", { title: `${topic}` })
      .then((res) => {
        console.log(JSON.stringify(res.data));
        console.log(res.data["title"]);
        setBlog(res.data["content"]);
        setTitle(res.data["title"]);
        isLoading(false);
      })
      .catch((err) => {
        console.log(err);
        isLoading(false);
      });
  };
  return (
    <>
      <Nav isAuth={isAuth} />
      <ToastContainer />
      <div className="sec">
        <Breadcrumbs>
          <Link to="/dashboard">Back to Dashboard</Link>
        </Breadcrumbs>
        <Typography variant="h3" color="gray">
          Create a Blog With AI
        </Typography>
        <Input
          label="Type The Topic Here"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <div className="flex justify-between">
          {!loading ? (
            <Button className="mt-2" onClick={create}>
              Create
            </Button>
          ) : (
            <Button className="mt-2" loading={true}>
              Loading
            </Button>
          )}
          {!saved ? (
            <Button className="mt-2 " onClick={saveProject}>
              Save
            </Button>
          ) : (
            <Button className="mt-2 " disabled color="green">
              Saved
            </Button>
          )}
        </div>

        <div className="mt-3">
          <Typography variant="h2" color="blue-gray">
            Result:
          </Typography>
          {title.length > 0 ? (
            <Typography variant="h2" color="blue-gray">
              {title}
            </Typography>
          ) : (
            ""
          )}

          <MarkDown
            className="mt-2 markdown"
            placeholder="The result will take 10-15 seconds to load"
          >
            {blog}
          </MarkDown>
        </div>
      </div>
    </>
  );
}

export default Blog;
