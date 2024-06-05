import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";

const Main = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <Outlet />
      <footer className="py-5 mt-12 text-center text-sm">
        Copyright © 2024 Question Bank All Rights Reserved.
      </footer>
    </div>
  );
};

export default Main;
