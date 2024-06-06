import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";

const Main = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <div className="min-h-[calc(100vh-120px)] w-full">
        <Outlet />
      </div>
      <footer className="py-5 text-center text-sm bg-gray-200 text-gray-600">
        Copyright © 2024 Question Bank All Rights Reserved.
      </footer>
    </div>
  );
};

export default Main;
