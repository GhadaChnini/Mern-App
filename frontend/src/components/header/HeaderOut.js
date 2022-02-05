import React, { useEffect } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import {  useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";


function HeaderOut() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  useEffect(() => {}, [userInfo]);
  return (
    <Nav class="navbar navbar-expand-lg navbar-dark bg-light mr-4" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="" >
            {" "}
            MyStickyNotes
          </Link>
        </Navbar.Brand>
      </Container>
    </Nav>
  );
}

export default HeaderOut;
