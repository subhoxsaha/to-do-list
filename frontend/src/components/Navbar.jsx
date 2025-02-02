import React, { useContext, useEffect } from "react";
import { LuListTodo } from "react-icons/lu";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const Navbar = () => {
  const navigate= useNavigate();
  
   const {user, setUser, setUserId} =useContext(UserContext)

  const logout = async () => {
    await fetch("https://to-do-list-nine-theta-90.vercel.app/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        response.json();
        navigate('/login')
      })
      .then(() => {
        setUser(null);})
  };

  useEffect(() => {
    fetch("https://to-do-list-nine-theta-90.vercel.app/profile", { credentials: "include" })
      .then((response) => response.json())
      .then((response) => {
        setUser(response.email)
      setUserId(response.id)}
      );
  }, []);

  return (
    <>
      <header className="w-screen h-max pt-3 bg-slate-200 px-10 pb-3 flex justify-between items-center">
        <Link
          className="text-2xl font-semibold flex gap-2 items-center"
          to="/home"
        >
          <LuListTodo className="text-3xl " />
          To-Do-List .{" "}
        </Link>

        {user && (
          <div className="flex gap-2 w-max items-center">
          <div className="w-9 h-9 bg-black text-white text-xl rounded-full p-1 flex justify-center items-center"><p>{user.slice(0,1).toUpperCase()}</p></div>
          <div className="text-sm flex justify-center flex-col items-start font-semibold">
            <p>User : {user}</p>
            <p className="text-blue-500 cursor-pointer" onClick={logout}>
              Logout
            </p>
          </div>
          </div>
        )}
        {!user && (
          <div className="flex gap-4 text-lg items-center">
            <Link
              to={"/login"}
              className="pb-1 hover:border-b-black border-b-2 border-transparent"
            >
              Login
            </Link>
            <span className="">|</span>
            <Link
              to={"/register"}
              className="pb-1 hover:border-b-black border-2  border-transparent"
            >
              Register
            </Link>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
