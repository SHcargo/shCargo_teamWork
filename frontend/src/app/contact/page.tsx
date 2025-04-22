import { Poster } from "../components/poster";

 const contact = () => {
    return (
        <div className="w-screen h-screen flex flex-col bg-[rgb(221,221,221)]">
             <div className="max-w-2xl w-full h-full bg-[#e9ecef] px-8 flex flex-col gap-2 justify-center">
                <Poster/>
             </div>
        </div>
    );
  };
  export default contact