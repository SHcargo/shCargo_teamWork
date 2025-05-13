"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft, NotebookText } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

interface Term {
  _id: string;
  condition: string;
  registration: string;
  price: string;
  payment: string;
  shipping: string;
  deliver: string;
  deliverPrice: string;
  forbidden: string;
  responsibility: string;
  loss: string;
  isVerified: boolean;
}

const Home = () => {
  const [terms, setTerms] = useState<Term[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchingTerms = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/terms`
      );
      setTerms(response.data.message);
      console.log(response.data.message);
    } catch (error) {
      console.log("Error fetching terms", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchingTerms();
  }, []);

  const renderParagraph = (
    label: string,
    content: string | Record<string, string>
  ) => (
    <div className="mb-4">
      <strong className="block text-gray-800 mb-1">{label}:</strong>
      {typeof content === "object" && content !== null ? (
        <ul className="list-disc ml-6 text-sm text-gray-700">
          {Object.entries(content).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-700">{content}</p>
      )}
    </div>
  );

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full h-full overflow-y-auto bg-[#e9ecef] p-4 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="bg-black h-11 w-11 flex items-center justify-center rounded-lg"
          >
            <ChevronLeft color="#fff" />
          </button>
          <h1 className="text-xl font-bold flex-1 text-center">
            Үйлчилгээний нөхцөл
          </h1>
        </div>

        {/* Intro */}
        <div className="text-sm px-4 py-6 text-center flex flex-col items-center gap-4">
          <NotebookText size={35} />
          <p>
            Хэрэглэгч нь Shcargo.mn веб сайтад хандсан үеэс эхлэн Үйлчилгээний
            нөхцөл мөрдөгдөх бөгөөд тухайн үеэс уг нөхцөлийг хүлээн зөвшөөрсөнд
            тооцно.
          </p>
        </div>

        {/* Terms Rendered */}
        {!loading && terms.length > 0 ? (
          <div className="px-2">
            {renderParagraph("Бүртгэл", terms[0].registration)}
            {renderParagraph("Нөхцөл", terms[0].condition)}
            {renderParagraph("Үнэ", terms[0].price)}
            {renderParagraph("Төлбөр", terms[0].payment)}
            {renderParagraph("Хүргэлт", terms[0].shipping)}
            {renderParagraph("Хүлээлгэн өгөх", terms[0].deliver)}
            {renderParagraph("Хүргэлтийн үнэ", terms[0].deliverPrice)}
            {renderParagraph("Хориотой зүйлс", terms[0].forbidden)}
            {renderParagraph("Хариуцлага", terms[0].responsibility)}
            {renderParagraph("Алдагдал", terms[0].loss)}
          </div>
        ) : loading ? (
          <p className="text-center text-gray-500">Ачааллаж байна...</p>
        ) : (
          <p className="text-center text-red-500">Нөхцөл олдсонгүй</p>
        )}
      </div>
    </div>
  );
};

export default Home;
