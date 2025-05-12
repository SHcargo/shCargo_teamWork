import { Term } from "@/types";

const TermsOfViewForUser = ({ term }: { term: Term }) => {
  const renderParagraph = (
    label: string,
    content: string | Record<string, string>
  ) => (
    <div className="mb-3">
      <strong>{label}:</strong>
      {typeof content === "object" && content !== null ? (
        <ul className="list-disc ml-5">
          {Object.entries(content).map(([key, value]) => (
            <li key={key}>
              {key}: {value}
            </li>
          ))}
        </ul>
      ) : (
        <span>{content}</span>
      )}
    </div>
  );

  return (
    <div className="overflow-scroll w-full h-40 space-y-2 text-sm text-gray-700">
      {renderParagraph("Бүртгэл", term.registration)}
      {renderParagraph("Нөхцөл", term.condition)}
      {renderParagraph("Үнэ", term.price)}
      {renderParagraph("Төлбөр", term.payment)}
      {renderParagraph("Хүргэлт", term.shipping)}
      {renderParagraph("Хүлээлгэн өгөх", term.deliver)}
      {renderParagraph("Хүргэлтийн үнэ", term.deliverPrice)}
      {renderParagraph("Хориотой зүйлс", term.forbidden)}
      {renderParagraph("Хариуцлага", term.responsibility)}
      {renderParagraph("Алдагдал", term.loss)}
    </div>
  );
};

export default TermsOfViewForUser;
