"use client";

import { useState } from "react";
import Header from "./components/header";
import Sidebar from "./components/sideBar";
import UsersAdmin from "./_users/UserAdmin";
import TermsAndConditions from "./_terms/termsAndConditions";
import SalesProducts from "./_sales/salesProducts";
import PriceAddCards from "./_price/priceAddCards";
import LocationAdd from "./_location/locationAdd";
import HelpForUsersAdd from "./_help/helpForUsers";

export const DashboardAdmin = () => {
  const [step, setStep] = useState("users");
  return (
    <div className="flex">
      <Sidebar step={step} setStep={setStep} />
      <div className="flex-1 ml-0">
        <Header />
        <main className="mt-16 p-4 sm:p-6">
          {step === "users" && <UsersAdmin setStep={setStep} />}
          {step === "terms" && <TermsAndConditions setStep={setStep} />}
          {step === "sales" && <SalesProducts setStep={setStep} />}
          {step === "price" && <PriceAddCards setStep={setStep} />}
          {step === "location" && <LocationAdd setStep={setStep} />}
          {step === "help" && <HelpForUsersAdd setStep={setStep} />}
        </main>
      </div>
    </div>
  );
};

export default DashboardAdmin;
