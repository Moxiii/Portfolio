import { Outlet } from "react-router-dom";
import Navbar from "../../Navbar/Navbar.tsx";
import Footer from "../../Footer/Footer.tsx";
import { useMediaQuery } from "react-responsive";
import { ThemeProvider } from "../Provider/Theme/ThemeContext.tsx";
import { JSX , Suspense } from "react";
import Loading from "../Loading/LoadingScreen.tsx"
import MobileView from "../../MobileView/MobileView.tsx";
export default function Layout(): JSX.Element {
  const isDesktop = useMediaQuery({ minWidth: 800 });
  return (
      <Suspense fallback={<Loading/>}>
    <ThemeProvider>
      {isDesktop ? (
        <div className="app">
          <Navbar />
          <Outlet />
          <Footer/>
        </div>
      ) : (
        <MobileView />
      )}


    </ThemeProvider>
      </Suspense>
  );
}
