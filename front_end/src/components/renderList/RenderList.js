import React, { useContext, useState } from "react";
import axios from "axios";
import context from "../../data/contex";
import EditTask from "./EditTask";

import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import UndoIcon from '@mui/icons-material/Undo';

const RenderList = (props) => {
    console.log("hi")
  const [editableId, setEditableID] = useState("");

  const con = useContext(context);
  const [editable, setEditable] = useState(false);

  const handleUpdate = (id, status, taskName, priority, dueDate) => {
    (async () => {
      try {
        if (taskName && priority && dueDate) {
          await axios.patch(`http://localhost:3080/task/${id}`, {
            update: { taskName, priority, dueDate },
          });
        } else {
          await axios.patch(`http://localhost:3080/task/${id}`, {
            update: { status: status },
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
    if (item.status == props.status) {
      return (
        <div className="todo-list-item" key={item._id}>
          <div>
            <h3>{item.taskName}</h3>
            <h4>Priority :{item.priority}</h4>
            <p>Due Date :{item.dueDate.split("T")[0]}</p>
            <p>Status :{item.status}</p>
          </div>

          <Box sx={{ "& > :not(style)": { m: 3, p: 4 } }}>
            {!editable &&
              !(item.status === "pending") &&
              !(item.status === "completed") && (
                <Fab
                  variant="extended"
                  color="secondary"
                  onClick={() => handleUpdate(item._id, "pending")}
                >
                  <PauseCircleFilledIcon sx={{ mr: 1 }} />
                  Make As Pending
                </Fab>
              )}
            {!editable && !(item.status === "completed") && (
              <Fab
                color="primary"
                aria-label="check"
                onClick={() => handleUpdate(item._id, "completed")}
              >
                <CheckIcon />
              </Fab>
            )}
            {!editable && (
              <Fab
                color="secondary"
                aria-label="edit"
                onClick={() => {
                  //   handleEdit(
                  //     item._id,

                  //     item.taskName,
                  //     item.priority,
                  //     item.dueDate.split("T")[0]
                  //   )

                  setEditable(false);
                  setEditableID(item._id);
                 
                }}
              >
                <EditIcon />
              </Fab>
            )}
            {!editable && (
              <Fab
                variant="extended"
                color="error"
                onClick={() => handleDeleteTodo(item._id)}
              >
                <DeleteIcon sx={{ mr: 1 }} />
                Delete
              </Fab>
            )}

            {!(item.status==="inProgress") &&
                <Fab
                color="black"
                aria-label="check"
                onClick={() => handleUpdate(item._id, "inProgress")}
              >
                <UndoIcon />
              </Fab>
            }
          </Box>
          {item._id == editableId &&  (
            <EditTask
              id={item._id}
              status={item.status}
              taskName={item.taskName}
              priority={item.priority}
              dueDate={item.dueDate}
              handleUpdate={handleUpdate}
              setEditable={setEditable}
              setEditableID={setEditableID}
            />
          )}
        </div>
      );
    }
  });
};

export default RenderList;
