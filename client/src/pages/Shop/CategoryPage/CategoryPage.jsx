import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// import "./CategoryPage.scss";
// import { settings } from "../../../functions/slick_category_settings";
// import Slider from "react-slick";

import { Container, Row, Col } from "react-bootstrap";
import { getAllCategoryProducts } from "../../../actions/productActions";
import ProductCard from "../../../components/ProductCard/ProductCard";
import Loading from "../../../components/Loading/Loading";

const CategoryPage = ({ match }) => {
  const getAllCategoryProduct = useSelector(
    (state) => state.getAllCategoryProductsReducer
  );

  const { loading, products, error } = getAllCategoryProduct;

  const firstCapital = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategoryProducts(match.params.category));
  }, [dispatch, match.params.category]);
  return (
    <div>
      <div>
        <Container>
          {products && (
            <h3 className="mb-3">
              {firstCapital(match.params.category)} ({products.length})
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
    </div>
  );
};

export default CategoryPage;
