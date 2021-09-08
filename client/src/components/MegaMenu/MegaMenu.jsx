import React from "react";

// Reactstrap
import { Row, Col, Button } from "reactstrap";

export default function MegaMenu() {
  return (
    <div className="mega-menu">
      <Row>
        <Col className="left p-4">
          <h2 className="title">Mega Menu Sidebar</h2>
          <div className="paragraph">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Asperiores natus laboriosam fugit, consequatur.
            </p>

            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Exercitationem odio amet eos dolore suscipit placeat.
            </p>
          </div>
          <Button color="secondary" className="learn-more">
            Learn More
          </Button>
        </Col>
        <Col className="right"></Col>
      </Row>
    </div>
  );
}
