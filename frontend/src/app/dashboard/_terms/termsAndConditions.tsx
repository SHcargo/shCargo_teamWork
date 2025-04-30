"use client";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { FrameworkPopover } from "./components/popover"; // adjust path if needed
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-toastify";

const frameworks = [
  { value: "registration", label: "таны бүртгэл" },
  { value: "condition", label: "Үйлчилгээний нөхцөл" },
  { value: "price", label: "Үнэ" },
  { value: "payment", label: "Төлбөр" },
  { value: "shipping", label: "Тээврийн зардал" },
  { value: "deliver", label: "Хүргэлт" },
  { value: "forbidden", label: "Хориотой болон тусгай зөвшөөрөлтэй бараа" },
  { value: "responsibility", label: "Хариуцлага" },
  { value: "loss", label: "Бараанд алданги тооцох" },
];

export function TermsAndConditions() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [textValue, setTextValue] = useState("");

  const sendData = async () => {
    if (!value || !textValue) {
      toast.warning("⚠️ Бүх талбарыг бөглөнө үү.");
      return;
    }

    try {
      const payload = {
        [value]: textValue,
      };
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/terms`, payload);

      toast.success("✅ Амжилттай бүртгэгдлээ", {
        position: "top-right",
        autoClose: 5000,
      });
      setValue("");
      setTextValue("");
    } catch (error) {
      console.error("Error sending data:", error);
      toast.error("😕 Бүртгэхэд алдаа гарлаа.");
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <FrameworkPopover
        frameworks={frameworks}
        value={value}
        setValue={setValue}
        open={open}
        setOpen={setOpen}
      />

      <Textarea
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        placeholder="мөрдөгдөх дүрмийг бичих..."
        className="w-full"
      />

      <Button onClick={sendData} disabled={!value || !textValue}>
        Илгээх
      </Button>
    </div>
  );
}
