import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Button,
  Form,
  Carousel,
  Image,
  OverlayTrigger,
  Tooltip,
  Modal,
} from "react-bootstrap";
import ProductDetailsTabs from "../../components/ProductDetailsTabs/ProductDetailsTabs";

import swal from "sweetalert";

import "./ProductDetails.scss";

import { FaCheck } from "react-icons/fa";

import { addToCart } from "../../actions/cartActions";

import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../actions/productActions";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [colorIndex, setColorIndex] = useState(-1);
  const [size, setSize] = useState("");
  const [show, setShow] = useState(false);

  const getProduct = useSelector((state) => state.getProductByIdReducer);

  const { loading, product, error } = getProduct;

  const addToCartItem = () => {
    const image = product.imageUrl[colorIndex];
    const stockOfItem = product.countInStock[colorIndex].stock;
    const colorOfItem = product.countInStock[colorIndex].color;

    dispatch(
      addToCart(product, quantity, size, stockOfItem, colorOfItem, image)
    );
    swal({
      title: "Added to the Cart!",
      text: "Thank you for shopping",
      icon: "success",
    });
  };

  var sizeAvailablity = [];

  if (product && colorIndex !== -1) {
    const sizes = product.countInStock[colorIndex].availableSizes;
    if (sizes.indexOf(",") > -1) {
      sizeAvailablity = sizes.toLowerCase().split(",");
    } else {
      sizeAvailablity.push(sizes.toLowerCase());
    }
  }

  useEffect(() => {
    dispatch(getProductById(match.params.productid));
  }, [dispatch, match.params.productid]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error....</div>
      ) : (
        <Container fluid className="p-lg-5 pt-lg-0">
          <Row>
            <Col lg={8}>
              <Carousel
                variant="dark"
                style={{ width: "70%" }}
                interval={null}
                className="mx-auto"
              >
                {product.imageUrl &&
                  product.imageUrl.map((image, index) => {
                    return (
                      <Carousel.Item key={index}>
                        <Image
                          className="d-block w-100"
                          src={image}
                          alt={product.name}
                          thumbnail
                        />
                      </Carousel.Item>
                    );
                  })}
              </Carousel>
            </Col>

            <Col lg={4}>
              <div className="mt-lg-0 mt-5">
                <h2>{product.name}</h2>
                <p>₱{product.price}</p>
                Select Colours:
                <br />
                {product.countInStock &&
                  product.countInStock.map((item, i) => {
                    // If no stock
                    if (item.stock <= 0) {
                      return (
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-disabled">No Stock</Tooltip>
                          }
                          key={i}
                          trigger={["click", "hover"]}
                        >
                          <span className="d-inline-block">
                            <Button
                              disabled
                              key={item.color}
                              className={`me-3 btn-${item.color}`}
                              style={{
                                borderRadius: "20px",
                                padding: "6px 11px",
                                pointerEvents: "none",
                              }}
                            >
                              <FaCheck
                                size="1rem"
                                style={{ visibility: "hidden" }}
                              />
                            </Button>
                          </span>
                        </OverlayTrigger>
                      );
                    }
                    // if has stock
                    else {
                      return (
                        <Button
                          key={item.color}
                          onClick={() => {
                            setColorIndex(i);
                            setSize("");
                          }}
                          className={`me-3 btn-${item.color}`}
                          style={{ borderRadius: "20px", padding: "6px 11px" }}
                        >
                          {colorIndex === i ? (
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
                      );
                    }
                  })}
                <div>
                  <div className="mt-4">
                    Select Size:
                    <br />
                    {product.sizes &&
                      product.sizes.map((item, index) => {
                        var exist = false;
                        const lowercase = item.toLowerCase();
                        if (sizeAvailablity.includes(lowercase)) {
                          exist = true;
                        } else {
                          exist = false;
                        }

                        return (
                          <Button
                            key={item}
                            variant={
                              item === size ? "secondary" : "outline-secondary"
                            }
                            onClick={() => setSize(item)}
                            value={item}
                            disabled={!exist}
                            className="me-2 mb-2"
                          >
                            {item.toUpperCase()}
                          </Button>
                        );
                      })}
                  </div>

                  <div className="mt-4">
                    Select Quantity
                    <Form.Select
                      style={{ width: "4.5rem" }}
                      onChange={(e) => setQuantity(e.target.value)}
                    >
                      {colorIndex !== -1 &&
                        [...Array(product.countInStock[colorIndex].stock)].map(
                          (x, i) => (
                            <option value={i + 1} key={i}>
                              {i + 1}
                            </option>
                          )
                        )}
                    </Form.Select>
                  </div>
                </div>
                <Button
                  onClick={addToCartItem}
                  className="w-100 mt-5"
                  variant="secondary"
                  style={{ height: "3.5rem", borderRadius: "20rem" }}
                >
                  Add to Cart
                </Button>
                <ProductDetailsTabs
                  description={product.description}
                  product={product}
                />
              </div>
            </Col>
          </Row>

          <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Cart Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Woohoo, you're reading this text in a modal!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow(false)}>
                Okay
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      )}
    </div>
  );
};

export default ProductDetails;
