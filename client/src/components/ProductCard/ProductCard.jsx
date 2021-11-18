import React from "react";
import { Card } from "react-bootstrap";

import "./ProductCard.scss";

import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const displaySubCategory =
    product.subCategory.charAt(0).toUpperCase() + product.subCategory.slice(1);
  const displayCategory =
    product.category.charAt(0).toUpperCase() + product.category.slice(1);

  const numberWithCommas = (x) => {
    return "₱" + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  console.log(product);

  return (
    <Link
      to={`/shop/${product.category}/${product.subCategory}/${product._id}`}
      style={{ textDecoration: "none" }}
    >
      <Card>
        <Card.Img
          variant="top"
          src={product.imageUrl[0]}
          onMouseEnter={(e) =>
            (e.target.src =
              "https://lh3.googleusercontent.com/EQWm91gEU7x4nRGudJTZKiRxyYnlErjbNZQKEAfn7BM55CiEOKtu0ecguQEWDUE-S_-OrgTywlAAXsZCcYTLn5UqU6jDSEx_6jWBZ6A2n0Jc7moGsOj5XFQvhpPmJVeGxalAfaGDGg=w2400")
          }
          onMouseLeave={(e) => (e.target.src = product.imageUrl[0])}
        />
        <Card.Body>
          <Card.Text className="lower-text">
            <span className="upper-text"> {product.name}</span>
            <br />
            {displayCategory + " " + displaySubCategory}
            <br />
            {product.colors.length} Colour(s)
          </Card.Text>
          <Card.Text className="upper-text">
            {numberWithCommas(product.price)}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default ProductCard;
