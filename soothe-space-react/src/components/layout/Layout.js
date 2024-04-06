import Navbar from "./Navbar";
import "../../assets/styles/app.css";
import { Outlet } from "react-router-dom";

function Layout() {

  return (
    <div className="layout-cont">
      <Outlet /> {/* Outlet renders the current selected route to this Layout component (rendered above navbar) */}
      <Navbar /> {/* Navbar will set the URL & track browsing history (using Links via react-router-dom) */}
    
    </div>
  );
}
export default Layout;
