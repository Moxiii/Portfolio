import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Utils/Layout/Layout.tsx";
import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import "./App.scss";
import ErrorBoundary from "./Components/HOOK/ERROR/BOUNDARY/ErrorBoundary.tsx";
import NotFound from "./Screens/NotFound/NotFound.tsx";
import {useRef, lazy} from "react";
const LazyHome = lazy(() => import("./Screens/Home/Home.tsx"));
const LazyAbout = lazy(() => import("./Screens/About/About.tsx"));
const LazyContact = lazy(() => import("./Screens/Contact/Contact.tsx"));
const LazyAdmin = lazy(() => import("./Admin/Portal/Admin.tsx"));
const LazyProgression = lazy(()=>import("./Screens/Progression/Progression.tsx"))

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
                <Route index element={<LazyHome />} />
                <Route path="/about" element={<LazyAbout />} />
                <Route path="/contact" element={<LazyContact />} />
                <Route path="/admin/panel" element={<LazyAdmin />} />
                <Route path="/progression" element={<LazyProgression />} />
                  <Route path="*" element={<NotFound/>}/>
            </Route>
          </Routes>

      </ReactLenis>
    </ErrorBoundary>

  );
}

export default App;
