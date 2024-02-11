import { Routes, Route } from "react-router-dom";

import Authentication from "./UserAutheticate";
import { Menu } from "./Menu";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Authentication />} />
      <Route path="/product" element={<Menu />} />
    </Routes>
  );
};
