import React, { useState } from "react";
import Axios from "axios";
import { Button, Container, Form } from "react-bootstrap";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");

  const onSubmitCustomer = (event) => {
    event.preventDefault();

    Axios.post("http://localhost:3001/api/insert", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      dob: dob,
    })
      .then(() => {
        alert("successful insert");
      })
      .catch((err) => {
        console.error(err);
        alert("insert failed (check server logs)");
      });
  };

  return (
    <Container>
      <h1 className="my-3">Customers</h1>

      <Container className="border rounded p-3 mb-3">
        <h2 className="h4">Add a customer</h2>

        <Form onSubmit={onSubmitCustomer}>
          <Form.Group className="mb-3">
            <Form.Label>First name</Form.Label>
            <Form.Control
              placeholder="e.g. John"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              placeholder="e.g. Doe"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              placeholder="e.g. johndoe@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date of birth</Form.Label>
            <Form.Control
              placeholder="e.g. 03-13-90"
              value={dob}
              onChange={(event) => setDob(event.target.value)}
            />
          </Form.Group>

          <Button className="mt-2" type="submit" variant="primary">
            Submit
          </Button>
        </Form>
      </Container>
    </Container>
  );
}

export default App;
