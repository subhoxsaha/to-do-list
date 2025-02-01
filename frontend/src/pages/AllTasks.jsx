import React, { useContext, useEffect, useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import Task from '../components/Task';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../context/UserContext';

const AllTasks = () => {
  const { userId } = useContext(UserContext);
  
  const [reload, setReload] = useState(false)
  const [todo, setTodo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch tasks
    axios.post("http://localhost:3000/getTodo", { userId })
      .then((response) => {
        setTodo(response.data); 
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch tasks' , err);
        setLoading(false);
      });
  }, [userId, setTodo, reload]);

  return (
    <>
      <div className="w-screen h-max grid grid-cols-3 pt-5 px-10">
        
      {todo.length > 0 ? (
  todo.map((data, idx) => (
    <Task 
      key={idx}
      id={data._id} 
      title={data.todoTitle} 
      content={data.todoContent} 
      date={data.todoDate} 
      status={data.status} 
      setReload={setReload}
      reload={reload}
    />
  ))
) : (
  <p>No tasks available</p>
)}

        
        <Link to="/add">
          <IoMdAdd className="text-4xl p-3 w-max h-max absolute right-0 z-10 bottom-0 m-5 hover:bg-blue-400 rounded-full text-white bg-blue-500 hover:rotate-90 transition-all ease-in-out" />
        </Link>
      </div>
    </>
  );
};

export default AllTasks;
