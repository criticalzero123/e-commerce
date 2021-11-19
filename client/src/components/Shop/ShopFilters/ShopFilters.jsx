import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Offcanvas, Row, Col, Button, Accordion } from "react-bootstrap";

import "../../../pages/ProductDetails/ProductDetails.scss";

import { FaCheck } from "react-icons/fa";
import { BsSliders } from "react-icons/bs";
import {
  filterProducts,
  filterSubCategoryProducts,
  filterSubProducts,
} from "../../../actions/productActions";

const ShopFilters = ({ route }) => {
  const filterSubSports = [
    "running",
    "basketball",
    "tennis",
    "skateboarding",
    "snorkeling",
  ];
  const filterSubTravels = ["tent", "gloves", "jacket", "bag", "boots"];

  const filterColor = [
    "white",
    "pink",
    "red",
    "black",
    "yellow",
    "blue",
    "green",
    "purple",
    "gray",
    "skyblue",
    "brown",
    "silver",
    "tealblue",
    "violet",
    "mint",
    "phantsm",
  ];

  //All sub Filters
  const filterSubAll = filterSubSports.concat(filterSubTravels);

  const [show, setShow] = useState(false);
  const [sort, setSort] = useState("popular");
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [colorName, setColorName] = useState([]);

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const filterCategoryValidation = ({ target: { checked, value } }) => {
    if (checked) {
      setCategory([...category, value]);
    } else {
      setCategory(category.filter((e) => e !== value));
    }
  };

  const filterSubCategoryValidation = ({ target: { checked, value } }) => {
    if (checked) {
      setSubCategory([...subCategory, value]);
    } else {
      setSubCategory(subCategory.filter((e) => e !== value));
    }
  };

  var categoryPage = "";
  if (route[1] !== "all") {
    categoryPage = route[1].toLowerCase();
  } else {
    // Getting the route category and pass it to the filter sub category
    categoryPage = route[1].toLowerCase();
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  var subCategoryPage = "";

  if (typeof route[2] !== "undefined") {
    subCategoryPage = route[2];
  } else {
    subCategoryPage = "";
  }

  useEffect(() => {
    //   If in shop
    if (categoryPage === "all") {
      dispatch(filterProducts(sort, colorName, category, subCategory));
    }
    // if in sub category
    else {
      if (subCategoryPage !== "") {
        dispatch(
          filterSubProducts(sort, colorName, categoryPage, subCategoryPage)
        );
      } else {
        dispatch(
          filterSubCategoryProducts(sort, colorName, categoryPage, subCategory)
        );
      }
    }
  }, [
    sort,
    category,
    subCategory,
    dispatch,
    categoryPage,
    subCategoryPage,
    colorName,
  ]);

  return (
    <div>
      <div>
        <div className="float-end ms-4 ms-lg-5 d-inline-flex">
          <div style={{ fontSize: "1rem" }} className="mt-2 me-1">
            Sort:
          </div>

          <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="popular">Popularity</option>
            <option value="highToLow">Price: High - Low</option>
            <option value="lowToHigh">Price: Low - High</option>
          </Form.Select>
        </div>
      </div>

      {route.length !== 3 ? (
        <div
          className="float-end"
          onClick={handleShow}
          style={{ cursor: "pointer" }}
        >
          <p style={{ fontSize: "1rem" }} className="mt-2">
            {!show ? "Show " : "Hide "} Filters <BsSliders className="ms-1" />
          </p>
        </div>
      ) : (
        <div className="ms-auto"></div>
      )}

      {/* For the filter */}
      <Offcanvas show={show} onHide={handleClose} scroll={true} backdrop={true}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Accordion flush>
            {categoryPage === "all" && (
              <Accordion.Item>
                <Accordion.Header>Categories</Accordion.Header>
                <Accordion.Body>
                  <Form className="mb-4">
                    <Form.Check
                      inline
                      label="Travels"
                      name="group1"
                      type="checkbox"
                      id="inline-checkbox-1"
                      value="travels"
                      checked={category.includes("travels")}
                      onChange={filterCategoryValidation}
                    />
                    <br />
                    <Form.Check
                      inline
                      label="Sports"
                      name="group1"
                      type="checkbox"
                      id="inline-checkbox-2"
                      value="sports"
                      checked={category.includes("sports")}
                      onChange={filterCategoryValidation}
                    />
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
            )}
          </Accordion>
          <Accordion flush>
            <Accordion.Item>
              <Accordion.Header>Sub Categories</Accordion.Header>
              <Accordion.Body>
                <Row>
                  {((categoryPage === "all") & (category.length === 0)) |
                  (category.length === 2)
                    ? filterSubAll.map((subcategory, index) => {
                        return (
                          <Col xs={12}>
                            <Form.Check
                              inline
                              label={capitalizeFirstLetter(subcategory)}
                              name="group2"
                              type="checkbox"
                              id={`inline-checkbox1-${index}`}
                              value={subcategory}
                              key={index}
                              checked={subCategory.includes(subcategory)}
                              onChange={filterSubCategoryValidation}
                            />
                          </Col>
                        );
                      })
                    : (categoryPage === "sports") | category.includes("sports")
                    ? filterSubSports.map((subcategory, index) => {
                        return (
                          <Col xs={12}>
                            <Form.Check
                              inline
                              label={capitalizeFirstLetter(subcategory)}
                              name="group2"
                              type="checkbox"
                              id={`inline-checkbox1-${index}`}
                              value={subcategory}
                              key={index}
                              checked={subCategory.includes(subcategory)}
                              onChange={filterSubCategoryValidation}
                            />
                          </Col>
                        );
                      })
                    : filterSubTravels.map((subcategory, index) => {
                        return (
                          <Col xs={12}>
                            <Form.Check
                              inline
                              label={capitalizeFirstLetter(subcategory)}
                              name="group2"
                              type="checkbox"
                              id={`inline-checkbox-${index}`}
                              value={subcategory}
                              key={index}
                              checked={subCategory.includes(subcategory)}
                              onChange={filterSubCategoryValidation}
                            />
                          </Col>
                        );
                      })}
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Accordion flush>
            <Accordion.Item>
              <Accordion.Header>Colours</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Row>
                    {filterColor.map((color, index) => {
                      return (
                        <Col xs={4} key={index} className="text-center">
                          <Button
                            onClick={() => {
                              if (colorName.includes(color)) {
                                setColorName(
                                  colorName.filter((colors) => colors !== color)
                                );
                              } else {
                                setColorName([...colorName, color]);
                              }
                            }}
                            className={`btn-${color}`}
                            style={{
                              borderRadius: "20px",
                              padding: "6px 11px",
                            }}
                          >
                            {colorName.includes(color) ? (
                              <FaCheck
                                size="1rem"
                                style={{ visibility: "visible" }}
                              />
                            ) : (
                              <FaCheck
                                size="1rem"
                                style={{ visibility: "hidden" }}
                              />
                            )}
                          </Button>
                          <p>{color}</p>
                        </Col>
                      );
                    })}
                  </Row>
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default ShopFilters;
