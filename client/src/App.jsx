import React, { createContext, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Blog from './Pages/Blog'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import Email from './Pages/Email'
import Story from './Pages/Story'

export const Context=createContext()

function App() {
  const[userDetail,setUserDetail]=useState("")
  return (
    <>
    <Context.Provider value={[userDetail,setUserDetail]}>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/blog" element={<Blog/>}/>
      <Route path="/email" element={<Email/>}/>
      <Route path="/story" element={<Story/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
    </Context.Provider>
    </>
  )
}

export default App