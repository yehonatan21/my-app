import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridRowsProp,
} from "@mui/x-data-grid";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useContext, useState } from "react";
import { LoginContext } from "./Context/UserContext";
import { v4 as uuidv4 } from "uuid";

interface Email {
  id: string;
  sender: string;
  recipients: string;
  subject: string;
  body: string;
}

const EmailList: React.FC = () => {
  const { loginUser } = useContext(LoginContext);
  const posts = JSON.parse(localStorage.getItem("posts") || "[]");
  const matchingEmail: Email[] = posts.find(
    (post: Email) => post.recipients === loginUser?.email
  );

  const rows: GridRowsProp = matchingEmail
    ? [
        {
          ...matchingEmail,
          id: uuidv4(),
        },
      ]
    : [];

  const columns: GridColDef[] = [
    // { field: "id", headerName: "id" }, // FIXME: time stamp
    { field: "sender", headerName: "Sender", width: 150 },
    { field: "recipients", headerName: "Recipient", width: 150 },
    { field: "subject", headerName: "Subject", width: 150 },
  ];

  const [selectedRow, setSelectedRow] = useState<any>(null); //FIXME: any

  const handleRowClick = (params: GridRowParams) => {
    const selectedRow = rows.find((row) => row.id === params.id) ?? null;
    setSelectedRow(selectedRow);
  };

  const handleClose = () => {
    setSelectedRow(null);
  };

  return (
    //FIXME: position and style
    <div style={{ display: "flex" }}>
      <DataGrid
        sx={{
          backgroundColor: "white",
          m: 2,
          height: 300,
          width: "100%",
          boxShadow: 2,
          border: 2,
          borderColor: "primary.light",
          "& .MuiDataGrid-cell:hover": {
            cursor: "pointer",
            color: "primary.main",
          },
        }}
        onRowClick={handleRowClick}
        rows={rows}
        columns={columns}
      />
      <Dialog open={!!selectedRow} onClose={handleClose}>
        <DialogTitle>{selectedRow?.subject}</DialogTitle>
        <DialogContent>{selectedRow?.body}</DialogContent>
      </Dialog>
    </div>
  );
};

export default EmailList;
