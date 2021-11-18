import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Offcanvas, Row, Col } from "react-bootstrap";

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

  //All sub Filters
  const filterSubAll = filterSubSports.concat(filterSubTravels);

  const [show, setShow] = useState(false);
  const [sort, setSort] = useState("popular");
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

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
      dispatch(filterProducts(sort, category, subCategory));
    }
    // if in sub category
    else {
      if (subCategoryPage !== "") {
        dispatch(filterSubProducts(sort, categoryPage, subCategoryPage));
      } else {
        dispatch(filterSubCategoryProducts(sort, categoryPage, subCategory));
      }
    }
  }, [sort, category, subCategory, dispatch, categoryPage, subCategoryPage]);

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
          {categoryPage === "all" && (
            <Form className="mb-4">
              <p>Categories:</p>
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
          )}

          <Form>
            <p>Sub Categories:</p>
            <Row>
              {((categoryPage === "all") & (category.length === 0)) |
              (category.length === 2)
                ? filterSubAll.map((subcategory, index) => {
                    return (
                      <Col xs={6}>
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
                      <Col xs={6}>
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
                      <Col xs={6}>
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
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default ShopFilters;
