import React from "react";

import { Row } from "react-bootstrap";

import hotitem from "../../../assets/home/hotitem.mp4";

import "./Popular.scss";

const Popular = () => {
  return (
    <div className="mt-5">
      <h3 style={{ fontFamily: "Oswald" }}>POPULAR ITEM!</h3>
      <Row className=" align-items-center">
        <video loop autoPlay muted>
          <source src={hotitem} type="video/mp4" />
        </video>
        <div className="text-center mt-2">
          <p className="header-popular">LEBRON WITNESS 5</p>
          <span
            className="btn-popular"
            onClick={() => (window.location.href = "/shop/sports/basketball")}
          >
            BUY NOW!
          </span>
        </div>
      </Row>
    </div>
  );
};

export default Popular;
