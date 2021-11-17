import React from "react";

import { Row } from "react-bootstrap";

import hotitem from "../../../assets/home/hotitem.mp4";

const Popular = () => {
  return (
    <div className="mt-5">
      Popular Item!
      <Row className=" align-items-center">
        <video loop autoPlay muted>
          <source src={hotitem} type="video/mp4" />
        </video>
        <div className="text-center mt-2">
          <p>LEBRO WITNESS 5</p>
          <p>BUY NOW!</p>
        </div>
      </Row>
    </div>
  );
};

export default Popular;
