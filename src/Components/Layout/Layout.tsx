import {Outlet} from "react-router-dom";
import Navbar from "../Navbar/Navbar.tsx";
import {  useMediaQuery } from 'react-responsive'
import {JSX} from "react";
import MobileView from "../MobileView/MobileView.tsx";
export default function Layout() : JSX.Element  {
    const isDesktop = useMediaQuery({minWidth:769})
    return(
        <>
            {isDesktop ? (
                <div className="app">
                    <Navbar/>
                    <Outlet/>
                </div>
            ): (
                 <MobileView/>
            )}

        </>
    )
}
