import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const AppNavbar = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            Infinity Assurance Assignment
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default AppNavbar;
