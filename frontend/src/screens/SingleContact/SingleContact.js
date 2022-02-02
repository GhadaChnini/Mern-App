import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  updateContactAction,
  deleteContactAction,
} from "../../actions/contactsActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { useNavigate, useParams } from "react-router-dom";

function SingleContact() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const contactUpdate = useSelector((state) => state.contactUpdate);
  const { loading, error } = contactUpdate;
  const contactDelete = useSelector((state) => state.contactDelete);
  const { loading: loadingDelete, error: errorDelete } = contactDelete;
  const navigate = useNavigate();
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteContactAction(id));
    }
    navigate("/mycontacts");
  };
  const { id } = useParams();
  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/contacts/${id}`);

      setName(data.name);
      setEmail(data.email);
      setDate(data.updatedAt);
    };
    fetching();
  }, [id, date]);

  const resetHandler = () => {
    setName("");
    setEmail("");
  };
  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateContactAction(id, name, email));
    if (!name || !email) return;

    resetHandler();
    navigate("/mycontacts");
  };

  return (
    <MainScreen title="Edit Contact">
      <Card>
        <Card.Header>Edit your Contact</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter the name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter the email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit" className="mt-2">
              Update Note
            </Button>
            <Button
              className="mx-2 mt-2"
              variant="danger"
              onClick={() => deleteHandler(id)}
            >
              Delete Note
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SingleContact;
