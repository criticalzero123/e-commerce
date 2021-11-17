import React from "react";

import { Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <div className="mt-5">
      <Row style={{ backgroundColor: "gray" }}>
        <Col xs={4}>
          <h3 className="mb-4">Mathilda.</h3>
          <p>SHOP</p>
          <p>TRAVELS</p>
          <p>SPORTS</p>
        </Col>
        <Col xs={4}>2</Col>
        <Col xs={4}>3</Col>
      </Row>
    </div>
  );
};

export default Footer;
