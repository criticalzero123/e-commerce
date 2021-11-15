import { BrowserRouter, Route } from "react-router-dom";

import "./App.css";

// Components
import Navigationbar from "./components/Navigationbar/Navigationbar";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/ShopRouter/Shop";

import Cart from "./pages/Cart/Cart";
import Signup from "./pages/Sign-in-and-sign-up/Sign-up/Signup";
import Signin from "./pages/Sign-in-and-sign-up/Sign-in/Signin";
import Order from "./pages/Order/Order";
import Orderinfo from "./pages/Order/OrderInfo/Orderinfo";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <div className="App ">
      <BrowserRouter>
        <Navigationbar />
        <Route path="/" component={Home} exact />
        {/* Shop */}
        <Route path="/shop" component={Shop} />

        {/* Cart */}
        <Route path="/cart" component={Cart} />

        {/* Sign-in and Sign-up */}

        <Route path="/register" component={Signup} />
        <Route path="/login" component={Signin} />

        {/* Order */}
        <Route path="/orders" component={Order} exact />
        <Route path="/orders/:orderid" component={Orderinfo} />
      </BrowserRouter>
    </div>
  );
}

export default App;
