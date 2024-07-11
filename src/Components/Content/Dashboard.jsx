import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { apiUrl } from "./Home";
import EditBox from "./EditBox";

export default function DataTable() {
  const [userList, setUserList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({});
  const [title, setTitle] = React.useState("");
  const dataName = "student";

  // Fetch API
  React.useEffect(() => {
    setLoading(true);
    fetch(`${apiUrl}/${dataName}`)
      .then((res) => res.json())
      .then((userData) => {
        setUserList(userData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  // Handle
  const handleRowClick = (params) => {
    setFormData(params.row);
  };

  const handleEdit = (user) => {
    setOpen(true);
    setTitle("EDIT DATA");
    setFormData(user);
  };
  // Add
  const addSubmit = (event) => {
    event.preventDefault();

    fetch(`${apiUrl}/${dataName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserList((prevUserList) => [...prevUserList, data]);
        setOpen(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // Edit
  const editSubmit = (event) => {
    event.preventDefault();

    fetch(`${apiUrl}/${dataName}/${formData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((updatedData) => {
        setUserList((prevUserList) =>
          prevUserList.map((user) =>
            user.id === updatedData.id ? updatedData : user
          )
        );
        setOpen(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // Delete
  const confirmDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this data?"
    );
    if (confirmed) {
      deleteStaff(id);
    }
  };

  const deleteStaff = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${dataName}/${id}`);
      setUserList((prevUserList) => prevUserList.filter((u) => u.id !== id));
      alert("Delete completed!");
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };
  // Data grid
  const columns = React.useMemo(
    () => [
      { field: "id", headerName: "ID", width: 100 },
      {
        field: "image",
        headerName: "Avatar",
        width: 100,
        renderCell: (userList) => <Avatar src={userList.row.image} />,
        sortable: false,
        filterable: false,
      },
      { field: "name", headerName: "Name", width: 200 },
      { field: "dateofbirth", headerName: "Date of Birth", width: 150 },
      { field: "class", headerName: "Class", width: 150 },
      { field: "feedback", headerName: "Feedback", width: 150 },
      { field: "gender", headerName: "Gender", width: 150 },
      {
        field: "actions",
        headerName: "Action",
        type: "actions",
        width: 300,
        renderCell: (userList) => (
          <div className="flex justify-evenly w-full">
            <Button
              onClick={() => handleEdit(userList.row)}
              variant="contained"
            >
              UPDATE
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => confirmDelete(userList.row.id)}
            >
              DELETE
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <CircularProgress size={80} />
      </Box>
    );
  }

  return (
    <div className="absolute top-12 left-0 bg-white w-full h-[50em] pt-[5em]">
      {userList.length > 0 ? (
        <React.Fragment>
          <div className="absolute top-10 left-5">
            <Button
              variant="contained"
              onClick={() => {
                setOpen(true);
                setTitle("ADD DATA");
                setFormData({});
              }}
            >
              <Typography>ADD DATA (+)</Typography>
            </Button>
          </div>
          <EditBox
            title={title}
            open={open}
            setOpen={setOpen}
            onSubmit={title === "ADD DATA" ? addSubmit : editSubmit}
            formData={formData}
            setFormData={setFormData}
          />
          <Stack sx={{ height: 400, width: "100%", bgcolor: "white" }}>
            <DataGrid
              rows={userList}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              onRowClick={handleRowClick}
              pageSizeOptions={[5, 10]}
            />
          </Stack>
        </React.Fragment>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <CircularProgress size={80} />
        </Box>
      )}
    </div>
  );
}
