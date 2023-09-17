import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import CategoryModal from "../../components/modal/UpdateCategoryModal";
import axios from "../../utils/axios";
import { useParams } from "react-router-dom";
import { getCategories } from "../../utils/Constants";
import { Box, Button } from "@mui/material";
const CategorySingle = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get(`${getCategories}${id}`).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  }, [id]);

  const handleUpdateClick = () => {
    setIsModalOpen(true);
  };

  const handleSave = (name) => {
    setIsModalOpen(false);
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton" onClick={handleUpdateClick}>
              Edit
            </div>
            <CategoryModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSave={handleSave}
              name={data.name}
              id={data.id}
              description={data.description}
            />

            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{data.name}</h1>

                <div className="detailItem">
                  <span className="itemKey">Name:</span>
                  <span className="itemValue">{data.name}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">{data.description}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="right">
          <Box sx={{ mt: 2 }}>
            <span style={{ color: "red" }}>
              Change Image? <Button type="submit">here</Button>
            </span>
          </Box>
        </div> */}
      </div>
    </div>
  );
};

export default CategorySingle;
