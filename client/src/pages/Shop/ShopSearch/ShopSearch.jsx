import React, { useEffect } from "react";

import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../../../components/ProductCard/ProductCard";

import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../../../actions/productActions";
import Loading from "../../../components/Loading/Loading";

const ShopSearch = ({ match }) => {
  const searchKey = match.params.search;

  const getAllProductsState = useSelector(
    (state) => state.getAllProductsReducer
  );

  const { loading, products, error } = getAllProductsState;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchProducts(searchKey));
  }, [dispatch, searchKey]);

  return (
    <div>
      <Container>
        {products && <h3 className="mb-3">Items ({products.length})</h3>}
        <Row>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <Loading />
            </div>
          ) : error ? (
            <h1>Something went wrong</h1>
          ) : (
            products &&
            products.map((product) => (
              <Col
                key={product._id}
                lg={3}
                md={6}
                sm={6}
                xs={12}
                className="mb-4"
              >
                <ProductCard product={product} />
              </Col>
            ))
          )}
        </Row>
      </Container>
    </div>
  );
};

export default ShopSearch;
