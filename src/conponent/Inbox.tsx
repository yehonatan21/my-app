import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridRowsProp,
} from "@mui/x-data-grid";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";

interface Email {
  id: number;
  sender: string;
  recipient: string;
  subject: string;
  body: string;
}

const emails: Email[] = [
  {
    id: 1,
    sender: "jane@example.com",
    recipient: "john@example.com",
    subject: "Meeting Reminder",
    body: "Just a reminder that we have a meeting at 2pm today.",
  },
  {
    id: 2,
    sender: "bob@example.com",
    recipient: "jane@example.com",
    subject: "New Project",
    body: "I have a new project proposal that I would like to discuss.",
  },
  {
    id: 3,
    sender: "john@example.com",
    recipient: "bob@example.com",
    subject: "Vacation Request",
    body: "I would like to request vacation time for next week.",
  },
];

interface Email {
  id: number;
  sender: string;
  recipient: string;
  subject: string;
  body: string;
}

const EmailList: React.FC = () => {
  const rows: GridRowsProp = [...emails];

  const columns: GridColDef[] = [
    { field: "id", headerName: "id" },
    { field: "sender", headerName: "Sender", width: 150 },
    { field: "recipient", headerName: "Recipient", width: 150 },
    { field: "subject", headerName: "Subject", width: 150 },
  ];

  const [selectedRow, setSelectedRow] = useState<any>(null); //FIXME: any

  const handleRowClick = (params: GridRowParams) => {
    const selectedRow = rows.find((row) => row.id === params.id) ?? null;
    console.log(selectedRow);
    setSelectedRow(selectedRow);
  };

  const handleClose = () => {
    setSelectedRow(null);
  };

  return (
    //FIXME: position
    <div style={{ display: "flex" }}>
      <DataGrid
        sx={{ height: 300, width: "100%" }}
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
