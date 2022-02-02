import React, { useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createContactAction } from "../../actions/contactsActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";

function AddContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const contactCreate = useSelector((state) => state.contactCreate);
  const { loading, error, contact } = contactCreate;

  console.log(contact);

  const resetHandler = () => {
    setName("");
    setEmail("");
  };
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    dispatch(createContactAction(name, email));

    resetHandler();
    navigate("/mycontacts");
  };

  return (
    <MainScreen title="Add a Contact">
      <Card>
        <Card.Header>Add a new Contact</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                value={name}
                placeholder="Enter the name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="Enter the email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary" className="mt-2">
              Add Contact
            </Button>
            <Button className="mx-2 mt-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default AddContact;
