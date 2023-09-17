// import "./list.scss";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
// import Datatable from "../../components/datatable/Datatable";
// import { useEffect, useState } from "react";
// import axios from "../../utils/axios";
// import { useNavigate } from "react-router-dom";
// import {
//   categoryColumns,
//   eventColumns,
//   itemColoumns,
// } from "../../datatablesource";

// const columnsMap = {

//   categories: categoryColumns,
//   events: eventColumns,
//   items:itemColoumns
// };

// const List = ({ url, columnsType }) => {
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     getList();
//   }, [navigate]);

//   const getList = async () => {
//     axios
//       .get(`${url}`)
//       .then((response) => {
//         setData(response?.data.results ?? []);
//       })
//       .catch((error) => {
//         setError("An error occurred while fetching data.");
//       });
//   };

//   const columns = columnsMap[columnsType] || [];

//   return (
//     <div className="list">
//       <Sidebar />
//       <div className="listContainer">
//         <Navbar />
//         {error ? (
//           <div className="error">{error}</div>
//         ) : (
//           <Datatable data={data} columns={columns} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default List;
import "./list.scss";
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
  getItems,
  getUserItemsBookings,
  searchUserItems,
  searchsupplierItems,
} from "../../utils/Constants";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";

import Button from "@mui/material/Button";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const VenderOrderList = () => {
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
      .get(`${getItems}?page=${page}`, {
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
      .get(`${searchsupplierItems}${key}?page=${page}`, {
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

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prePage = () => {
    setPage((prevPage) => prevPage - 1);
  };
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="bottom">
          <h1 className="title">COORDINATOR EVENTS LIST</h1>
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
                    <TableCell>Item Name</TableCell>

                    <TableCell align="left">Vender</TableCell>

                    <TableCell align="left">Prices</TableCell>
                    <TableCell align="left">Quantity</TableCell>
                    <TableCell align="left">Avialiablity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pagination?.results?.length === 0 ? (
                    "There are no User Items Orders"
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
                                src={
                                  row.imageUrl
                                    ? row.imageUrl
                                    : "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                                }
                                alt=""
                                className="image"
                              />
                              {row.name}
                            </div>
                          </TableCell>

                          <TableCell align="left">
                            {row?.supplier.username}
                          </TableCell>
                          <TableCell align="left">{row.price}</TableCell>
                          <TableCell align="left">{row.quantity}</TableCell>
                          <TableCell align="left">
                            {row.available ? "avialiable" : "not avialable"}
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
        </div>
      </div>
    </div>
  );
};

export default VenderOrderList;
