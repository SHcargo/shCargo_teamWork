"use client";

import { useRouter } from "next/navigation";
import { DataTableDemo } from "../components/(features)/productCard";

const UsersAdmin = ({ setStep }: { setStep: (value: string) => void }) => {
  const router = useRouter();

  // You can navigate like this:
  // router.push('/some-route');

  return (
    <div>
      <DataTableDemo />
    </div>
  );
};

export default UsersAdmin;
