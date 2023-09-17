import "./categorylist.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  getCategories,
  getVenders,
  searchCategory,
  searchVenderUser,
  venderBlock,
  venderUnblock,
} from "../../utils/Constants";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";

import { coordunblock, coordblock } from "../../utils/Constants";

import Swal from "sweetalert2";

import Button from "@mui/material/Button";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import CategoryCreateModal from "../../components/modal/CreateCategoryModal";

const CategoryList = () => {
  const [page, setPage] = useState(1);
  const token = useSelector((state) => state.token);
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
      .get(`${getCategories}?page=${page}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
        setPagination(data);
      })
      .catch(handleError);
  };

  const searchUsers = (key) => {
    axios
      .get(`${searchCategory}${key}?page=${page}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
        setPagination(data);
      })
      .catch(handleError);
  };

  useEffect(() => {
    getUsersList();
  }, [page]);

  const handleUpdateClick = () => {
    setIsModalOpen(true);
  };

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const handleCategoryCreated = () => {
    setIsModalOpen(false);
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
          <h1 className="title">EVENT CATEGORY LIST</h1>
          <>
            <div className="datatableTitle">
              Add New Category
              <button className="link" onClick={handleUpdateClick}>
                Add New
              </button>
              <CategoryCreateModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCategoryCreated={handleCategoryCreated}
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
                    <TableCell>Category Name</TableCell>
                    <TableCell align="left">Decription</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pagination?.results?.length === 0 ? (
                    "There are no Category"
                  ) : (
                    <>
                      {pagination?.results?.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell component="th" scope="row">
                            {row.id}
                          </TableCell>
                          <TableCell className="tableCell">
                            <Link to={`/categories/${row.id}`} className="link">
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
                          <TableCell align="left">{row.description}</TableCell>
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

export default CategoryList;
