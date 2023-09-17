import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCategories, getEvents, updateCategory } from "../../utils/Constants";
import { type } from "@testing-library/user-event/dist/type";
const EventModal = ({
  isOpen,
  onClose,
  name,
  id,
  type,

}) => {
  const [updatedName, setUpdatedName] = useState(name);
//   const [updatedDescription, setUpdatedDescription] = useState(description);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
//   console.log(updatedDescription,updatedDescription);
  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      'name':updatedName?updatedName:name,
      'type':type,
    };
    
    axios
    .put(`${getEvents}${id}`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      navigate("/events");
    })
    .catch((error) => {
      console.error(error);
    });
  };
  
  const handleNameChange = (event) => {
    setUpdatedName(event.target.value);
  };


  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" id="modal-title">
          Update Category
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            defaultValue={updatedName ? updatedName : name}
            onChange={handleNameChange}
            fullWidth
          />
          <TextField
            label="Category"
            defaultValue={type?.name}
            disabled
            fullWidth
          />
          <Box sx={{ mt: 2 }}>
            <Button type="submit">update</Button>
            <Button onClick={onClose}>Cancel</Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EventModal;
