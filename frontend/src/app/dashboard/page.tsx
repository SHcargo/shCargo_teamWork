"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "./components/header";
import Sidebar from "./components/sideBar";
import UsersAdmin from "./_users/UserAdmin";
import SalesProducts from "./_sales/salesProducts";
import LocationAdd from "./_location/locationAdd";
import HelpForUsersAdd from "./_help/helpForUsers";
import { useAdmin } from "../providers/AdminProvider";
import { Delivery } from "./_Delivery/Delivery";

const DashboardAdmin = () => {
  const [step, setStep] = useState("users");
  const [searchValue, setSearchValue] = useState("");
  const { role, loading } = useAdmin();
  const router = useRouter();

  // Redirect non-admins to unauthorized page
  // useEffect(() => {
  //   if (!loading && role !== "ADMIN") {
  //     router.push("/unauthorized"); // Or you could redirect to another page, like '/'
  //   }
  // }, [loading, role, router]);

  // Display loading message while the admin role is being fetched
  // if (loading) {
  //   return <p className="p-6 text-center">Уншиж байна...</p>; // You can show a loading spinner here
  // }

  // // If role is not ADMIN, return null (handled by redirect)
  // if (role !== "ADMIN") {
  //   return null; // This ensures nothing is rendered if unauthorized
  // }

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
          {step === "Delivery" && <Delivery />}
        </main>
      </div>
    </div>
  );
};

export default DashboardAdmin;
