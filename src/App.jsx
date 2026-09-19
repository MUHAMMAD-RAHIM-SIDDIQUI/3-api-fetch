import "./App.css";
import UserCard from "./assets/components/user-api";
import ProductGrid from "./assets/components/dummyjson";
import HomePage from "./assets/components/home";
import SpaceNews from "./assets/components/news";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/user-api" element={<UserCard />} />
      <Route path="/dummyjson" element={<ProductGrid />} />
      <Route path="/news" element={<SpaceNews />} />
    </Routes>
  );
}

export default App;
