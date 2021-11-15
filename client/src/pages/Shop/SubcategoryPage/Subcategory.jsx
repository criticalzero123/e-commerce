import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import ProductCard from "../../../components/ProductCard/ProductCard";

import { Container, Row, Col } from "react-bootstrap";

import { getAllSubCategoryProducts } from "../../../actions/productActions";
import Loading from "../../../components/Loading/Loading";
const Subcategory = ({ match }) => {
  const dispatch = useDispatch();
  const _getAllSubCategoryProducts = useSelector(
    (state) => state.getAllSubCategoryProductsReducer
  );

  const { loading, products, error } = _getAllSubCategoryProducts;

  const category = match.params.category;
  const subCategory = match.params.subcategory;

  const firstCapital = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  useEffect(() => {
    dispatch(getAllSubCategoryProducts(category, subCategory));
  }, [dispatch, category, subCategory]);
  return (
    <div>
      <Container>
        {products && (
          <h3 className="mb-3">
            {firstCapital(match.params.subcategory)} ({products.length})
          </h3>
        )}
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
            products.length &&
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

export default Subcategory;
