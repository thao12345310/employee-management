import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import { Container, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Quản lý nhân viên
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Danh sách
          </Button>
          <Button color="inherit" component={Link} to="/add">
            Thêm nhân viên
          </Button>
        </Toolbar>
      </AppBar>

      <Container style={{ marginTop: "20px" }}>
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/add" element={<EmployeeForm />} />
          <Route path="/edit/:id" element={<EmployeeForm />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
