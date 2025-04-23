"use client";

import { useRouter } from "next/navigation";
import { DataTableDemo } from "../components/(features)/productCard";

const LocationAdd = ({ setStep }: { setStep: (value: string) => void }) => {
  const router = useRouter();

  // You can navigate like this:
  // router.push('/some-route');

  return <div>location Add</div>;
};

export default LocationAdd;
