"use client";

import { useParams } from "next/navigation";

const DetailedAddress = () => {
  const { number } = useParams();
  return <div>{number}</div>;
};

export default DetailedAddress;
