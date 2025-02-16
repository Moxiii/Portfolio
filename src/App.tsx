import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout.tsx";
import Home from "./Screens/Home/Home.tsx"
function App() {

  return (
    <>
        <Routes>
            <Route path="/" element={<Layout /> } >
                <Route index element={<Home /> } />
            </Route>
        </Routes>
    </>
  )
}

export default App
