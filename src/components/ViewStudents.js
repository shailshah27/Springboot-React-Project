import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ViewStudents(props) {
  const [students, setStudents] = useState([]);

  if (sessionStorage.getItem("is_reloaded")) alert("Reloaded!");

  useEffect(() => {
    axios
      .get("http://localhost:8080/students")
      .then((response) => setStudents(response.data))
      .catch((error) => {
        props.showAlert(error, "danger");
      });
  });

  const deleteStudent = (id, event) => {
    event.preventDefault();
    axios
      .delete("http://localhost:8080/student/" + id)
      .then((response) => {
        props.showAlert(response.data, "danger");
      })
      .catch((error) => {
        props.showAlert(error, "danger");
      });
  };

  return (
    <Card className="my-3">
      <Card.Header>Students List</Card.Header>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Student Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.address}</td>
                <td>
                  <Link to={"/updateStudent/" + student.id}>
                    <Button variant="primary">
                      <FontAwesomeIcon icon={faEdit}> Edit</FontAwesomeIcon>
                    </Button>
                  </Link>{" "}
                  <Button
                    variant="danger"
                    onClick={deleteStudent.bind(this, student.id)}
                  >
                    <FontAwesomeIcon icon={faTrash}> Delete</FontAwesomeIcon>
                  </Button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Card.Footer>This is the information of students</Card.Footer>
    </Card>
  );
}
