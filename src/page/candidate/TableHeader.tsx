import { TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";

const TableHeader = () => {
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell align="center" style={{ fontWeight: "800" }}>
            First Name
          </TableCell>
          <TableCell align="center" style={{ fontWeight: "800" }}>
            Last Name
          </TableCell>
          <TableCell align="center" style={{ fontWeight: "800" }}>
            Email
          </TableCell>
          <TableCell align="center" style={{ fontWeight: "800" }}>
            Phone
          </TableCell>
          <TableCell align="center" style={{ fontWeight: "800" }}>
            Skill
          </TableCell>
          <TableCell align="center" style={{ fontWeight: "800" }}>
            Address
          </TableCell>
          <TableCell align="center" style={{ fontWeight: "800" }}>
            City
          </TableCell>
          <TableCell align="center" style={{ fontWeight: "800" }}>
            State
          </TableCell>
          <TableCell align="center" style={{ fontWeight: "800" }}>
            Edit
          </TableCell>
        </TableRow>
      </TableHead>
    </>
  );
};

export default TableHeader;
