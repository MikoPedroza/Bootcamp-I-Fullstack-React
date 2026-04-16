import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { router } from './routes.jsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { RouterProvider } from "react-router-dom"; // Fix by chatGPT, installed npm install react-router-dom

// Context API
import { TasksContextProvider } from './context/tasks.context';

const queryClient = new QueryClient();

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <RouterProvider router={router} />
//   </StrictMode>,
// )
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <QueryClientProvider client={ queryClient } >
//       <RouterProvider router={router} />
//       <ReactQueryDevtools initialIsOpen={false} />
//     </QueryClientProvider>
//     {/* <RouterProvider router={router} /> */}
//   </StrictMode>,
// )
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={ queryClient } >
      <TasksContextProvider>
        <RouterProvider router={router} />
      </TasksContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    {/* <RouterProvider router={router} /> */}
  </StrictMode>,
)
