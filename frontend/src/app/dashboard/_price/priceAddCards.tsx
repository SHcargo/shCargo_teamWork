"use client";

import { useRouter } from "next/navigation";

const PriceAddCards = ({ setStep }: { setStep: (value: string) => void }) => {
  const router = useRouter();

  // You can navigate like this:
  // router.push('/some-route');

  return <div>price add</div>;
};

export default PriceAddCards;
