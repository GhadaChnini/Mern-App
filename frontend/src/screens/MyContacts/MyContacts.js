import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { deleteContactAction, listContacts } from "../../actions/contactsActions";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
// import sendEmail from "./sendEmail";
// import emailjs from "emailjs-com";
import axios from "axios";
import { useParams } from "react-router-dom";
// import { $CombinedState } from "redux";

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
  // const noteList = useSelector((state) => state.noteList);
  // const { note } = noteList;

// const sendEmail = async (subject, email, message) => {
//  if(window.confirm("Are you sure?")){
//   try {
//     const response = await emailjs.send(
//       serviceId,
//       templateId,
//       { subject, email, message },
//       userId
//     );

//     if (response === 200) {
//       window.confirm("Successfully sent message.");
//     }
//   } catch (error) {
//     window.confirm("Failed to send email. Error: ", error);
//   }
// };
// }


// const [title, setTitle] = useState();
// const [content, setContent] = useState();


// const { id } = useParams();
// useEffect(() => {
//   const fetching = async () => {
//     const { data } = await axios.get(`/api/notes/${id}`);

//     setTitle(data.title);
//     setContent(data.content);
//   };
//   fetching();
// }, [id]);
// var data = {
//     serviceId : "service_qsgp14q",
//     templateId : "template_1n3d08u",
//    userId : "user_Z5XvgO5kyT5j6CoPlkBlq",
//    templateParams : {
//   subject: "hey",
//   email: "ghadachnini17@gmail.com",
//   message: "hey"
// }
// };




const [title, setTitle] = useState();
const [content, setContent] = useState();
const [category, setCategory] = useState();
const [date, setDate] = useState("");

const { id } = useParams();
  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/notes/${id}`);

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };
    fetching();
  }, [id, date]);


const sendEmail = async () =>{
  if(window.confirm(`Are you sure? ${title}`)){
//     fetch('https://api.emailjs.com/api/v1.0/email/send', {
//     type: 'POST',
//     data: JSON.stringify(data),
//     contentType: 'application/json'
// }).done(function() {
//     alert('Your mail is sent!');
// }).fail(function(error) {
//     alert('Oops... ' + JSON.stringify(error));
// });

 }
};
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
                    <Button variant="dark" className="mx-2"
                       onClick={() =>
                        sendEmail()
                      }
                    >
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
