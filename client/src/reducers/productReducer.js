export const getAllProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case "GET_ALL_PRODUCTS_REQUEST":
      return {
        loading: true,
      };

    case "GET_ALL_PRODUCTS_SUCCESS":
      return {
        loading: false,
        products: action.payload,
      };

    case "GET_ALL_PRODUCTS_FAILED":
      return {
        error: action.payload,
        loading: true,
      };

    default:
      return state;
  }
};

export const getAllCategoryProductsReducer = (
  state = { products: [] },
  action
) => {
  switch (action.type) {
    case "GET_ALL_CATEGORY_PRODUCTS_REQUEST":
      return {
        loading: true,
      };

    case "GET_ALL_CATEGORY_PRODUCTS_SUCCESS":
      return {
        loading: false,
        products: action.payload,
      };

    case "GET_ALL_CATEGORY_PRODUCTS_FAILED":
      return {
        error: action.payload,
        loading: true,
      };

    default:
      return state;
  }
};

export const getAllSubCategoryProductsReducer = (
  state = { products: [] },
  action
) => {
  switch (action.type) {
    case "GET_ALL_SUB_CATEGORY_PRODUCTS_REQUEST":
      return {
        loading: true,
      };

    case "GET_ALL_SUB_CATEGORY_PRODUCTS_SUCCESS":
      return {
        loading: false,
        products: action.payload,
      };

    case "GET_ALL_SUB_CATEGORY_PRODUCTS_FAILED":
      return {
        error: action.payload,
        loading: true,
      };

    default:
      return state;
  }
};

export const getProductByIdReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case "GET_PRODUCT_BY_ID_REQUEST":
      return {
        loading: true,
      };

    case "GET_PRODUCT_BY_ID_SUCCESS":
      return {
        loading: false,
        product: action.payload,
      };

    case "GET_PRODUCT_BY_ID_FAILED":
      return {
        error: action.payload,
        loading: true,
      };

    default:
      return state;
  }
};

export const addProductReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_PRODUCT_REVIEW_REQUEST":
      return {
        loading: true,
      };

    case "ADD_PRODUCT_REVIEW_SUCCESS":
      return {
        loading: false,
        success: true,
      };

    case "ADD_PRODUCT_REVIEW_FAILED":
      return {
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};
