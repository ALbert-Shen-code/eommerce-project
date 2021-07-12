import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart, Checkout} from './Components';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProduct = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  }

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    setCart(cart);
  }

  const handleAddToCart = async (productId, quanitity) => {
    const item = await commerce.cart.add(productId, quanitity);
    setCart(item.cart);

  }

  const handleUpdateQty = async (productId, quantity) => {

    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);

  }

  const removeQty = async (productId) => {

    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);

  }

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  }

  useEffect(() => {
    fetchProduct();
    fetchCart();
  }, [])


  return (
    <Router>
      <div className="App">
        <Navbar totalItem={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>

          <Route path="/cart">
            <Cart cart={cart} handleUpdateQty={handleUpdateQty} removeQty={removeQty} handleEmptyCart={handleEmptyCart} />
          </Route>

          <Route path="/checkout">
            <Checkout cart={cart}/>
          </Route>


        </Switch>

      </div>
    </Router>

  );
}

export default App;
