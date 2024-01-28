import { Outlet } from "react-router-dom"
import { Nav } from "./Nav"

export function BaseLayout() {
  return (
    <div>
      <Nav />
      <div className="pt-14">
        <Outlet />
      </div>
    </div>
  )
}
