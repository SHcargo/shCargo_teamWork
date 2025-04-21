import Image from "next/image";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center bg-blue-300">
      <Header />
      <div className="max-w-7xl h-screen flex justify-center bg-yellow-300"></div>
    </div>
  );
}
