import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// import App from './App.jsx'
import { router } from './routes.jsx';

// import { RouterProvider } from 'react-router';
import { RouterProvider } from "react-router-dom"; // Fix by chatGPT, installed npm install react-router-dom

/* Move to routes.jsx */
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <div>
//         <h1>Hello World</h1>
//         <Link to="login" >Login</Link>
//       </div>
//     ),
//   },
//   {
//     path: "login",
//     element: <div>Login</div>,
//   }
// ]);


/* createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
) */


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
