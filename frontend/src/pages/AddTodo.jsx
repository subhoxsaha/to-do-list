import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { SlArrowLeft } from "react-icons/sl";


import Navbar from "../components/Navbar";
import UserContext from "../context/UserContext";
import axios from "axios";
import { Link } from "react-router-dom";

const AddTodo = () => {
  const { user, userId } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState(false);
  const [date, setDate] = useState("");

  const addTodo = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/add",
          { userId, title, content, status},
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          console.log(response.data);
          toast("Task added successfully");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to add task");
        });
    } catch (error) {
      console.log(error);
      toast.error("Failed to add task");
    } finally {
      setTitle("");
      setContent("");
      setDate("");
      setStatus(false);
    }
  };

  return (
    <>
      <Navbar />

      {user && (
        <div className="justify-center flex relative">
          <form
            className="w-[35%] flex flex-col gap-2 rounded-md bg-white p-5 relative"
            onSubmit={addTodo}
          >
            <Link to={"/home"} className="flex gap-2 mb-3">
              <SlArrowLeft className="text-xl" />
              <span>Back to home</span>
            </Link>

            <label>Title</label>
            <input
              type="text"
              className="outline-none p-1 bg-white rounded border-2"
              placeholder="Enter a Task"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label>Content</label>
            <textarea
              className="outline-none p-1 bg-white mb-5 rounded resize-none border-2"
              rows={5}
              placeholder="Content of Task"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 self-center py-2 w-[50%] rounded-md text-white hover:bg-white hover:text-blue-500 hover:border-blue-500 border-2 ease-in-out transition-all"
            >
              Add
            </button>
            <ToastContainer />
          </form>
        </div>
      )}
    </>
  );
};

export default AddTodo;
