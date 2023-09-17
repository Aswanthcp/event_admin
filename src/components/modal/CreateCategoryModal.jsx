import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCategories } from "../../utils/Constants";

const CategoryCreateModal = ({ isOpen, onClose, onCategoryCreated }) => {
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      name: updatedName,
      description: updatedDescription,
    };

    axios
      .post(getCategories, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate("/categories");
        onCategoryCreated(); // Notify parent component about category creation
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleNameChange = (event) => {
    setUpdatedName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setUpdatedDescription(event.target.value);
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
          Create Category
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Name" onChange={handleNameChange} fullWidth />
          <TextField label="Description" onChange={handleDescriptionChange}fullWidth/>
          <Box sx={{ mt: 2 }}>
            <Button type="submit">Create</Button>
            <Button onClick={onClose}>Cancel</Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default CategoryCreateModal;
