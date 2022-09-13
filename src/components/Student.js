import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams, useNavigate } from "react-router-dom";

export default function Student(props) {
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [address, setAddress] = useState();

  const { studentId } = useParams();
  const navigate = useNavigate();

  if (sessionStorage.getItem("is_reloaded")) alert("Reloaded!");

  let student = {
    id: id,
    name: name,
    address: address,
  };

  useEffect(() => {
    if (studentId) {
      axios
        .get("http://localhost:8080/student/" + studentId)
        .then((response) => {
          setId(response.data.id);
          setName(response.data.name);
          setAddress(response.data.address);
        });
    }
  }, []);

  let textChange = (event) => {
    if (event.target.name === "id") {
      setId(event.target.value);
    } else if (event.target.name === "name") {
      setName(event.target.value);
    } else if (event.target.name === "address") {
      setAddress(event.target.value);
    }
  };

  let addStudent = (event) => {
    event.preventDefault();
    if (!studentId) {
      axios
        .post("http://localhost:8080/student", student)
        .then((response) => {
          props.showAlert(response.data, "success");
        })
        .catch((error) => {
          props.showAlert(error, "danger");
        });
    } else {
      axios
        .put("http://localhost:8080/student/" + studentId, student)
        .then((response) => {
          props.showAlert(response.data, "success");
        })
        .catch((error) => {
          props.showAlert(error, "danger");
        });
        navigate("/viewStudent")
    }
    setId('');
    setName('');
    setAddress('');
  };

  return (
    <div className="my-3">
      <Card>
        <Card.Header>Add Student Information</Card.Header>
        <Form onSubmit={addStudent}>
          <Card.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Student ID</Form.Label>
              <Form.Control
                name="id"
                value={id}
                type="text"
                placeholder="Enter id"
                onChange={textChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                name="name"
                value={name}
                type="text"
                placeholder="Enter name"
                onChange={textChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Student Address</Form.Label>
              <Form.Control
                name="address"
                value={address}
                type="text"
                placeholder="Enter address"
                onChange={textChange}
              />
            </Form.Group>
          </Card.Body>
          <Card.Footer>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    </div>
  );
}
