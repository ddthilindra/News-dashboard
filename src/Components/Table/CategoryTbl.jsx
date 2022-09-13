import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import DeleteCategory from "../Popups/DeleteCategory";

export default function CategoryTbl(props, ) {
  const [categoryRecordForDelete, setcategoryRecordForDelete] = useState(null);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);

  const openInDeletePopup = async (item) => {
    setcategoryRecordForDelete(item);
    setOpenDeletePopup(true);
  };
  return (
    <div>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#b0cbea" }}>
            <TableRow>
              <TableCell className="tableCell">Category Name</TableCell>
              <TableCell className="tableCell">Description</TableCell>
              <TableCell className="tableCell">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((data) => (
              <TableRow key={data.id} className="tableCell">
                <TableCell className="tableCell">
                  <span>
                    {data.category} {data.lastName}
                  </span>
                </TableCell>

                <TableCell className="tableCell">
                  <span>{data.description}</span>
                </TableCell>
                <TableCell className="tableCell">
                  <IconButton>
                    <DeleteOutlined onClick={() => openInDeletePopup(data)} />
                  </IconButton>
                  
                </TableCell>
              </TableRow>
            ))}
            <DeleteCategory
                    openDeletePopup={openDeletePopup}
                    setOpenDeletePopup={setOpenDeletePopup}
                    categoryRecordForDelete={categoryRecordForDelete}
                  ></DeleteCategory>
          </TableBody>
        </Table>

        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </TableContainer>
    </div>
  );
}
