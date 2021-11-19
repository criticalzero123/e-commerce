import React from "react";

import { Route, Switch } from "react-router-dom";

import ShopAll from "../ShopAllPage/ShopAll";
import CategoryPage from "../CategoryPage/CategoryPage";
import Subcategory from "../SubcategoryPage/Subcategory";
import ProductDetails from "../../ProductDetails/ProductDetails";
import ShopNavigation from "../../../components/Shop/ShopNavigation/ShopNavigation";
import ShopSearch from "../ShopSearch/ShopSearch";

const Shop = () => {
  return (
    <div>
      <ShopNavigation />
      <Switch>
        <Route path="/shop/all" component={ShopAll} exact />
        <Route path="/shop/all/search/:search" component={ShopSearch} exact />
        <Route path="/shop/:category" component={CategoryPage} exact />
        <Route
          path="/shop/:category/:subcategory"
          component={Subcategory}
          exact
        />
        <Route
          path="/shop/:category/:subcategory/:productid"
          component={ProductDetails}
          exact
        />
      </Switch>
    </div>
  );
};

export default Shop;
