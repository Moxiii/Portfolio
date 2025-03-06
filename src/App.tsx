import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout.tsx";
import Home from "./Screens/Home/Home.tsx";
import About from "./Screens/About/About.tsx";
import Contact from "./Screens/Contact/Contact.tsx";
import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import "./App.scss";
import Admin from "./Admin/Portal/Admin.tsx";
import ErrorBoundary from "./Components/HOOK/ERROR/BOUNDARY/ErrorBoundary.tsx";
import { useRef } from "react";
function App() {
  const lenisRef = useRef<LenisRef>(null);
  const lenisOption = {
    autoRaf: true,
    smooth: true,
    lerp: 0.1,
  };
  return (
    <ErrorBoundary>
      <ReactLenis
        root
        ref={lenisRef}
        options={lenisOption}
        style={{ height: "100vh", overflowY: "auto" }}
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/panel" element={<Admin />} />
          </Route>
        </Routes>
      </ReactLenis>
    </ErrorBoundary>
  );
}

export default App;
