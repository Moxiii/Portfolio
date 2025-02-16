import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout.tsx";
import Home from "./Screens/Home/Home.tsx"
import Links from "./Screens/Links/Links.tsx"
import About from "./Screens/About/About.tsx";
import Todo from "./Screens/Todo/Todo.tsx"
import {ReactLenis , useLenis} from "lenis/react";
import "./App.scss"
function App() {
const lenis = useLenis(({scroll})=>{

})
  return (
    <>
        <ReactLenis root>
        <Routes>
            <Route path="/" element={<Layout /> } >
                <Route index element={<Home /> } />
                <Route path="/links" element={<Links /> } />
                <Route path="/about" element={<About /> } />
                <Route path="/todo" element={<Todo /> } />
            </Route>
        </Routes>
        </ReactLenis>
    </>
  )
}

export default App
