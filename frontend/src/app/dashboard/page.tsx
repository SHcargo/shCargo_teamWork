"use client";

import { useState } from "react";
import Header from "./components/header";
import Sidebar from "./components/sideBar";
import UsersAdmin from "./_users/UserAdmin";
import SalesProducts from "./_sales/salesProducts";
import LocationAdd from "./_location/locationAdd";
import HelpForUsersAdd from "./_help/helpForUsers";

const DashboardAdmin = () => {
  const [step, setStep] = useState("users");
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="flex">
      <Sidebar step={step} setStep={setStep} />
      <div className="flex-1 ml-0">
        <Header searchValue={searchValue} setSearchValue={setSearchValue} />
        <main className="mt-16 p-4 sm:p-6">
          {step === "users" && <UsersAdmin searchValue={searchValue} />}
          {step === "sales" && <SalesProducts />}
          {step === "location" && <LocationAdd />}
          {step === "help" && <HelpForUsersAdd />}
        </main>
      </div>
    </div>
  );
};

export default DashboardAdmin;
