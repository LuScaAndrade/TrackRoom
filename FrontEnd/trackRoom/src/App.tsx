import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home.tsx"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
    </Routes>
  )
}

export default App
