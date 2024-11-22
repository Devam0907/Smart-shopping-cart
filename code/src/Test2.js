import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  Box,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const CartItem = ({ product, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10) || 1;
    setQuantity(newQuantity);
    onQuantityChange(product.id, newQuantity);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={2}>
        <img src={product.image} alt={product.name} style={{ width: '100%' }} />
      </Grid>
      <Grid item xs={4}>
        <Typography variant="subtitle1">{product.name}</Typography>
        <Typography variant="caption">{product.description}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="subtitle1">₹{product.price.toFixed(2)}</Typography>
      </Grid>
      <Grid item xs={2}>
        <TextField
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          inputProps={{ min: 1 }}
          size="small"
        />
      </Grid>
      <Grid item xs={2}>
        <Typography variant="subtitle1">₹{(quantity * product.price).toFixed(2)}</Typography>
      </Grid>
    </Grid>
  );
};

const Test2 = () => {
  const [cart, setCart] = useState([
    { id: 1, name: 'Product 1', description: 'Description 1', price: 20, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', description: 'Description 2', price: 40, image: 'https://via.placeholder.com/150' },
  ]);

  const handleQuantityChange = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateGrandTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6">SMAPCA</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton aria-label="Shopping Cart">
            <ShoppingCartIcon />
          </IconButton>
          <IconButton aria-label="Settings">
            <SettingsIcon />
          </IconButton>
          <IconButton aria-label="Account">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Card sx={{ margin: 2, padding: 2 }}>
        <Typography variant="h5">My Cart</Typography>
        <CardContent>
          {cart.map((product) => (
            <CartItem key={product.id} product={product} onQuantityChange={handleQuantityChange} />
          ))}
          <Grid container justifyContent="flex-end" mt={2}>
            <Typography variant="h6">Grand Total: ₹{calculateGrandTotal().toFixed(2)}</Typography>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default Test2;