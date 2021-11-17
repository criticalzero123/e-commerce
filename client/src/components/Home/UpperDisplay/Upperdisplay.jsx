import React from "react";

import { Image, Carousel } from "react-bootstrap";

import indexpicture from "../../../assets/Indexpic.png";

import "./Upperdisplay.scss";

const Upperdisplay = () => {
  return (
    <div>
      <Carousel indicators={false} controls={false}>
        <Carousel.Item>
          <Image
            className="d-block w-100"
            src={indexpicture}
            alt="First slide"
          />
        </Carousel.Item>
      </Carousel>

      <div className="text-center p-4 motto">
        <span style={{ fontFamily: "Oswald", letterSpacing: "5px" }}>
          MATHILDA.
        </span>
        <br />
        <p className="lower-text-upper">
          WHERE ALL THE LEADING SPORTS AND TRAVELS BRANDS COME TO PLAY.
        </p>
      </div>
    </div>
  );
};

export default Upperdisplay;
