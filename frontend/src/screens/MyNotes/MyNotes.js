import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const MyNotes = ({ search }) => {
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  const navigate = useNavigate();
  console.log(notes);

  useEffect(() => {
    dispatch(listNotes());
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
  // useEffect(() => {
  //   if (noteList) {
  //     navigate("/mycontacts");
  //   }
  // }, [navigate, noteList]);

  return (
    <MainScreen title={`Welcome Back ${userInfo.name}...`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loadingDelete && <Loading />}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {notes &&
        notes
          .filter((filteredNote) =>
            filteredNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
          .map((note) => (
            <Accordion Key={note._id}>
              <Card>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    <Accordion.Header
                      as={Card.Text}
                      variant="link"
                      eventKey="0"
                    >
                      {note.title}
                    </Accordion.Header>
                  </span>

                  <div>
                    <Link to="/mycontacts">
                      <Button variant="dark" className="mx-2" href={`/contact/${note._id}`}>
                        Send Mail
                      </Button>
                    </Link>
                    <Button href={`/note/${note._id}`}>Edit</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(note._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Body eventKey="0">
                  <Card.Body>
                    <h4>
                      <Badge class="btn btn-success">
                        Category - {note.category}
                      </Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <p>{note.content}</p>
                      <footer className="blockquote-footer">
                        Created On {""}
                        <cite title="Source Title">
                          {note.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Body>
              </Card>
            </Accordion>
          ))}
    </MainScreen>
  );
};

export default MyNotes;
