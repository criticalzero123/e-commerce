import React from "react";

import { Accordion } from "react-bootstrap";
import Review from "../Review/Review";

const ProductDetailsTabs = ({ description, product }) => {
  return (
    <div className="mt-5">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Description</Accordion.Header>
          <Accordion.Body>{description}</Accordion.Body>
        </Accordion.Item>

        <Review product={product} />
      </Accordion>
    </div>
  );
};

export default ProductDetailsTabs;
