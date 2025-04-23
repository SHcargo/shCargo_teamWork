"use client";

import { DataTableDemo } from "./components/(features)/productCard";
import Header from "./components/header";
import Sidebar from "./components/sideBar";

export const DashboardAdmin = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-0">
        <Header />
        <main className="mt-16 p-4 sm:p-6">
          <DataTableDemo />
        </main>
      </div>
    </div>
  );
};

export default DashboardAdmin;
