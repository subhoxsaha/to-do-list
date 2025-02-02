import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { validateEmail, validatePassword } from "../utils/helper";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate=useNavigate()



  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter name");
      return;
    }
    if (!validateEmail(email)) {
      setError("enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      setError("password must be atleast 8 characters long");
      return;
    }
    setName("");
    setEmail("");
    setPassword("");


    //api call..

   await axios.post('https://to-do-list-nine-theta-90.vercel.app/register', 
      { name, email, password }, 
      { headers: { 'Conent-Type': 'application/json' } }
    )
    .then(response => {
      navigate('/login')
      console.log(response.data)})
    .catch(error => {
      console.error(error)
    setError('Email already exists')});


  };

  return (
    <>
      <Navbar />
      <div className="flex h-full w-screen items-center flex-col justify-center">
        <form
          className="flex flex-col  mt-10 items-center border-2 border-emerald-950 px-20 py-20 rounded "
          onSubmit={handleRegister}
        >
          <h2 className="text-2xl mb-5">Register</h2>
          <input
            type="text"
            placeholder="Name"
            className="px-7 py-2 mb-2 rounded border-2 border-gray-500"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
          <input
            type="email"
            placeholder="Email"
            className="px-7 py-2 mb-2 rounded border-2 border-gray-500"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />

          <input
            type="password"
            placeholder="password"
            className="px-7 py-2 rounded border-2 border-gray-500 cursor-pointer"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {error && <p className="text-red-600">{error}</p>}
          <button
            type="submit"
            className="mt-5 py-2 bg-blue-500 w-max p-4 rounded text-white"
          >
            Create Account
          </button>
          <p className=" mt-6">
            already have an account?{" "}
            <Link to={"/login"} className=" text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
