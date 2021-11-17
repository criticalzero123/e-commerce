import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";

import { Link } from "react-router-dom";

import sport from "../../../assets/home/SportAccessories.png";
import travel from "../../../assets/home/TravelAccessories.png";

import "./Itemcategory.scss";

const Itemcategory = () => {
  return (
    <div className="mt-5">
      <Row className="justify-content-center">
        <Col md={12} lg={6} style={{ padding: 0 }}>
          <Card className="border-0">
            <Card.Img variant="top" src={travel} />
            <Card.ImgOverlay className=" d-flex align-items-end justify-content-end">
              <Link to={"/shop/travels"}>
                <Button variant="outline-light" className="btn-travel">
                  SHOP NOW
                </Button>
              </Link>
            </Card.ImgOverlay>
          </Card>
        </Col>

        <Col md={12} lg={6} style={{ padding: 0 }}>
          <Card className="border-0">
            <Card.Img variant="top" src={sport} />
            <Card.ImgOverlay className=" d-flex align-items-end justify-content-end ">
              <Link to={"/shop/sports"}>
                <Button variant="outline-light" className="btn-sport">
                  SHOP NOW
                </Button>
              </Link>
            </Card.ImgOverlay>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Itemcategory;
