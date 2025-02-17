import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout.tsx";
import Home from "./Screens/Home/Home.tsx";
import Links from "./Screens/Links/Links.tsx";
import About from "./Screens/About/About.tsx";
import Contact from "./Screens/Contact/Contact.tsx";
import { ReactLenis, useLenis } from "lenis/react";
import "./App.scss";
import Admin from "./Admin/Admin.tsx";
function App() {
  const lenis = useLenis(({ scroll }) => {});
  return (
    <>
      <ReactLenis root>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/links" element={<Links />} />
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
