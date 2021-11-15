import axios from "axios";

export const getAllProducts = () => (dispatch) => {
  dispatch({ type: "GET_ALL_PRODUCTS_REQUEST" });

  axios
    .get("/api/products/getallproducts")
    .then((res) => {
      dispatch({ type: "GET_ALL_PRODUCTS_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "GET_ALL_PRODUCTS_FAILED", payload: err });
    });
};

export const getAllCategoryProducts = (category) => (dispatch) => {
  dispatch({ type: "GET_ALL_CATEGORY_PRODUCTS_REQUEST" });

  axios
    .post("/api/products/getallcategoryproducts", { category })
    .then((res) => {
      dispatch({
        type: "GET_ALL_CATEGORY_PRODUCTS_SUCCESS",
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: "GET_ALL_CATEGORY_PRODUCTS_FAILED", payload: err });
    });
};

export const getAllSubCategoryProducts =
  (category, subCategory) => (dispatch) => {
    dispatch({ type: "GET_ALL_SUB_CATEGORY_PRODUCTS_REQUEST" });

    axios
      .post("/api/products/getallsubcategoryproducts", {
        category,
        subCategory,
      })
      .then((res) => {
        dispatch({
          type: "GET_ALL_SUB_CATEGORY_PRODUCTS_SUCCESS",
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "GET_ALL_SUB_CATEGORY_PRODUCTS_FAILED",
          payload: err,
        });
      });
  };

export const getProductById = (productId) => (dispatch) => {
  dispatch({ type: "GET_PRODUCT_BY_ID_REQUEST" });

  axios
    .post("/api/products/getproductbyid", { productId })
    .then((res) => {
      dispatch({ type: "GET_PRODUCT_BY_ID_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "GET_PRODUCT_BY_ID_FAILED", payload: err });
    });
};

export const addProductReview = (review, productid) => (dispatch, getState) => {
  dispatch({ type: "ADD_PRODUCT_REVIEW_REQUEST" });
  const currentUser = getState().loginReducer.currentUser;

  axios
    .post("/api/products/addreview", { review, productid, currentUser })
    .then((res) => {
      dispatch({ type: "ADD_PRODUCT_REVIEW_SUCCESS" });
      window.location.reload();
      alert("Your review submitted successfully");
    })
    .catch((err) => {
      dispatch({ type: "ADD_PRODUCT_REVIEW_FAILED" });
    });
};

// PUT CATEGORY IN HERE IF YOU KNOW WHAT TO DO NOW
export const filterProducts = (sort, category, subCategory) => (dispatch) => {
  dispatch({ type: "GET_ALL_PRODUCTS_REQUEST" });

  var filteredProducts;
  axios
    .get("/api/products/getallproducts")
    .then((res) => {
      filteredProducts = res.data;

      // For the category filter
      if (category.length > 0) {
        filteredProducts = res.data.filter((product) =>
          category.includes(product.category.toLowerCase())
        );
      }

      // For Subcategory filter
      if (subCategory.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          subCategory.includes(product.subCategory.toLowerCase())
        );
      }

      // For the sort
      if (sort !== "popular") {
        if (sort === "highToLow") {
          filteredProducts = filteredProducts.sort((a, b) => {
            return b.price - a.price;
          });
        } else {
          filteredProducts = filteredProducts.sort((a, b) => {
            return a.price - b.price;
          });
        }
      }

      dispatch({ type: "GET_ALL_PRODUCTS_SUCCESS", payload: filteredProducts });
    })
    .catch((err) => {
      dispatch({ type: "GET_ALL_PRODUCTS_FAILED", payload: err });
    });
};

// if in category and want to filter sub products
export const filterSubCategoryProducts =
  (sort, category, subCategory) => (dispatch) => {
    dispatch({ type: "GET_ALL_CATEGORY_PRODUCTS_REQUEST" });

    var filteredSubProducts;

    axios
      .post("/api/products/getallcategoryproducts", { category })
      .then((res) => {
        filteredSubProducts = res.data;

        // For Subcategory filter
        if (subCategory.length > 0) {
          filteredSubProducts = res.data.filter((product) =>
            subCategory.includes(product.subCategory.toLowerCase())
          );
        }

        // For the sort
        if (sort !== "popular") {
          if (sort === "highToLow") {
            filteredSubProducts = filteredSubProducts.sort((a, b) => {
              return b.price - a.price;
            });
          } else {
            filteredSubProducts = filteredSubProducts.sort((a, b) => {
              return a.price - b.price;
            });
          }
        }

        dispatch({
          type: "GET_ALL_CATEGORY_PRODUCTS_SUCCESS",
          payload: filteredSubProducts,
        });
      })
      .catch((err) => {
        dispatch({ type: "GET_ALL_CATEGORY_PRODUCTS_FAILED", payload: err });
      });
  };

//when in sub category page
export const filterSubProducts =
  (sort, category, subCategory) => (dispatch) => {
    dispatch({ type: "GET_ALL_SUB_CATEGORY_PRODUCTS_REQUEST" });
    var filteredSubProducts;

    axios
      .post("/api/products/getallsubcategoryproducts", {
        category,
        subCategory,
      })
      .then((res) => {
        filteredSubProducts = res.data;

        // For the sort
        if (sort !== "popular") {
          if (sort === "highToLow") {
            filteredSubProducts = res.data.sort((a, b) => {
              return b.price - a.price;
            });
          } else {
            filteredSubProducts = res.data.sort((a, b) => {
              return a.price - b.price;
            });
          }
        }

        dispatch({
          type: "GET_ALL_SUB_CATEGORY_PRODUCTS_SUCCESS",
          payload: filteredSubProducts,
        });
      })
      .catch((err) => {
        dispatch({
          type: "GET_ALL_SUB_CATEGORY_PRODUCTS_FAILED",
          payload: err,
        });
      });
  };
