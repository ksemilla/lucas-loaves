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
import LoginPage from "./pages/login"
import { OrdersPage } from "./pages/orders"
import { OrderDetail } from "./pages/orders/OrderDetail"
import { CheckoutPage } from "./pages/checkout/CheckoutPage"
import { ApplicationPage } from "./pages/applications/ApplicationList"

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<BaseLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/orders/:id" element={<OrderDetail />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/applications" element={<ApplicationPage />} />
    </Route>
  )
)
