import React from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div>
        <Header />
      </div>
      <aside
        id="logo-sidebar"
        class="fixed top-0 left-0 z-40 w-64 bg-[#212137] h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <Sidebar />
      </aside>

      <div class="p-4 bg-[#eeeeee] h-screen sm:ml-64">
        <div class="p-4  dark:border-gray-700 mt-14">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
