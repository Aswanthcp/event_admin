
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState } from "react";




const Datatable = ({ data,columns }) => {
  const [datas] = useState(data);
  console.log(data)


  const rows = data?.map(({ ...obj }) => obj);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        ITEMS LIST
      </div>
      

      <DataGrid
        className="datagrid"
        rows={rows}
        columns={columns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
