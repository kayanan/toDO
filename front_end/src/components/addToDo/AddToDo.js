import React, { useState, useContext } from "react";
import "../../App.css";
import axios from "axios";
import context from "../../data/contex";
import PopUp from "../../ui/popUp/PopUp";

const AddToDo = () => {
  const con = useContext(context);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newPriority, setNewPriority] = useState("low");
  const [newError, setNewError] = useState("");

  const handleAddTodo = async () => {
    let errorMessage;
    if (newTitle === "") {
      errorMessage = { inputError1: "Title can't be empty!!!!!" };
    }
    if (newDate === "") {
      errorMessage = {
        ...errorMessage,
        inputError2: " Date can't be empty!!!!!",
      };
    }
    if (errorMessage) {
      setNewError(errorMessage);
      return;
    }
    try {
      await axios.post("http://localhost:3080/task", {
        name: newTitle,
        priority: newPriority,
        dueDate: newDate,
      });
      setNewTitle("");
      setNewDescription("");
      setNewDate("");
      setNewPriority("low");
      con.setRender(true);
      setNewError("");
    } catch (error) {
      setNewError(error);
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="todo-input">
        <div className="todo-input-item">
          <label>Title</label>
          <input
            type="text"
            value={newTitle}
            onChange={(title) => setNewTitle(title.target.value)}
            placeholder="Task title?"
          />
        </div>
        <div className="todo-input-item">
          <label>Description</label>
          <input
            type="text"
            value={newDescription}
            onChange={(description) =>
              setNewDescription(description.target.value)
            }
            placeholder="Task description?"
          />
        </div>
        <div className="todo-input-item">
          <label>Due Date</label>
          <input
            type="date"
            value={newDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(date) => setNewDate(date.target.value)}
          />
        </div>
        <div className="todo-input-item">
          <label>Priority</label>
          <select
            onChange={(priority) => setNewPriority(priority.target.value)}
            value={newPriority}
          >
            <option value={"low"}>Low</option>
            <option value={"medium"}>Medium</option>
            <option value={"high"}>High</option>
          </select>
        </div>
        <div >
          <button type="button" onClick={handleAddTodo} className="primaryBtn">
          Add
          </button>
        </div>
      </div>
      {newError && <PopUp newError={newError} setNewError={setNewError} />}
    </>
  );
};

export default AddToDo;
