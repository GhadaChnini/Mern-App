import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./Landingpage.css";

const LandingPage = ({ navigate }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [navigate, userInfo]);
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to MyStickyNotes</h1>
              <p className="subtitle">One Safe place for all your notes</p>
            </div>
            <div className="buttonContainer">
              <a href="/login">
                <button size="lg" className="landingbutton">
                  Login
                </button>
              </a>
              <a href="/register">
                <button
                  size="lg"
                  className="landingbutton"
                  variant="outline-primary"
                >
                  Signup
                </button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
