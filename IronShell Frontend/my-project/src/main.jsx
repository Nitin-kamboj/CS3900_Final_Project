import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import './index.css'
import { Header } from './components/Head.jsx'
import { Footer } from './components/footer.jsx'
import { routeTree } from './routeTree.gen'
const router = createRouter({ routeTree })
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Header /> */}
    <RouterProvider router={router} />
    {/* <Footer/> */}
  </StrictMode>,
)
