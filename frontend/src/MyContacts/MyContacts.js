import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { deleteContactAction, listContacts } from "../actions/contactsActions";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const MyContacts = ({ search }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const contactList = useSelector((state) => state.contactList);
  const { loading, contacts, error } = contactList;

  const contactCreate = useSelector((state) => state.contactCreate);
  const { success: successCreate } = contactCreate;

  const contactUpdate = useSelector((state) => state.contactUpdate);
  const { success: successUpdate } = contactUpdate;

  const contactDelete = useSelector((state) => state.contactDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = contactDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteContactAction(id));
    }
  };

  const navigate = useNavigate();
  console.log(contacts);

  useEffect(() => {
    dispatch(listContacts());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successCreate,
    successUpdate,
    successDelete,
  ]);

  return (
    <MainScreen title={"Contacts"}>
      <Link to="/addcontact">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Add New Contact
        </Button>
      </Link>
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loadingDelete && <Loading />}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {contacts &&
        contacts
          .filter((filteredContact) =>
            filteredContact.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((contact) => (
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
                  <Button href={`/contact/${contact._id}`}>Edit</Button>
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => deleteHandler(contact._id)}
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
