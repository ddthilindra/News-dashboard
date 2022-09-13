import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React from 'react'

export default function CategoryTbl(props) {
  return (
    <div>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#b0cbea" }}>
            <TableRow>
                <TableCell className="tableCell">Category Name</TableCell>
                <TableCell className="tableCell">Description</TableCell>
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
              </TableRow>
            ))}

            
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
  )
}
