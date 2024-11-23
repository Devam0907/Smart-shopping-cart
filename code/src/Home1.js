// import React, { useState } from "react";
// import { Alert, Stack, Button as MUIButton, TextField } from '@mui/material';
// import * as Components from './Components';
// import "./styles.css";

// function Home1() {
//   const [signIn, toggle] = useState(true);
//   const [alert, setAlert] = useState(false);
//   const [alert1, setAlert1] = useState(false);

//   const handleChange = (e) => {
//     // Handle form input changes if needed
//   };

//   const handleSubmit = () => {
//     // Logic to check sign-in credentials
//     const mobileNumber = document.getElementById('signin-mobile-number').value;
//     const password = document.getElementById('signin-password').value;

//     if (!mobileNumber || !password) {
//       setAlert(true);
//       setAlert1(false);
//     } else {
//       // Check credentials
//       // If incorrect, show alert1
//       // Else, proceed with sign-in
//       setAlert(false);
//       setAlert1(true);
//     }
//   };

//   const handleSignUp = () => {
//     // Logic to check sign-up data
//     const name = document.getElementById('signup-name').value;
//     const mobileNumber = document.getElementById('signup-mobile-number').value;
//     const password = document.getElementById('signup-password').value;

//     if (!name || !mobileNumber || !password) {
//       setAlert(true);
//       setAlert1(false);
//     } else {
//       // Validate and register
//       // If error, show alert
//       // Else, proceed with sign-up
//       setAlert(false);
//       setAlert1(false);
//     }
//   };

//   return (
//     <div className="home">
//       <img src="/images/Logo3.png" alt="Company Logo" />
//       <br/>

//       <Components.Container>
//         <Components.SignUpContainer signinIn={signIn}>
//           <Components.Form>
//             <Components.Title>Create Account</Components.Title>
//             <Components.Input id="signup-name" type='text' placeholder='Name' />
//             <Components.Input id="signup-mobile-number" type='number' placeholder='Mobile number' />
//             <Components.Input id="signup-password" type='password' placeholder='Password' />
//             <Components.Button onClick={handleSignUp}>Sign Up</Components.Button>
//             {alert && (
//         <Stack sx={{ width: '100%' }} spacing={2}>
//           <Alert severity="error">This is an error alert — All fields are mandatory!</Alert>
//         </Stack>
//       )}
//           </Components.Form>
//         </Components.SignUpContainer>

//         <Components.SignInContainer signinIn={signIn}>
//           <Components.Form>
//             <Components.Title>Sign in</Components.Title>
//             <Components.Input id="signin-mobile-number" type='number' placeholder='Mobile number' />
//             <Components.Input id="signin-password" type='password' placeholder='Password' />
//             <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
//             <Components.Button onClick={handleSubmit}>Sign In</Components.Button>
//             {alert && (
//         <Stack sx={{ width: '100%' }} spacing={2}>
//           <Alert severity="error">This is an error alert — All fields are mandatory!</Alert>
//         </Stack>
//       )}
//       {alert1 && (
//         <Stack sx={{ width: '100%' }} spacing={2}>
//           <Alert severity="error">Incorrect Email or password! Please register first if not already done.</Alert>
//         </Stack>
//       )}
//           </Components.Form>
//         </Components.SignInContainer>

//         <Components.OverlayContainer signinIn={signIn}>
//           <Components.Overlay signinIn={signIn}>
//             <Components.LeftOverlayPanel signinIn={signIn}>
//               <Components.Title>Welcome Back!</Components.Title>
//               <Components.Paragraph>
//                 To keep connected with us please login with your personal info
//               </Components.Paragraph>
//               <Components.GhostButton onClick={() => toggle(true)}>
//                 Login
//               </Components.GhostButton>
//             </Components.LeftOverlayPanel>

//             <Components.RightOverlayPanel signinIn={signIn}>
//               <Components.Title>Hello, Friend!</Components.Title>
//               <Components.Paragraph>
//                 Enter Your login details and start shopping
//               </Components.Paragraph>
//               <Components.GhostButton onClick={() => toggle(false)}>
//                 Register
//               </Components.GhostButton>
//             </Components.RightOverlayPanel>
//           </Components.Overlay>
//         </Components.OverlayContainer>
//       </Components.Container>
//     </div>
//   );
// }

// export default Home1;


import React, { useState } from "react";
import { Alert, Stack } from '@mui/material';
import * as Components from './Components';
import "./styles.css";
import { useNavigate } from 'react-router-dom';

const adminCredentials = {
  mobileNumber: '1234567890', // Updated for proper 10-digit number
  password: '1234567890',
};

const validateMobileNumber = (number) => {
  const regex = /^[0-9]{10}$/; // Ensures exactly 10 digits
  return regex.test(number);
};

function Home1() {
  const [signIn, toggle] = useState(true);
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });
  
  const toNavigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const mobileNumber = document.getElementById('signin-mobile-number').value;
    const password = document.getElementById('signin-password').value;

    if (!mobileNumber || !password) {
      setAlert({ open: true, message: 'All fields are mandatory!', severity: 'error' });
    } else if (!validateMobileNumber(mobileNumber)) {
      setAlert({ open: true, message: 'Please enter a valid 10-digit mobile number.', severity: 'error' });
    } else {
      if (mobileNumber === adminCredentials.mobileNumber && password === adminCredentials.password) {
        // Redirect to admin side
        toNavigate('/Test1');
      } else {
        // Redirect to user side
        toNavigate('/Smapca');
      }
    }
  };

  const handleSignUp = () => {
    const name = document.getElementById('signup-name').value;
    const mobileNumber = document.getElementById('signup-mobile-number').value;
    const password = document.getElementById('signup-password').value;

    if (!name || !mobileNumber || !password) {
      setAlert({ open: true, message: 'All fields are mandatory!', severity: 'error' });
    } else if (!validateMobileNumber(mobileNumber)) {
      setAlert({ open: true, message: 'Please enter a valid 10-digit mobile number.', severity: 'error' });
    } else {
      // Validate and register
      setAlert({ open: false, message: '', severity: '' });
      // Proceed with registration logic
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <div className="home">
      <img src="/images/Logo3.png" alt="Company Logo" />
      <br/>

      <Components.Container>
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form>
            <Components.Title>Create Account</Components.Title>
            <Components.Input id="signup-name" type='text' placeholder='Name' />
            <Components.Input id="signup-mobile-number" type='text' placeholder='Mobile number' /> {/* Changed to text */}
            <Components.Input id="signup-password" type='password' placeholder='Password' />
            <Components.Button onClick={handleSignUp}>Sign Up</Components.Button>
            {alert.open && (
              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert onClose={handleCloseAlert} severity={alert.severity}>{alert.message}</Alert>
              </Stack>
            )}
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signinIn={signIn}>
          <Components.Form>
            <Components.Title>Sign in</Components.Title>
            <Components.Input id="signin-mobile-number" type='text' placeholder='Mobile number' /> {/* Changed to text */}
            <Components.Input id="signin-password" type='password' placeholder='Password' />
            <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
            <Components.Button onClick={handleSubmit}>Sign In</Components.Button>
            {alert.open && (
              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert onClose={handleCloseAlert} severity={alert.severity}>{alert.message}</Alert>
              </Stack>
            )}
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signinIn={signIn}>
          <Components.Overlay signinIn={signIn}>
            <Components.LeftOverlayPanel signinIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Login
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signinIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter Your login details and start shopping
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Register
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
}

export default Home1;
