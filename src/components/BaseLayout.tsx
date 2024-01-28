import { Outlet } from "react-router-dom"
import { Nav } from "./Nav"

export function BaseLayout() {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  )
}
