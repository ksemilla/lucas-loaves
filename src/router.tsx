import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"
import { HomePage } from "./pages/home"
import { BaseLayout } from "./components/BaseLayout"
import { ProductList } from "./pages/products"
import { AboutPage } from "./pages/about"
import { CareersPage } from "./pages/careers"

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<BaseLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/careers" element={<CareersPage />} />
    </Route>
  )
)
