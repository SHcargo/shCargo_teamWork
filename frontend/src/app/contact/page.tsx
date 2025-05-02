"use client";
// import { ChevronLeft } from "lucide-react";
// import { Poster } from "../components/poster";
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";

const Contact = () => {
  // const router = useRouter();
  // const [branch, setBranch] = useState<posterProps[]>([]);
  // const [loading , setLoading] = useState(true)
  // const branchData = () => {
  //   // setLoading(false);
  //   try {
  //     const response = axios.get("");
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     // setLoading(true);
  //   }
  // };

  // useEffect(() => {
  //   const dummyData: posterProps[] = [
  //     {
  //       title: "Салбар 1",
  //       address: "Улаанбаатар, Сүхбаатар дүүрэг",
  //       phoneNumber: 99112233,
  //       day: "Даваа-Баасан",
  //       image: "/images/branch1.jpg",
  //     },
  //     {
  //       title: "Салбар 2",
  //       address: "Улаанбаатар, Хан-Уул дүүрэг",
  //       phoneNumber: 88112233,
  //       day: "Бүх өдөр",
  //       image: "/images/branch2.jpg",
  //     },
  //   ];

  //   setBranch(dummyData);
  // }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {/* <div className="max-w-2xl w-full h-full bg-[#e9ecef] p-4 flex flex-col gap-2 ">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => router.back()}
            className="bg-[#5F2DF5] h-11 w-11 flex items-center justify-center rounded-lg"
          >
            <ChevronLeft color="#fff" />
          </button>
          <div className="flex-1 flex flex-col items-center">
            <h1 className="text-xl font-bold">Салбарын байршил</h1>
          </div>
        </div>

        {branch.length > 0 ? (
          branch.map((data, index) => <Poster key={index} data={data} />)
        ) : (
          <p>not found</p>
        )}
      </div> */}
      <h1>hello world</h1>
    </div>
  );
};

export default Contact;
