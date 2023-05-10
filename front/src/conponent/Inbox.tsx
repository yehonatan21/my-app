import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridRowsProp,
} from "@mui/x-data-grid";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useContext, useState } from "react";
import { LoginContext } from "./Context/UserContext";
import axios from "axios";

interface Email {
  id: string;
  sender: string;
  recipient: string;
  subject: string;
  body: string;
}

const EmailList: React.FC = () => {
  const { loginUser } = useContext(LoginContext);
  const [emails, setEmails] = useState<any[]>([]);
  const getEmails = async () => {
    const response = await axios.get("http://127.0.0.1:8000/mail/", {
      withCredentials: true,
      headers: {
        authorization: `Bearer ${loginUser.token}`,
      },
    });
    const result = response.data.filter(
      (post: Email) => post.recipient === loginUser?.user.email
    );
    setEmails(result);
  };

  React.useEffect(() => {
    getEmails();
  }, []);

  const rows: GridRowsProp = emails as any;

  const columns: GridColDef[] = [
    // { field: "id", headerName: "id" }, // FIXME: time stamp
    { field: "sender", headerName: "Sender", width: 150 },
    { field: "recipient", headerName: "Recipient", width: 150 },
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

  const handleDelete = async (mail: any) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/mail/delete/${mail.id}`,
        {
          withCredentials: true,
          headers: {
            authorization: `Bearer ${loginUser.token}`,
          },
        }
      );
      await getEmails();
    } catch (e: any) {
      console.log(e.message);
    }
    handleClose();
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
        <Button variant="contained" onClick={() => handleDelete(selectedRow)}>
          Delete
        </Button>
      </Dialog>
    </div>
  );
};

export default EmailList;
