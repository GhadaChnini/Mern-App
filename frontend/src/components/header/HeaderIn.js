import React, { useEffect } from "react";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";

function HeaderIn({ setSearch }) {
  // window.location.reload();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("");
  };

  useEffect(() => {}, [userInfo]);
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to=""> MyStickyNotes</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
         {userInfo ?  <Nav className=" m-auto">
            <Form inline>
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          </Nav>: <div></div>}
         {userInfo ? <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/mynotes">
              <Link to="/mynotes">My notes</Link> &emsp;
              <Link to="/mycontacts">My Contacts</Link>
            </Nav.Link>
            <NavDropdown
              title={`${userInfo.name}`}
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item href="/profile">My profile</NavDropdown.Item>
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>: <div></div>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderIn;
