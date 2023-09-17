import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button } from "@mui/material";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "../../utils/axios";
import { getEvents } from "../../utils/Constants";
import EventModal from "../../components/modal/UpdateEventModal";

const EventSingle = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState({});
  const handleUpdateClick = () => {
    setIsModalOpen(true);
  };

  const handleSave = (name) => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${getEvents}${id}`);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const { name, description, type } = data;

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
            <EventModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              //   onSave={handleSave}
              name={name}
              id={id}
              type={type}
            />
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{name}</h1>

                <div className="detailItem">
                  <span className="itemKey">Event Name:</span>
                  <span className="itemValue">{name}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Event Type:</span>
                  <span className="itemValue">{type?.name}</span>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="right">
            <Box sx={{ mt: 2 }}>
              <span style={{color:"red"}}>
                Change Image? <Button type="submit">here</Button>
              </span>
            </Box>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default EventSingle;
