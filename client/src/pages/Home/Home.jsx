import React, { useEffect } from "react";

import Upperdisplay from "../../components/Home/UpperDisplay/Upperdisplay";

import { Container } from "react-bootstrap";

import Aos from "aos";
import "aos/dist/aos.css";

import Itemcategory from "../../components/Home/ItemCategory/Itemcategory";
import Featuresproducts from "../../components/Home/FeaturedProducts/Featuresproducts";
import Popular from "../../components/Home/Popular/Popular";
import Affiliatebrand from "../../components/Home/AffiliateBrand/Affiliatebrand";
import Footer from "../../components/Home/Footer/Footer";

const Home = () => {
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  return (
    <div>
      <Container style={{ overflowX: "hidden" }}>
        <Upperdisplay />

        <div data-aos="fade-right">
          <Featuresproducts />
        </div>
        <div data-aos="zoom-in">
          <Itemcategory />
        </div>

        <div data-aos="zoom-out-up">
          <Popular />
        </div>

        <div>
          <Affiliatebrand />
        </div>

        <div>
          <Footer />
        </div>
      </Container>
    </div>
  );
};

export default Home;
