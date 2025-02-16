import {Outlet} from "react-router-dom";
import Navbar from "../Navbar/Navbar.tsx";
import {JSX} from "react";
export default function Layout() : JSX.Element  {
    return(
        <>
           <div className="app">
               <Navbar/>
               <Outlet />
           </div>
        </>
    )
}
