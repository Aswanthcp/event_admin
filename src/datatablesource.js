import { Link } from "react-router-dom";

export const clientColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "username",
    headerName: "User",
    width: 230,
    renderCell: (params) => (
      <Link to={`/clients/${params.row.id}`} className="link">
        <div className="cellWithImg">
          <img
            className="cellImg"
            src="https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt="avatar"
          />
          {params.row.username}
        </div>
      </Link>
    ),
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "phone_number",
    headerName: "Phone Number",
    width: 230,
  },
  {
    field: "first_name",
    headerName: "Firts Name",
    width: 230,
  },
  {
    field: "last_name",
    headerName: "Last Name",
    width: 230,
  },
  {
    field: "is_active",
    headerName: "Active",
    width: 120,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "block",
    headerName: "Block",
    width: 120,
    renderCell: ({ row }) => <button>Block</button>,
  },
];

export const cordColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "username",
    headerName: "User Name",
    width: 230,
    renderCell: (params) => (
      <Link to={`/cordinators/${params.row.id}`} className="link">
        <div className="cellWithImg">
          <img
            className="cellImg"
            src="https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt="avatar"
          />
          {params.row.username}
        </div>
      </Link>
    ),
  },

  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "name",
    headerName: "Full Name",
    width: 230,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 200,
  },

  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "block",
    headerName: "Block",
    width: 120,
    renderCell: ({ row }) => <button>Block</button>,
  },
  {
    field: "approved",
    headerName: "Approved",
    width: 120,
    renderCell: ({ value }) => (value ? "Approved" : <button>Approve</button>),
  },
];

export const categoryColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Category Name",
    width: 400,
    renderCell: (params) => (
      <Link to={`/users/${params.value}`} className="link">
        <div className="cellWithImg">
          <img
            className="cellImg"
            src="https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt="avatar"
          />
          {params.row.name}
        </div>
      </Link>
    ),
  },

  {
    field: "description",
    headerName: "Description",
    width: 500,
  },
  {
    field: "update",
    headerName: "",
    width: 120,
    renderCell: ({ value }) =>
      value ? "Approved" : <button className="update-btn">Update</button>,
  },
  {
    field: "delete",
    headerName: "",
    width: 120,
    renderCell: ({ row }) => <button className="delete-btn">Delete</button>,
  },
];

export const eventColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Event Name",
    width: 320,
    renderCell: (params) => (
      <Link to={`/users/${params.value}`} className="link">
        <div className="cellWithImg">
          <img
            className="cellImg"
            src="https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt="avatar"
          />
          {params.row.name}
        </div>
      </Link>
    ),
  },

  {
    field: "date_available",
    headerName: "Date Avialiable",
    width: 320,
  },
  {
    field: "price",
    headerName: "Price Starts",
    width: 120,
  },
  {
    field: "type",
    headerName: "Category",
    width: 120,
  },
  {
    field: "update",
    headerName: "",
    width: 120,
    renderCell: ({ value }) =>
      value ? "Approved" : <button className="update-btn">Update</button>,
  },
  {
    field: "delete",
    headerName: "",
    width: 120,
    renderCell: ({ row }) => <button className="delete-btn">Delete</button>,
  },
];

export const ClientkeyMap = {
  username: "Username",
  email: "Email",
  phone_number: "Phone Number",
  first_name: "First Name",
  last_name: "Last Name",
};

export const cordkeyMap = {
  name: "Full Name",
  email: "Email",
  phone_number: "Phone Number",
  discription: "Description",
  approved: "Approved",
};


export const itemColoumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "ITEM Name",
    width: 320,
    renderCell: (params) => (
      <Link to={`/users/${params.value}`} className="link">
        <div className="cellWithImg">
          {params.row.name}
        </div>
      </Link>
    ),
  },

  {
    field: "description",
    headerName: "Description",
    width: 320,
  },
  {
    field: "item_type",
    headerName: "Item Type",
    width: 320,
  },
  {
    field: "supplier",
    headerName: "Item Supplier",
    width: 120,
  },

  {
    field: "update",
    headerName: "",
    width: 120,
    renderCell: ({ value }) =>
      value ? "Approved" : <button className="update-btn">Update</button>,
  },
  {
    field: "delete",
    headerName: "",
    width: 120,
    renderCell: ({ row }) => <button className="delete-btn">Delete</button>,
  },
];