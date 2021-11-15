import React, { useState, useEffect } from "react";

import { FaStarHalfAlt, FaStar } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";

import { useDispatch } from "react-redux";

import { useHistory } from "react-router";

import { Accordion, Form, Button, Modal } from "react-bootstrap";
import { addProductReview } from "../../actions/productActions";

const Review = ({ product }) => {
  const history = useHistory();

  const reviewValidation =
    typeof history.location.state !== "undefined"
      ? history.location.state.review
      : false;

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [showReview, setShowReview] = useState(reviewValidation);

  const dispatch = useDispatch();

  const sendReview = () => {
    const review = {
      rating: rating,
      comment: comment,
    };
    dispatch(addProductReview(review, product._id));
    reviewFalse();
  };

  const reviewFalse = () => {
    history.push({
      state: { review: false },
    });
    setShowReview(false);
  };

  const reviewValidationExist = () => {
    if (Object.keys(product).length !== 0) {
      if (reviewValidation) {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));

        var alreadyreviewed = false;

        for (let i = 0; i < product.reviews.length; i++) {
          if (product.reviews[i].userid === currentUser._id) {
            alreadyreviewed = true;
          }
        }

        if (alreadyreviewed) {
          reviewFalse();
          alert("you have already reviewed this product");
        }
      }
    }
  };

  useEffect(() => {
    reviewValidationExist();
  });

  return (
    <div>
      <Accordion.Item eventKey="1">
        <Accordion.Header>
          Reviews ({product.reviews && product.reviews.length}){" "}
          {
            <ReactStars
              count={5}
              value={product.rating}
              size={24}
              isHalf={true}
              emptyIcon={<FaStar />}
              halfIcon={<FaStarHalfAlt />}
              fullIcon={<FaStar />}
              activeColor="#ffd700"
              edit={false}
            />
          }
        </Accordion.Header>
        <Accordion.Body>
          <h1>Latest Reviews</h1>

          {product.reviews &&
            product.reviews.map((review, index) => {
              return (
                <div key={index}>
                  <ReactStars
                    count={5}
                    value={review.rating}
                    size={24}
                    isHalf={true}
                    emptyIcon={<FaStar />}
                    halfIcon={<FaStarHalfAlt />}
                    fullIcon={<FaStar />}
                    activeColor="#ffd700"
                    edit={false}
                  />
                  <p>{review.comment}</p>
                  <p>By: {review.name}</p>
                  <hr />
                </div>
              );
            })}
        </Accordion.Body>
      </Accordion.Item>

      {/* Giving review */}
      <Modal show={showReview} onHide={reviewFalse}>
        <Modal.Header closeButton>
          <Modal.Title>Give Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactStars
            count={5}
            value={rating}
            size={24}
            isHalf={true}
            emptyIcon={<FaStar />}
            halfIcon={<FaStarHalfAlt />}
            fullIcon={<FaStar />}
            activeColor="#ffd700"
            onChange={(e) => setRating(e)}
          />
          <Form.Control
            type="text"
            value={comment}
            placeholder="Comment"
            onChange={(e) => setComment(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={reviewFalse}>
            Close
          </Button>
          <Button variant="primary" onClick={sendReview}>
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Review;
