import "./table.scss";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import axios from "../../utils/axios";
import {
  getUsers,
  Userblock,
  Userunblock,
  searchUser,
} from "../../utils/Constants";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const List = () => {
  const [page, setPage] = useState(1);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
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
      searchUsers(key);
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
      .get(`${getUsers}?page=${page}`, {
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

  const searchUsers = (key) => {
    axios
      .get(`${searchUser}${key}?page=${page}`, {
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
  }, [page]);

  const blockUser = (id) => {
    axios
      .patch(
        `${Userblock}${id}?page=${page}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setPagination(response.data);
        navigate("/clients");
      })
      .catch((error) => {
        if (error.response) {
          generateError(error.response.data.message);
        } else {
          generateError("Network error. Please try again later.");
        }
      });
  };

  const unblockUser = (id) => {
    axios
      .patch(
        `${Userunblock}${id}?page=${page}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setPagination(response.data);
        navigate("/clients");
      })
      .catch((error) => {
        if (error.response) {
          generateError(error.response.data.message);
        } else {
          generateError("Network error. Please try again later.");
        }
      });
  };

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prePage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  return (
    <>
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
              <TableCell>User Name</TableCell>
              <TableCell align="left">First Name</TableCell>
              <TableCell align="left">Last Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pagination?.results?.length === 0 ? (
              "There are no Users"
            ) : (
              <>
                {pagination?.results?.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell className="tableCell">
                      <div className="cellWrapper">
                        <img
                          src="https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                          alt=""
                          className="image"
                        />
                        {row.username}
                      </div>
                    </TableCell>
                    <TableCell align="left">{row.first_name}</TableCell>
                    <TableCell align="left">{row.last_name}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">
                      {row.blocked ? "Blocked" : "Active"}
                    </TableCell>
                    <TableCell align="left">
                      {row?.is_approved === false ? (
                        <Button
                          onClick={() => {
                            Swal.fire({
                              title: "Are you sure?",
                              text: "You won't be able to revert this!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, unblock it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                unblockUser(row.id);
                                navigate("/clients");
                              }
                            });
                          }}
                          variant="outlined"
                          color="success"
                        >
                          UNBLOCK
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            Swal.fire({
                              title: "Are you sure?",
                              text: "You won't be able to revert this!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, block it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                blockUser(row.id);
                                navigate("/clients");
                              }
                            });
                          }}
                          variant="outlined"
                          color="error"
                        >
                          BLOCK
                        </Button>
                      )}
                    </TableCell>
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
  );
};

export default List;
