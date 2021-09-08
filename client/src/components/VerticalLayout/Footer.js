import React from "react";
import { Container, Row, Col } from "reactstrap";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col sm={6}>
              <p>©{new Date().getFullYear()} Cococa Farmers</p>
            </Col>
            <Col sm={6}>
              <div className="text-sm-end d-none d-sm-block">
                <p style={{ color: '#74788d' }}>
                  {/* <a
                    href="https://srvinfotech.com"
                    target="_blank"
                    style={{ color: "#74788d" }}
                  >
                    &nbsp;Powered by SRV InfoTech
                  </a> */}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
