import React, { useState, useContext } from "react";
import "../../App.css";
import axios from "axios";
import context from "../../data/contex";
const AddToDo = () => {
  const con = useContext(context);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newPriority, setNewPriority] = useState("low");

  const handleAddTodo = async () => {
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
    } catch (error) {
      console.log(error);
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
            placeholder="What's the task title?"
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
            placeholder="What's the task description?"
          />
        </div>
        <div className="todo-input-item">
          <label>Due Date</label>
          <input
            type="date"
            value={newDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(date) => setNewDate(date.target.value)}
            placeholder="What's the task description?"
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
        <div className="todo-input-item">
          <button type="button" onClick={handleAddTodo} className="primaryBtn">
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default AddToDo;
