import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import './Layout.css'
import { NavItems } from "./nav/NavItems"

export default function Layout() {
  return (
    <>
      <header>
        <Navbar items={NavItems}/>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>My MovieList</p>
      </footer>
    </>
  )
}