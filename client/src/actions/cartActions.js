export const addToCart =
  (product, quantity, size, stock, color, image) => (dispatch, getState) => {
    const cartItem = {
      name: product.name,
      _id: product._id,
      price: product.price,
      stock: stock,
      color: color,
      quantity: quantity,
      image: image,
      size: size,
      category: product.category,
      subCategory: product.subCategory,
    };

    dispatch({ type: "ADD_TO_CART", payload: cartItem });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cartReducer.cartItems)
    );
  };

export const deleteFromCart = (item) => (dispatch, getState) => {
  dispatch({ type: "DELETE_FROM_CART", payload: item });
  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartReducer.cartItems)
  );
};
