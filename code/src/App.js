// import React from 'react';
// import Test1 from './Test1';
// import Test2 from './Test2';
// import Home1 from './Home1';
// function App() {
//   return (
//     <div className="App">
// <Test1/>
//     </div>
//   );
// }

// export default App;

// import React from 'react'
// import Smapca from './Smapca'
// import Test1 from './Test1';
// import Home1 from './Home1';
// import Proutes from './Proutes'

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// function App() {
//   return (
//     <div>
//       <Router>
//         <Routes>
//         <Route path="/User/Authentication" element={<Home1 />} />
//         <Route path="/User/Dashboard" element={<Smapca />} />
//         <Route path="/*" element={<Proutes />} />
//         </Routes>
//       </Router>
//     </div>
//   )
// }

// export default App

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home1 from './Home1';
import Test1 from './Test1'; 
import Smapca from './Smapca'; 
import Proutes from './Proutes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Home1" element={<Home1 />} />
        <Route path="/Test1" element={<Test1 />} />
        <Route path="/Smapca" element={<Smapca />} />
        <Route path="/*" element={<Proutes />} />
      </Routes>
    </Router>
  );
}

export default App;
