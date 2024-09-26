import React, { useContext, useState } from "react";
import axios from "axios";
import context from "../../data/contex";


import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

import TextField from '@mui/material/TextField';


const RenderList = (props) => {
  const con = useContext(context);
  const[editable,setEditable]=useState(false);



  const handleEdit = (id, taskName, priority, dueDate) => {
    (async () => {
      try {
        if (taskName && priority && dueDate) {
          await axios.patch(`http://localhost:3080/task/${id}`, {
            update: { taskName, priority, dueDate },
          });
        } else {
          console.log("hiiii complete");
          await axios.patch(`http://localhost:3080/task/${id}`, {
            update: { status: "completed" },
          });
        }

        con.setRender(true);
      } catch (error) {
        console.log(error.message);
      }
    })();
  };

  

  const handleDeleteTodo = (id) => {
    (async () => {
      try {
        await axios.delete(`http://localhost:3080/task/${id}`);
        con.setRender(true);
      } catch (error) {
        console.log(error.message);
      }
    })();
  };

  return con.allTodos.map((item) => {
    if(item.status!==props.status){
        return (
      <div className="todo-list-item" key={item._id}>
        
        <div>
          <h3>{item.taskName}</h3>
          <h4>Priority :{item.priority}</h4>
          <p>Due Date :{item.dueDate.split("T")[0]}</p>
          <p>Status :{item.status}</p>
        </div>

        {/* <div>
           (
            <BsCheckLg
              className="check-icon"
              
              title="Complete?"
            />
          )}
          <AiOutlineEdit
            className="check-icon"
            
            title="Edit?"
          />

          <AiOutlineDelete
            className="icon"
            
            title="Delete?"
          />
          
 

        </div> */}

<Box sx={{ '& > :not(style)': { m:3 ,p:4 } }}>
{!editable && item.status !== "completed" &&<Fab color="primary" aria-label="check" onClick={() => handleEdit(item._id)}>
        <CheckIcon  />
      </Fab>}
      {!editable&&<Fab color="secondary" aria-label="edit" onClick={() =>
            //   handleEdit(
            //     item._id,
            //     item.taskName,
            //     item.priority,
            //     item.dueDate.split("T")[0]
            //   )
            setEditable(true)
            }>
        <EditIcon />
      </Fab>}
      {!editable&& <Fab variant="extended" color="error" onClick={() => handleDeleteTodo(item._id)}>
        <DeleteIcon sx={{ mr: 1  }} />
       Delete
      </Fab>}
       
    </Box>
    {editable && <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="standard-basic" label="Standard" variant="standard" />
    </Box>}
      </div>
    );
}
    
  });
};

export default RenderList;
