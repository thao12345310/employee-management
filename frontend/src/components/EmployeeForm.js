import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Container, Typography } from "@mui/material";

const EmployeeForm = () => {
  const { id } = useParams(); // Lấy ID từ URL (nếu đang sửa nhân viên)
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    position: "",
  });

  // Nếu có ID, lấy thông tin nhân viên từ API để sửa
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/api/employees/${id}`)
        .then((response) => {
          setEmployee(response.data);
        })
        .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
    }
  }, [id]);

  // Xử lý thay đổi input
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý submit form (thêm mới hoặc cập nhật)
  const handleSubmit = (event) => {
    event.preventDefault();

    if (id) {
      // Cập nhật nhân viên
      axios
        .put(`http://localhost:8080/api/employees/${id}`, employee)
        .then(() => navigate("/"))
        .catch((error) => console.error("Lỗi khi cập nhật:", error));
    } else {
      // Thêm nhân viên mới
      axios
        .post("http://localhost:8080/api/employees", employee)
        .then(() => navigate("/"))
        .catch((error) => console.error("Lỗi khi thêm mới:", error));
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" style={{ marginBottom: "20px" }}>
        {id ? "Chỉnh sửa nhân viên" : "Thêm nhân viên"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Tên nhân viên"
          name="name"
          value={employee.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={employee.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Vị trí"
          name="position"
          value={employee.position}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {id ? "Cập nhật" : "Thêm"}
        </Button>
      </form>
    </Container>
  );
};

export default EmployeeForm;
