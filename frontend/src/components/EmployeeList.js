import React, { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../services/employeeService";
import {
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await getEmployees();
    setEmployees(response.data);
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    fetchEmployees();
  };

  return (
    <div>
      <h2>Danh sách nhân viên</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Tên</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Chức vụ</TableCell>
            <TableCell>Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell>{emp.id}</TableCell>
              <TableCell>{emp.name}</TableCell>
              <TableCell>{emp.email}</TableCell>
              <TableCell>{emp.position}</TableCell>
              <TableCell>
                <Button color="error" onClick={() => handleDelete(emp.id)}>
                  Xóa
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeeList;
