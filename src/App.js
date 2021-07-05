import React, {useState,useEffect} from "react";
import {commerce} from "./lib/commerce";
import {Products, Navbar,Cart} from './Components';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProduct = async () => {
    const {data} = await commerce.products.list();
    setProducts(data);
  }

  const fetchCart = async ()=>{
    const cart = await commerce.cart.retrieve();
    setCart(cart);
  }

  const handleAddToCart = async (productId, quanitity)=>{
    const item = await commerce.cart.add(productId,quanitity);
    setCart(item.cart);

  }

  useEffect(()=>{
    fetchProduct();
    fetchCart();
  },[])

  
  return (
    <div className="App">
      <Navbar totalItem = {cart.total_items}/>
      <Products products={products} onAddToCart = {handleAddToCart}/>
      <Cart cart= {cart}/>
    </div>
  );
}

export default App;
