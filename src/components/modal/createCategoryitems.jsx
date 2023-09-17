import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {  getCategory } from "../../utils/Constants";


const CategoryItemCreateModal = ({
  isOpen,
  onClose,
  onCategoryCreated,

}) => {
  const [selectedEvent, setSelectedEvent] = useState("");

  const [updatedName, setUpdatedName] = useState("");
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      name: updatedName,
      type: selectedEvent,
    };

    axios
      .post(getCategory, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        navigate("/categories");
        onCategoryCreated(); 
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleEventChange = (event) => {
    setSelectedEvent(event.target.value);
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
          Create Events
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Name" onChange={handleNameChange} fullWidth />
         
          <Box sx={{ mt: 2 }}>
            <Button type="submit">Create</Button>
            <Button onClick={onClose}>Cancel</Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default CategoryItemCreateModal;
