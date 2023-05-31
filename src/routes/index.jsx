import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Recomendation from "../pages/Recomendation";

const RoutesJs = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/recomendation" element={<Recomendation />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};

export default RoutesJs;
