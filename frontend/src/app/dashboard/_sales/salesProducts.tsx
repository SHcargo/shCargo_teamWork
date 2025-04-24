"use client";

import { useRouter } from "next/navigation";

const SalesProducts = ({ setStep }: { setStep: (value: string) => void }) => {
  const router = useRouter();

  // You can navigate like this:
  // router.push('/some-route');

  return <div>product for sales</div>;
};

export default SalesProducts;
