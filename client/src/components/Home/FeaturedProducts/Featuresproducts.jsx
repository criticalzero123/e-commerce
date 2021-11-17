import React from "react";
import Slider from "react-slick";

import { Card } from "react-bootstrap";

//pictures
import adidas from "../../../assets/home/Adidas_pro.jpg";
import KD from "../../../assets/home/KD_trey.jpg";
import jacket from "../../../assets/home/jacket.jpg";
import boots from "../../../assets/home/northface_hike.jpg";
import gloves from "../../../assets/home/gloves.jpg";

import "./Featuresproducts.scss";

const Featuresproducts = () => {
  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const button = (location) => (
    <span onClick={() => (window.location.href = location)} className="buy-now">
      BUY NOW
    </span>
  );

  return (
    <div className="mt-5">
      <p>
        <span className="fw-bold">FEATURED PRODUCTS</span>
        <span className="float-end">VIEW ALL</span>
      </p>

      <Slider {...settings}>
        <Card className="border-0">
          <Card.Img variant="top" src={KD} />
          <Card.Body>
            <Card.Title>KD Trey 5 IX</Card.Title>
            <Card.Text>
              Sports - Basketball <br />
              ₱4999
            </Card.Text>
            {button("/shop/sports/basketball/61808ea66d3b8c95d49d826b")}
          </Card.Body>
        </Card>

        <Card className="border-0">
          <Card.Img variant="top" src={jacket} />
          <Card.Body>
            <Card.Title>HIJEWE Military</Card.Title>
            <Card.Text>
              Travels - Jacket
              <br />
              ₱3299
            </Card.Text>
            {button("/shop/travels/jacket/6192532681e768dab0c738c1")}
          </Card.Body>
        </Card>

        <Card className="border-0">
          <Card.Img variant="top" src={gloves} />
          <Card.Body>
            <Card.Title>Held Travel Tex</Card.Title>
            <Card.Text>
              Travels - Gloves <br />
              ₱1999
            </Card.Text>
            {button("/shop/travels/gloves/619254f681e768dab0c738c5")}
          </Card.Body>
        </Card>

        <Card className="border-0">
          <Card.Img variant="top" src={adidas} />
          <Card.Body>
            <Card.Title>Adidas Pro N3XT</Card.Title>
            <Card.Text>
              Sports - Basketball <br />
              ₱4999
            </Card.Text>
            {button("/shop/sports/basketball/61920fda7df53d583dc01172")}
          </Card.Body>
        </Card>

        <Card className="border-0">
          <Card.Img variant="top" src={boots} />
          <Card.Body>
            <Card.Title>Northface Hike II</Card.Title>
            <Card.Text>
              Travels - Boots <br />
              ₱1599
            </Card.Text>
            {button("/shop/travels/boots/6191913915f516333f1fd219")}
          </Card.Body>
        </Card>
      </Slider>
    </div>
  );
};

export default Featuresproducts;
