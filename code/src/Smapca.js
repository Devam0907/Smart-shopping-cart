import React, { useState, useEffect } from 'react';
import './Smapca.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography, styled, Menu, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const App = () => {
  const toNavigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [cartDialogOpen, setCartDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dateTime, setDateTime] = useState(new Date());
  const [detectedObjects, setDetectedObjects] = useState([]); // State for detected objects
  const [grandTotal, setGrandTotal] = useState(0); // State for grand total

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch detected objects at intervals of 5 seconds
  useEffect(() => {
    const fetchInterval = setInterval(() => {
      fetchDetectedObjects();
    }, 5000); // Fetch data every 5 seconds

    return () => clearInterval(fetchInterval); // Clean up interval on unmount
  }, []);

  const fetchDetectedObjects = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/detect');
      const data = await response.json();
      if (data.success) {
        setDetectedObjects(data.objects); // Store the fetched objects

        // Calculate grand total based on confidence
        const total = data.objects.reduce((acc, obj) => acc + obj.confidence, 0);
        setGrandTotal(total.toFixed(2)); // Set grand total with 2 decimal precision
      } else {
        console.error('Error fetching object detection data');
      }
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };

  const handleClickOpen = (item) => {
    setCurrentItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentItem(null);
  };

  const handleCartClickOpen = () => {
    setCartDialogOpen(true);
  };

  const handleCartClose = () => {
    setCartDialogOpen(false);
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    setAnchorEl(null);
    toNavigate('/Home1');
  };

  return (
    <div className='main'>
      <React.Fragment>
        <center>
          <div className='smapca'>
            <div className='logo'>
              <img src='/images/logo3.png' alt='Smapca' />
            </div>
            <div className='date-time'>
              {dateTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} {dateTime.toLocaleTimeString()}
            </div>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleProfileClick}
              className="profile-icon"
            >
              <AccountCircleIcon sx={{ fontSize: '40px' }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileClose}
            >
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>
          </div>
          <br />
        </center>
        <Container className='maintable'>
          <Row>
            <Col md={12} className='mycart'>
              My Cart
            </Col>
          </Row>
          <Container className='table'>
            <Row className='attribute'>
              <Col md={2}>OBJECT IMAGE</Col>
              <Col md={4}>DESCRIPTION</Col>
              <Col md={2}>QUANTITY</Col>
              <Col md={3}>AMOUNT</Col>
            </Row>
            <br />
            {detectedObjects.length === 0 ? (
              <p>No objects detected yet.</p>
            ) : (
              detectedObjects.map((item, index) => (
                <div key={index}>
                  <Row className="product-row">
                    <Col md={2} className='object-name' style={{ backgroundColor:'#ffd9b3'}}>
                      {item.class_name} {/* Detected object name */}
                    </Col>
                    <Col md={4} className='description' style={{ backgroundColor:'#ffd9b3'}}>
                      {item.class_name} {/* Confidence level */}
                    </Col>
                    <Col md={2} className='quantity' style={{ backgroundColor:'#ffd9b3'}}>
                      1 {/* Quantity (hardcoded for now) */}
                    </Col>
                    <Col md={3} className='total-amount' style={{ backgroundColor:'#ffd9b3'}}>
                      ₹ {item.confidence.toFixed(2)} {/* Simulating an amount based on confidence */}
                    </Col>
                  </Row>
                </div>
              ))
            )}
            <Row className="total-row" style={{backgroundColor:'rgb(255, 229, 206)'}}>
              <Col className="text-right">
                <span style={{ backgroundColor: 'rgb(255, 229, 206)', marginRight: '3px'}}>
                  <ShoppingCartOutlinedIcon onClick={handleCartClickOpen} sx={{ fontSize: 30, backgroundColor: 'rgb(255, 229, 206)' }}/>
                </span>
                Grand Total: ₹ {grandTotal} {/* Display dynamic grand total */}
              </Col>
            </Row>
            <BootstrapDialog
              onClose={handleCartClose}
              aria-labelledby="cart-dialog-title"
              open={cartDialogOpen}
            >
              <DialogTitle sx={{ m: 0, p: 2 }} id="cart-dialog-title">
                My Cart
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleCartClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
              <DialogContent dividers>
                <Typography gutterBottom>
                  <div className='cart-description'>
                    {detectedObjects.map((item, index) => (
                      <div key={index}>
                        <p>{item.class_name}: ₹ {item.confidence.toFixed(2)}</p>
                      </div>
                    ))}
                    <div style={{fontWeight:"bold", fontSize:"20px", textAlign:"right"}}>Grand Total: ₹ {grandTotal}</div>
                  </div>
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleCartClose}>
                  Close
                </Button>
              </DialogActions>
            </BootstrapDialog>
          </Container>
        </Container>
      </React.Fragment>
      <br />
    </div>
  );
};

export default App;
