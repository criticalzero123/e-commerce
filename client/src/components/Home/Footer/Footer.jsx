import React from "react";

import { Row, Col } from "react-bootstrap";

import { BsFacebook } from "react-icons/bs";

import { AiFillTwitterCircle, AiFillInstagram } from "react-icons/ai";

import { TiSocialYoutubeCircular } from "react-icons/ti";

import { SiBitcoinsv } from "react-icons/si";

import "./Footer.scss";

const Footer = () => {
  return (
    <div className="mt-5">
      <Row style={{ backgroundColor: "#F5F5F6" }} className="pt-3">
        <Col xs={4}>
          <h4 className="mb-4">Mathilda.</h4>
          <p
            className="navigation-footer"
            onClick={() => (window.location.href = "/shop/all")}
          >
            SHOP
          </p>
          <p
            className="navigation-footer"
            onClick={() => (window.location.href = "/shop/travels")}
          >
            TRAVELS
          </p>
          <p
            className="navigation-footer"
            onClick={() => (window.location.href = "/shop/sports")}
          >
            SPORTS
          </p>
        </Col>
        <Col xs={4}>
          <h4 className="mb-4">PRIVACY & POLICY</h4>
          <p>Terms and Conditions</p>
          <p>Refund Policy</p>
          <p>Shipment Policy</p>
        </Col>
        <Col xs={4}>
          <h4 className="mb-4">ABOUT US</h4>
          <p>BLOG</p>
          <p>Contact Number</p>
          <p>
            <BsFacebook size={25} className="me-2" />
            <AiFillTwitterCircle size={27} className="me-2" />
            <AiFillInstagram size={27} className="me-1" />
            <TiSocialYoutubeCircular size={28} className="me-2" />
            <SiBitcoinsv size={23} />
          </p>
        </Col>
        <div className="text-center mt-3" style={{ backgroundColor: "white" }}>
          ©Mathilda. 2021 All right reserved.
        </div>
      </Row>
    </div>
  );
};

export default Footer;
