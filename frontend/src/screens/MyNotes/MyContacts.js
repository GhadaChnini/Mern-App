import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import axios from "axios";

const MyContacts = () => {
  const [contacts, setContacts] = useState([]);

  const deleteContact = (id) => {
    if (window.confirm("Are you sure?")) {
    }
  };

  const fetchContacts = async () => {
    const { data } = await axios.get("/api/contacts");

    setContacts(data);
  };
  console.log(contacts);
  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <MainScreen title={"Contacts"}>
      <Link to="/addcontact">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Add New Contact
        </Button>
      </Link>
      {contacts.map((contact) => (
        <Card Key={contact._id} style={{ width: "85%" }}>
          <Card.Header style={{ display: "flex" }}>
            <span
              style={{
                color: "black",
                textDecoration: "none",
                flex: "auto",
                cursor: "pointer",
                alignSelf: "center",
                fontSize: 25,
              }}
            >
              {contact.name} |
            </span>
            <span
              style={{
                color: "black",
                textDecoration: "none",
                flex: 20,
                cursor: "pointer",
                alignSelf: "center",
                fontSize: 10,
              }}
            >
              <blockquote className="blockquote mb-0">
                <p>{contact.email}</p>
              </blockquote>
            </span>

            <div>
              <Link to="/mycontacts">
                <Button variant="dark" className="mx-2">
                  Send
                </Button>
              </Link>
              <Button href={`/note/${contact._id}`}>Edit</Button>
              <Button
                variant="danger"
                className="mx-2"
                onClick={() => deleteContact(contact._id)}
              >
                Delete this contact
              </Button>
            </div>
          </Card.Header>
        </Card>
      ))}
    </MainScreen>
  );
};

export default MyContacts;
