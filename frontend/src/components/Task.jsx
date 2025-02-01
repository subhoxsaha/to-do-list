import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { IoTrashBinSharp } from "react-icons/io5";
import { grey } from "@mui/material/colors";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Task = ({ title, content, date, status, id, setReload, reload }) => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(status);


  useEffect(() => {
    console.log(checked);
    try {
      axios.post('http://localhost:3000/update',{id, checked})
      .then((res)=>{console.log(res.data);
        setReload(!reload)
      })
      .catch((err)=>{console.log(err)})
    } catch (err) {
      console.log(err);
    }
    
  }, [checked])
  

  const handleChange = () => {
    console.log(checked);

    setChecked(!checked);

  };

  const deleteTodo = () => {
    try {
      axios.post("http://localhost:3000/delete", { id }).then((Response) => {
        console.log(Response.data);
        setReload(!reload);
      });
    } catch (error) {
      console.error("error in deletion," + error);
    }
  };

  return (
    <div className="bg-slate-200 w-30% h-max m-1 flex-col p-5 rounded">
      <div className="flex items-center justify-between">
        <h2
          className={`text-xl mb-2 text-blue-500 ${
            checked ? "line-through text-slate-900" : ""
          }`}
        >
          {title}
        </h2>
        <div className="flex gap-2 items-center">
          {" "}
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
          <button onClick={deleteTodo}>
            <IoTrashBinSharp className="text-xl cursor-pointer text-green-600" />
          </button>
        </div>
      </div>
      <p className="mb-2">Created on : {date.slice(0, 10)}</p>
      <p className="text-sm">{content}</p>
    </div>
  );
};

export default Task;
