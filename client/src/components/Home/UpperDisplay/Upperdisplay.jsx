import React, { useEffect } from "react";

import { Image, Carousel, Button } from "react-bootstrap";

import indexpicture from "../../../assets/Indexpic.png";

import "./Upperdisplay.scss";

import Aos from "aos";
import "aos/dist/aos.css";

const Upperdisplay = () => {
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);
  return (
    <div>
      <div data-aos="zoom-in-up">
        <Carousel indicators={false} controls={false}>
          <Carousel.Item>
            <Image
              className="d-block w-100"
              src={indexpicture}
              alt="First slide"
            />
            <Carousel.Caption>
              <div data-aos="fade-up-right">
                <h3 className="headers-text">| Lorem Ipsum</h3>
                <p className="lowers-text">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
                <Button
                  variant="outline-dark"
                  onClick={() => (window.location.href = "/shop/all")}
                >
                  SHOP NOW
                </Button>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div data-aos="fade-up" className="text-center p-4 motto">
        MATHILDA. <br />
        <p style={{ fontSize: "1.2rem", fontWeight: "500" }}>
          WHERE ALL THE LEADING SPORTS AND TRAVELS BRANDS COME TO PLAY.
        </p>
      </div>
    </div>
  );
};

export default Upperdisplay;
