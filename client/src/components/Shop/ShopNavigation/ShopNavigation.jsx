import React from "react";

import "./ShopNavigation.scss";

import { useLocation } from "react-router";

import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { Container, Breadcrumb, Row, Col } from "react-bootstrap";

import ShopFilters from "../ShopFilters/ShopFilters";

const ShopNavigation = () => {
  const location = useLocation();
  const productbyidstate = useSelector((state) => state.getProductByIdReducer);

  const route = location.pathname.split("/").slice(1);

  const firstCapital = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  var productName = "";

  if (route.length > 3) {
    const { product } = productbyidstate;
    if (typeof product !== "undefined") {
      productName = product.name;
    }
  }

  return (
    <div>
      <Container className="mb-3 mt-4">
        <Row>
          <Col>
            <Breadcrumb>
              <Breadcrumb.Item
                linkAs={Link}
                linkProps={{ to: `/${route[0]}/all` }}
              >
                {firstCapital(route[0])}
              </Breadcrumb.Item>
              {(route.length > 1) & (route[1] !== "all") ? (
                <Breadcrumb.Item
                  linkAs={Link}
                  linkProps={{ to: `/${route[0]}/${route[1]}` }}
                >
                  {firstCapital(route[1])}
                </Breadcrumb.Item>
              ) : (
                ""
              )}
              {route.length > 2 && (
                <Breadcrumb.Item
                  linkAs={Link}
                  linkProps={{ to: `/${route[0]}/${route[1]}/${route[2]}` }}
                >
                  {firstCapital(route[2])}
                </Breadcrumb.Item>
              )}
              {route.length > 3 && (
                <Breadcrumb.Item active>{productName}</Breadcrumb.Item>
              )}
            </Breadcrumb>
          </Col>
          {route.length < 4 && (
            <Col>
              {/*if route.length === 1 current page is shop
                 if route.length === 2 current page is category shop except for the all
                 if route.length === 3 current page is sub category shop
              */}
              <ShopFilters route={route} />
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default ShopNavigation;
