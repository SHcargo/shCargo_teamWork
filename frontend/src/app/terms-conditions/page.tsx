"use client";
import { useRouter } from "next/navigation";
import { TermsofConditionsCard } from "../components/TermsofConditionsCard";
import { ChevronLeft, NotebookText, StickyNoteIcon } from "lucide-react";

const Home = () => {
  const router = useRouter();
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full h-full bg-[#e9ecef] p-4 flex flex-col gap-2 ">
        <div className="flex gap-4">
          <button
            onClick={() => router.back()}
            className="bg-[#5F2DF5] h-11 w-11 flex items-center justify-center rounded-lg"
          >
            <ChevronLeft color="#fff" />
          </button>
          <div className="flex-1 flex flex-col items-center">
            <h1 className="text-xl font-bold">Үйлчилгээний нөхцөл</h1>
          </div>
        </div>
        <p className="text-sm p-10 inline-flex flex-col items-center gap-5">
          <NotebookText size={35} />
          <span>
            Хэрэглэгч нь Hicargo.mn веб сайтад хандсан үеэс эхлэн Үйлчилгээны
            нөхцөлийг мөрдөгдөх бөгөөд тухайн үеэс уг нөхцөлийг хүлээн
            зөвшөөрсөнд тооцно.
          </span>
        </p>
        <TermsofConditionsCard
          title="Үйлчилгээ Нөхцөл"
          subtitle="Sh Cargo журам болон хэрэглэгчийн үүрэг, хариуцлага."
        />

        <TermsofConditionsCard
          title="Буцаалт ба Хохирол"
          subtitle="Бараа буцаах, гэмтлийн нөхцөлийн талаархи мэдээлэл."
        />
      </div>
    </div>
  );
};

export default Home;
