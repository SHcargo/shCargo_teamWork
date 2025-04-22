"use client";

import { useParams, useRouter } from "next/navigation";

const Location = () => {
  const number = 1;
  const router = useRouter();
  return (
    <div className="max-w-2xl w-full h-full bg-red-300">
      <button onClick={() => router.push(`/location/${number}`)}>
        Aguulah
      </button>
    </div>
  );
};

export default Location;
