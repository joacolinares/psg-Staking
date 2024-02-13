import "./styles/Home.css";

import { Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import Ico from "./components/Ico";
import Staking from "./components/Staking";
import Marketplace from "./components/Marketplace";
import Sell from "./components/Sell";

export default function Home() {
  return (
    <Routes>
      <Route path="/" element={<NavBar/>}>
        <Route path="/stake" element={<Staking/>}/>
        <Route path="/" element={<Sell/>}/>
        <Route path="/marketplace" element={<Marketplace/>}/>
      </Route>
    </Routes>
  );
}
