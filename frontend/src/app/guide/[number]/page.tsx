"use client";
// import axios from "axios";
// import { useParams } from "next/navigation";

const vidoe = () => {
  // const { number } = useParams<{ number: string }>();
  // const videoReplace = (number: string) => {
  //   const response = axios.get(`${number}`);
  // };
  return (
    <div>
      <iframe
        className="w-full lg:w-[760px] h-[211px] lg:h-[428px]"
        src="https://www.youtube.com/embed/KdVxIwXwiak"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};
export default vidoe;
