"use client";

import { useRouter } from "next/navigation";
import { DataTableDemo } from "../components/(features)/productCard";

const HelpForUsersAdd = ({ setStep }: { setStep: (value: string) => void }) => {
  const router = useRouter();

  // You can navigate like this:
  // router.push('/some-route');

  return <div>help center add</div>;
};

export default HelpForUsersAdd;
