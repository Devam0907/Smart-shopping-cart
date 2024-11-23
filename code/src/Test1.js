 // const data = [
  //   { id: "1", Image: "/images/MarinaraSauce.png", Product: "Marinara Sauce", Description: "Our Classic Marinara Sauce is a rich and flavorful blend of ripe tomatoes, garlic, onions, and a medley of Italian herbs and spices.", Price: 189 },
  //   { id: "2", Image: "/images/PeanutButter.png", Product: "Organic Peanut Butter", Description: "Enjoy the creamy, rich taste of our organic peanut butter.", Price: 449 },
  //   { id: "3", Image: "/images/WirelessMouse.jpeg", Product: "Dell M001 Wireless Optical Gaming Mouse", Description: "Enhance your computer experience with our ergonomic wireless mouse.", Price: 300 },
  //   { id: "4", Image: "/images/WaterBottle.png", Product: "Stainless Steel Water Bottle", Description: "Stay hydrated throughout the day with our durable stainless steel water bottle.", Price: 280 },
  //   { id: "5", Image: "/images/CoffeeMug.png", Product: "Coffee Mug", Description: "Enjoy your favorite hot beverages in style with our ceramic coffee mug.", Price: 149 }
  // ];




import React, { useState, useEffect, useRef } from 'react';
import { Button, Typography, AppBar, Toolbar, IconButton, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Test1.css'; // CSS file for styling
import Home1 from './Home1'; // Import Home component for redirection

const Product = ({ name, description, price, onRemove, onIncrement, onDecrement, quantity }) => {
  return (
    <li className="product">
      <img src={`/${name.toLowerCase()}.png`} alt={name} /> {/* Image path */}
      <div className="product-details">
        <Typography variant="h5">{name}</Typography>
        <Typography variant="body1" className="description">{description}</Typography>
      </div>
      <div className="product-actions">
        <Typography variant="body1" className="price">${price}</Typography>
        <div className="quantity">
          <Button className="decrement" onClick={onDecrement}>-</Button>
          <Typography variant="body1" className="quantity-value">{quantity}</Typography>
          <Button className="increment" onClick={onIncrement}>+</Button>
        </div>
        <Button className="remove" style={{backgroundColor:'rgb(255, 98, 0)',color:'black'}} onClick={onRemove}>Remove</Button>
      </div>
    </li>
  );
};

const Summary = ({ totalAmount, removeAll, payNow, openProductList }) => {
  return (
    <section >
      <div className="total">
        <Typography variant="h5">Total Amount of all Products:</Typography>
        <Typography variant="h6" id="total-amount">${totalAmount.toFixed(2)}</Typography>
      </div>
      <div className="checkout">     
        <Button variant="contained" id="remove-all"  onClick={removeAll}>Remove all</Button>
        <Button variant="contained" id="see-all" onClick={openProductList}>See all Products</Button>
        <Button variant="contained" id="pay-now" onClick={payNow}>Pay Now</Button>
      </div>
    </section>
  );
};

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const CommonDetails = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [currentDay, setCurrentDay] = useState("");

  useInterval(() => {
    const now = new Date();
    setCurrentDate(now.toLocaleDateString());
    setCurrentTime(now.toLocaleTimeString());
    setCurrentDay(now.toLocaleString('en-US', { weekday: 'long' }));
    setCurrentCity("Ahmedabad"); // Replace with your method of getting the city
  }, 1000);

  return (
    <div className="common-details">
      <Typography variant="body1" className="live-date">{currentDate}</Typography>
      <Typography variant="body1" className="live-time">{currentTime}</Typography>
      <Typography variant="body1" className="live-day">{currentDay}</Typography>
      <Typography variant="body1" className="live-city">{currentCity}</Typography>
    </div>
  );
};

const Test1 = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [products, setProducts] = useState([
    { name: 'Product1', description: 'Description of Product 1', price: 10.99, quantity: 1 },
    { name: 'Product2', description: 'Description of Product 2', price: 10.99, quantity: 1 },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false); // State to handle redirection
  const [isProductListOpen, setIsProductListOpen] = useState(false); // State to handle product list dialog

  useEffect(() => {
    calculateTotalPrice();
  }, [products]);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    products.forEach(product => {
      totalPrice += product.price * product.quantity;
    });
    setTotalAmount(totalPrice);
  };

  const handleRemove = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handleIncrement = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity += 1;
    setProducts(updatedProducts);
  };

  const handleDecrement = (index) => {
    const updatedProducts = [...products];
    if (updatedProducts[index].quantity > 1) {
      updatedProducts[index].quantity -= 1;
      setProducts(updatedProducts);
    }
  };

  const handleRemoveAll = () => {
    setProducts([]);
  };

  const handlePayNow = () => {
    console.log("Payment logic goes here.");
  };

  const handleLogout = () => {
    setIsLoggedOut(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleAccountClick = () => {
    setIsDialogOpen(true);
  };

  const openProductListDialog = () => {
    setIsProductListOpen(true);
  };

  const closeProductListDialog = () => {
    setIsProductListOpen(false);
  };

  if (isLoggedOut) {
    return <Home1 />;
  }

  return (
    <div>
      <header>
        <div className="icons">
          <Box sx={{ flexGrow: 1 }} />
          <ShoppingCartIcon />
          <SettingsIcon />
          <AccountCircleIcon onClick={handleAccountClick} />
        </div>
        <img className="logo"src="/images/Logo3.png" alt="Company Logo" />
        <Typography variant="h4"><b>Admin Side</b></Typography>
      </header>
      <CommonDetails />
      <main>
        <section className="products">
          <Typography variant="h2">Products</Typography><br/>
          <ul className="product-list">
            {products.map((product, index) => (
              <Product
                key={product.name}
                name={product.name}
                description={product.description}
                price={product.price}
                quantity={product.quantity}
                onRemove={() => handleRemove(index)}
                onIncrement={() => handleIncrement(index)}
                onDecrement={() => handleDecrement(index)}
              />
            ))}
          </ul>
        
        </section>
        <Summary 
          totalAmount={totalAmount} 
          removeAll={handleRemoveAll} 
          payNow={handlePayNow} 
          openProductList={openProductListDialog} 
        />
      </main>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Account Options</DialogTitle>
        <DialogContent>
          <Typography>Would you like to log out?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogout} color="primary">Logout</Button>
          <Button onClick={handleDialogClose} color="primary" autoFocus>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog to show product list */}
      <Dialog open={isProductListOpen} onClose={closeProductListDialog}>
        <DialogTitle>All Products</DialogTitle>
        <DialogContent>
          <ul>
            {products.map((product, index) => (
              <li key={index}>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2">{product.description}</Typography>
                <Typography variant="body2">Price: ${product.price.toFixed(2)}</Typography>
                <Typography variant="body2">Quantity: {product.quantity}</Typography>
              </li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeProductListDialog} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Test1;
