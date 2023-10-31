
import React from 'react'; // Import React to use JSX
import AppNavigation from './AppNavigation';
// import Home from "./pages/home/Home";
// import Login from "./pages/login/Login";
// import Profile from "./pages/profile/Profile";
// import Register from "./pages/register/Register";
// import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'; // Import useNavigate
// import { useContext } from "react";
// import { AuthContext } from "./context/AuthContext";

function App() {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate(); 

//   return (
//     <Router>
//       <Routes>
//         <Route exact path="/">
//           {user ? <Home /> : <Register />}
//         </Route>
//         <Route path="/login">
//           {user ? (
//             () => {
//               navigate('/'); 
//               return null; 
//             }
//           ) : (
//             <Login />
//           )}
//         </Route>
//         <Route path="/register">
//           {user ? (
//             () => {
//               navigate('/'); 
//               return null; 
//             }
//           ) : (
//             <Register />
//           )}
//         </Route>
//         <Route path="/profile/:username">
//           <Profile />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }
<AppNavigation />

}

export default App;