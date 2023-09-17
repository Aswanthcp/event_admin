import "./eventlist.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getCategories, getEvents, searchCategory, searchEvent } from "../../utils/Constants";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import Button from "@mui/material/Button";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import EventCreateModal from "../../components/modal/CreateEventModal";

const EventLists = () => {
  const [page, setPage] = useState(1);
  const token = useSelector((state) => state.token);
  const [eventOptions, setEventOptions] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pagination, setPagination] = useState({
    hasNextPage: false,
    hasPrevPage: false,
    currentPage: 1,
    totalPages: 1,
    results: [],
  });
  const generateError = (error) =>
    toast.error(error, {
      position: "top-right",
    });

  const searchBy = (e) => {
    const key = e.target.value;
    if (!key) {
      getUsersList();
    } else {
      searchEvents(key);
    }
  };

  const handleError = (error) => {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : "Network error. Please try again later.";
    toast.error(errorMessage, {
      position: "top-right",
    });
  };

  const getUsersList = () => {
    axios
      .get(`${getEvents}?page=${page}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {

        setPagination(data);
      })
      .catch(handleError);
  };

  const searchEvents = (key) => {
    axios
      .get(`${searchEvent}${key}?page=${page}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
      
        setPagination(data);
      })
      .catch(handleError);
  };

  useEffect(() => {
    getUsersList();
    axios
      .get(getCategories)
      .then((response) => {
        console.log(response.data,'1111111111111111111111111111111111111');
        setEventOptions(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [page]);
  

  const handleUpdateClick = () => {
    setIsModalOpen(true);
  };

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const handleCategoryCreated = () => {
    setIsModalOpen(false);
    window.location.reload(false)
  };

  const prePage = () => {
    setPage((prevPage) => prevPage - 1);
  };
  return (
    <div className="list">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="bottom">
          <h1 className="title">EVENTS LIST</h1>
          <>
            <div className="datatableTitle">
              Add New Events
              <button className="link" onClick={handleUpdateClick}>
                Add New
              </button>
              <EventCreateModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCategoryCreated={handleCategoryCreated}
                eventtype={eventOptions}
              />
            </div>
            <div className="search">
              <input
                type="text"
                placeholder="Search"
                onChange={searchBy}
                className="input-search"
              />
              <SearchOutlinedIcon className="search-icon" />
            </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="user table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Event Name</TableCell>
                    <TableCell align="left">Event Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pagination?.results?.length === 0 ? (
                    "There are no Event"
                  ) : (
                    <>
                      {pagination?.results?.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell component="th" scope="row">
                            {row.id}
                          </TableCell>
                          <TableCell className="tableCell">
                            <Link to={`/events/${row.id}`} className="link">
                              <div className="cellWrapper">
                                {/* <img
                                  src="https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                                  alt=""
                                  className="image"
                                /> */}
                                {row.name}
                              </div>
                            </Link>
                          </TableCell>
                          <TableCell align="left">{row.type.name}</TableCell>
                        </TableRow>
                      ))}
                    </>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="pagination">
              {pagination.hasPrevPage && (
                <Button onClick={prePage} variant="outlined">
                  Previous
                </Button>
              )}
              {pagination.hasNextPage && (
                <Button onClick={nextPage} variant="outlined">
                  Next
                </Button>
              )}
            </div>
            <ToastContainer position="top-right" />
          </>
        </div>
      </div>
    </div>
  );
};

export default EventLists;
