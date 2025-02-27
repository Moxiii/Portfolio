import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout.tsx";
import Home from "./Screens/Home/Home.tsx";
import About from "./Screens/About/About.tsx";
import Contact from "./Screens/Contact/Contact.tsx";
import { ReactLenis  } from "lenis/react";
import type { LenisRef } from 'lenis/react';
import "./App.scss";
import Admin from "./Admin/Portal/Admin.tsx";
import { useRef} from "react";
function App() {
const lenisRef = useRef<LenisRef>(null)

  return (
    <>
      <ReactLenis root ref={lenisRef}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/panel" element={<Admin />} />
          </Route>
        </Routes>
      </ReactLenis>
    </>
  );
}

export default App;
