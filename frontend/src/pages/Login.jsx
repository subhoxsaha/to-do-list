import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { validateEmail, validatePassword } from "../utils/helper";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();


  const wrongCredential=()=>{
    setError('you entered wrong email or password.')
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "password must be atleast 8 characters long and contain atleast one uppercase, lowercase, 0-9 digit, one special character "
      );
      return;
    }
    setEmail("");
    setPassword("");

    //api calll
    try {
      await axios
        .post(
          "http://localhost:3000/login",
          { email, password },
          {  withCredentials: true,
            headers: { "Conent-Type": "application/json" } }
        )
        .then((response) => {
          console.log(response);
          if(response.data){
            navigate('/home');
          }
          
          
        })
        .catch((error) => console.error(error));
    } catch {
      (err) => {
        console.log(err);
      };
    }
  };


  




  return (
    <>
      <Navbar />
      <div className="flex h-full w-screen items-center flex-col justify-center px-28">
        <form
          className="flex flex-col  mt-10  translate-y-30 items-center border-2 border-emerald-950 px-14 py-20 rounded "
          onSubmit={handleLogin}
        >
          <h2 className="text-2xl mb-5">Login</h2>
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
          {error && <p className=" text-red-600">{error}</p>}
          <button
            type="submit"
            className="mt-5 py-2 bg-blue-500 w-max p-4 rounded text-white"
          >
            Login Now
          </button>
          <p className=" mt-6">
            not registered yet?{" "}
            <Link to={"/register"} className=" text-blue-500">
              create an Account
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
