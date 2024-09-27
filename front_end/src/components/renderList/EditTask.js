import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    props.setEditable(false);
    props.setEditableID("")
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            props.handleUpdate(props.id,
                props.status,
                event.target.elements["taskName"].value,
                event.target.elements["priority"].value,
                event.target.elements["dueDate"].value
                
                )
            props.setEditable(false);
            props.setEditableID("");
            handleClose();
          },
        }}
      >
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            defaultValue={props.taskName}
            id="name"
            name="taskName"
            label="Task Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <Select
            variant="standard"
            sx={{ mt: 2, mb: 2, minWidth: 120 }}
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            defaultValue={props.priority}
            name="priority"
            label="Priority"
          >
            <MenuItem value={"low"}>Low</MenuItem>
            <MenuItem value={"medium"}>Medium</MenuItem>
            <MenuItem value={"high"}>High</MenuItem>
          </Select>
          <TextField
            autoFocus
            required
            id="name"
            name="dueDate"
            margin="dense"
            defaultValue={props.dueDate.split("T")[0]}
            label="Due Date"
            type="date"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
        <Stack direction="row" spacing={3} sx={{
    m: 3,
    p: 2, 
    bgcolor: 'background.paper', 
    borderRadius: 3, 
    boxShadow: 3, 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    width: '100%', 
    maxWidth: '600px', 
  }}>
      <Button variant="outlined" startIcon={<CloseIcon />} onClick={handleClose}>
      CANCEL
      </Button>
      <Button type="submit" variant="contained" endIcon={<SendIcon />}>
        SUBMIT
      </Button>
    </Stack>
          
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
