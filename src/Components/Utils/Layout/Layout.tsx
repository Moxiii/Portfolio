import { Outlet } from "react-router-dom";
import Navbar from "../../Navbar/Navbar.tsx";
import Footer from "../../Footer/Footer.tsx";
import { useMediaQuery } from "react-responsive";
import { ThemeProvider } from "../Provider/Theme/ThemeContext.tsx";
import { JSX } from "react";
import MobileView from "../../MobileView/MobileView.tsx";
export default function Layout(): JSX.Element {
  const isDesktop = useMediaQuery({ minWidth: 769 });
  return (
    <ThemeProvider>
      {isDesktop ? (
        <div className="app">
          <Navbar />
          <Outlet />
        </div>
      ) : (
        <MobileView />
      )}
      <Footer />
    </ThemeProvider>
  );
}
