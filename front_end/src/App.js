import React, { useState, useEffect } from "react";
import "./App.css";
import { AiOutlineDelete} from "react-icons/ai";

import AddToDo from "./components/addToDo/AddToDo";
import RenderList from "./components/renderList/RenderList";
import axios from "axios";
import context from "./data/contex";
function App() {
  const [allTodos, setTodos] = useState([]);
  const [render,setRender]=useState(false);
  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get("http://localhost:3080/task");
        setTodos(result.data.result);
        setRender(false)
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [render]);

  const [isCompleteScreen, setIsCompleteScreen] = useState (false);

  const [completedTodos, setCompletedTodos] = useState ([]);
  const [currentEdit,setCurrentEdit] = useState("");
  const [currentEditedItem,setCurrentEditedItem] = useState("");

  const handleDeleteCompletedTodo = index => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice (index);

    localStorage.setItem ('completedTodos', JSON.stringify (reducedTodo));
    setCompletedTodos (reducedTodo);
  };

  const handleUpdateTitle = (value)=>{
    setCurrentEditedItem((prev)=>{
      return {...prev,title:value}
    })
  }

  const handleUpdateDescription = (value)=>{
    setCurrentEditedItem((prev)=>{
      return {...prev,description:value}
    })
  }

  const handleUpdateToDo = ()=>{
      let newToDo = [...allTodos];
      newToDo[currentEdit] = currentEditedItem;
      setTodos(newToDo);
      setCurrentEdit("");
  }

  return (
    <context.Provider value={{ allTodos, setTodos ,setRender}}>
      <div className="App">
        <h1>My Todos</h1>

        <div className="todo-wrapper">
          <AddToDo  />

          <div className="btn-area">
            <button
              className={`secondaryBtn ${isCompleteScreen === false && "active"}`}
              onClick={() => setIsCompleteScreen(false)}
            >
              Todo
            </button>
            <button
              className={`secondaryBtn ${isCompleteScreen === true && "active"}`}
              onClick={() => setIsCompleteScreen(true)}
            >
              Completed
            </button>
          </div>

          <div className="todo-list">
            {!isCompleteScreen && <RenderList status="completed" />}
            {isCompleteScreen && <RenderList status="pending" />}
          
           
          </div> 
        </div>
      </div>
    </context.Provider>
  );
}

export default App;
