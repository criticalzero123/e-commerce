import React from "react";

import { Row, Col, Card } from "react-bootstrap";

import { SiNike, SiAdidas, SiThenorthface, SiNewbalance } from "react-icons/si";

const Affiliatebrand = () => {
  return (
    <div className="mt-5">
      <Row>
        <Col sm={12} md={4}>
          <h3>BRANDS AVAILABLE</h3>
          <p>Thanks to this brands. </p>
        </Col>
        <Col sm={12} md={8}>
          <Row>
            <Col xs={6} md={3}>
              <Card>
                <Card.Body className="d-flex align-items-center justify-content-center">
                  <SiNike size="50%" />
                </Card.Body>
              </Card>
            </Col>

            <Col xs={6} md={3}>
              <Card>
                <Card.Body className="d-flex align-items-center justify-content-center">
                  <SiAdidas size="50%" />
                </Card.Body>
              </Card>
            </Col>

            <Col xs={6} md={3} className="mt-sm-4 mt-md-0">
              <Card>
                <Card.Body className="d-flex align-items-center justify-content-center">
                  <SiThenorthface size="50%" />
                </Card.Body>
              </Card>
            </Col>

            <Col xs={6} md={3} className="mt-sm-4 mt-md-0">
              <Card>
                <Card.Body className="d-flex align-items-center justify-content-center">
                  <SiNewbalance size="50%" />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Affiliatebrand;
