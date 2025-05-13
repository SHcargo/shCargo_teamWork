"use client";
import { useState } from "react";
import Header from "./components/header";
import Sidebar from "./components/sideBar";
import UsersAdmin from "./_users/UserAdmin";
import SalesProducts from "./_sales/salesProducts";
import LocationAdd from "./_location/locationAdd";
import HelpForUsersAdd from "./_help/helpForUsers";
import { Delivery } from "./_Delivery/Delivery";

const DashboardAdmin = () => {
  const [step, setStep] = useState("users");
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="flex">
      <div className="sticky">
        <Sidebar step={step} setStep={setStep} />
      </div>
      <div className="flex-1 ml-0">
        <Header />
        <main className="mt-16 p-4 sm:p-6">
          {step === "users" && (
            <UsersAdmin
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          )}
          {step === "sales" && <SalesProducts />}
          {step === "location" && <LocationAdd />}
          {step === "help" && <HelpForUsersAdd />}
          {step === "Delivery" && <Delivery/>}
        </main>
      </div>
    </div>
  );
};

export default DashboardAdmin;
